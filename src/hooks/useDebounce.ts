import { useRef } from "react";

export const useDebounce = <T extends (value: string) => void>(callback: T, delay: number) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (value: string) => {

        console.log(timeoutRef.current)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(value);
        }, delay);
    };
}