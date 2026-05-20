export async function streamPost({
  url,
  body,
  queryParams,
  headers,
  onMessage,
  onError,
}: {
  url: string;
  body: unknown;
  queryParams?: Record<
    string,
    string | number | boolean | null | undefined
  >;
  headers?: Record<string, string>;
  onMessage: (chunk: string) => void;
  onError?: (err: unknown) => void;
}) {
  const appStore = JSON.parse(localStorage.getItem("app-store") || "{}");

  let baseURL = appStore.state?.endpoint_http;
  if (!baseURL || baseURL === "undefined") {
    baseURL = "";
  }

  const headersStr = localStorage.getItem("headers") || "{}";
  const headersStorage = JSON.parse(headersStr) as Record<string, string>;

  const queryInit: Record<string, string> = {};
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      queryInit[key] = String(value);
    });
  }
  const query = new URLSearchParams(queryInit).toString();
  const fullUrl = query ? `${baseURL}${url}?${query}` : `${baseURL}${url}`;

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headersStorage,
        ...(headers || {}),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok || !res.body) throw new Error("Stream failed");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line) onMessage(line);
      }
      buffer = lines[lines.length - 1];
    }

    // Process any remaining data in the buffer after stream ends
    if (buffer.trim()) {
      onMessage(buffer.trim());
    }
  } catch (err) {
    console.error("streamPost error:", err);
    onError?.(err);
  }
}
