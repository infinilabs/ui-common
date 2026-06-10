import { createContext, useContext } from "react";

interface MarkdownContextValue {
  dark?: boolean;
}

export const MarkdownContext = createContext<MarkdownContextValue>({});

export const useMarkdownContext = () => useContext(MarkdownContext);
