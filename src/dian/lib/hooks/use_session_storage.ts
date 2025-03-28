'use client'
import { useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const storedValue = sessionStorage.getItem(key);
        if (storedValue === null) {
            sessionStorage.setItem(key, JSON.stringify(initialValue));
        }
        return storedValue!== null? JSON.parse(storedValue) : initialValue;
    });
    const updateValue = (newValue: T) => {
        setValue(newValue);
        sessionStorage.setItem(key, JSON.stringify(newValue));
    };
    return [value, updateValue] as const;
}
