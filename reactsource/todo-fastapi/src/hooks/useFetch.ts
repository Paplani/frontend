import { useCallback, useEffect, useState } from "react";
import { getTodos } from "../apis/todoApi";
import type { Todo } from "../types/todo";

export const useFetch = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 상단의 "전체", "완료", "미완료 보기"
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);

  // 리엑트는 렌더링될때마다 함수를 새롭게 인식
  // useCallback(함수, [의존성]) : 의존성이 바뀌기 전까지 렌더링해도 새로운 함수로 만들지마라
  const fetchData = useCallback(async (completedFilter: boolean | null) => {
    setLoading(true);
    try {
      const serverData = await getTodos(completedFilter);
      setTodos(serverData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  // todos 값 확인
  // 컴포넌트 생명주기에 코드를 실행하고 싶을 때, 컴포넌트가 렌더링 된 후 자동으로 코드가 실행
  useEffect(() => {
    fetchData(completedFilter);
  }, [fetchData, completedFilter]);

  return { todos, loading, fetchData, completedFilter, setCompletedFilter };
};

export default useFetch;
