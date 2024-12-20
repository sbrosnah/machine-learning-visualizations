import { RefObject } from "react";

export type RefsMap = {
    [key: string]: RefObject<Element>;
};