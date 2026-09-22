import { createContext, useContext } from "react";

// 1. Context로 사용할 객체 생성

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

// 실습 2
type CountContextType = {
  count: number;
  increaseCount: () => void;
};

export const CountContext = createContext<CountContextType | null>(null);

// Context null 체크를 커스텀 Hook 으로 생성
export function useCount() {
  const context = useContext(OnContext);
  if (!context) {
    throw new Error("OnContext is Null.");
  }
  return context;
}

// 실습 3
type OnContextType = {
  isOn: boolean;
  onToggle: () => void;
};

export const OnContext = createContext<OnContextType | null>(null);
