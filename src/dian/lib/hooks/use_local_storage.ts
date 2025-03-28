import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T):[
  string,
  (value: T) => void
] {
  // 检查是否在浏览器环境中
  const isBrowser = typeof window !== 'undefined';

  // 从 localStorage 获取初始值
  const storedValue = isBrowser ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue).storedValue : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (isBrowser) {
      // 在浏览器环境中更新 localStorage
      localStorage.setItem(key, JSON.stringify({storedValue: value}));
    }
  }, [key, value, isBrowser]);

  return [value, setValue];
};

export default useLocalStorage;
