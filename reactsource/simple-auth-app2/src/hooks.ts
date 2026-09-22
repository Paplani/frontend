// typescript 기반
// useSelector(), useDispatch() => 타입 지정 요구

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// 타입을 알아서 유추하도록 설정
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
