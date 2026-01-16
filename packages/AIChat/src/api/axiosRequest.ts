import axios, { type AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  // handleAuthError,
  // handleGeneralError,
  handleNetworkError,
} from "./tools";

type Fn = (data: FcResponse<unknown>) => unknown;

type RequestParams = Record<string, unknown>;
type RequestHeaders = Record<string, string>;

interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config);
  config = handleConfigureAuth(config);
  // console.log("config", config);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    return response;
  },
  (err: { response?: { status?: number } } | undefined) => {
    handleNetworkError(err?.response?.status);
    return Promise.reject(err);
  }
);

type AxiosErrorLike = {
  response?: {
    status?: number;
    data?: { message?: string };
    config?: { url?: string };
  };
  request?: { config?: { url?: string } };
  config?: { url?: string };
  message?: string;
};

export const handleApiError = (error: unknown) => {
  let message = "Request failed";

  const err = error as AxiosErrorLike;

  if (err.response) {
    message =
      err.response.data?.message || `Error (${err.response.status})`;
  } else if (err.request) {
    message = "Network connection failed";
  } else {
    message = err.message || message;
  }

  const url =
    err.config?.url ||
    err.response?.config?.url ||
    err.request?.config?.url;

  const suppressProfileError =
    typeof url === "string" && url.includes("/account/profile");

  console.error(error);
  if (!suppressProfileError) {
    console.error(message);
  }

  return error as AxiosErrorLike;
};

export const Get = <T>(
  url: string,
  params: RequestParams = {},
  clearFn?: Fn
): Promise<[unknown, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    const appStore = JSON.parse(localStorage.getItem("app-store") || "{}");

    const meta = import.meta as unknown as { env?: { DEV?: boolean } };
    const isDev = meta.env?.DEV === true;
    const PROXY_PREFIXES: readonly string[] = [
      "account",
      "chat",
      "query",
      "connector",
      "integration",
      "assistant",
      "datasource",
      "settings",
      "mcp_server",
    ];
    const shouldProxy =
      isDev &&
      url.startsWith("/") &&
      PROXY_PREFIXES.some((p) => url.startsWith(`/${p}`));

    let baseURL: string = appStore.state?.endpoint_http as string;
    if (!baseURL || baseURL === "undefined" || shouldProxy) {
      baseURL = "";
    }

    axios
      .get<FcResponse<T>>(baseURL + url, { params, withCredentials: true })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result?.data) as unknown as FcResponse<T>;
        } else {
          res = result?.data as FcResponse<T>;
        }

        resolve([null, res as FcResponse<T>]);
      })
      .catch((err: unknown) => {
        handleApiError(err);
        resolve([err, undefined]);
      });
  });

export const Post = <T>(
  url: string,
  data: RequestParams | undefined,
  params: RequestParams = {},
  headers: RequestHeaders = {}
): Promise<[unknown, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    const appStore = JSON.parse(localStorage.getItem("app-store") || "{}");

    const meta = import.meta as unknown as { env?: { DEV?: boolean } };
    const isDev = meta.env?.DEV === true;
    const PROXY_PREFIXES: readonly string[] = [
      "account",
      "chat",
      "query",
      "connector",
      "integration",
      "assistant",
      "datasource",
      "settings",
      "mcp_server",
    ];
    const shouldProxy =
      isDev &&
      url.startsWith("/") &&
      PROXY_PREFIXES.some((p) => url.startsWith(`/${p}`));

    let baseURL: string = appStore.state?.endpoint_http as string;
    if (!baseURL || baseURL === "undefined" || shouldProxy) {
      baseURL = "";
    }

    const config: AxiosRequestConfig = {
      params,
      headers,
      withCredentials: true,
    };

    axios
      .post<FcResponse<T>>(baseURL + url, data, config)
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err: unknown) => {
        handleApiError(err);
        resolve([err, undefined]);
      });
  });
};
