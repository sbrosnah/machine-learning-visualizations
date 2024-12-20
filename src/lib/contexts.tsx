
import { createContext, Dispatch, SetStateAction } from "react";
import { StateContext } from "./types";

export const MainNavOpenContext = createContext<StateContext<boolean> | undefined>(undefined)
export const MarkdownNavOpenContext = createContext<StateContext<boolean> | undefined>(undefined)