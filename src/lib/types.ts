import { Dispatch, RefObject, SetStateAction } from "react";

export type RefsMap = {
    [key: string]: RefObject<Element>;
};

export type StateContext<T> = {
    value: T,
    setValue: Dispatch<SetStateAction<T>>
}