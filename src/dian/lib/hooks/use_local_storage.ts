'use client'
import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T) => void] {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
            localStorage.setItem(key, JSON.stringify(initialValue));
        }
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });
    const setLocalStorage = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };
    return [value, setLocalStorage];
}
