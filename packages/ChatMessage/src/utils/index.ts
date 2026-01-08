export const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    console.log("Clipboard not available", text);
  }
};

export const isDefaultServer = () => true;

export const OpenURLWithBrowser = (url: string) => {
  window.open(url, '_blank');
};

export const filesize = (size: number) => {
  return size + ' B';
};
