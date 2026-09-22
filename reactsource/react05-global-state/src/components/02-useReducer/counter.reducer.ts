// state 값의 변경을 담당하는 함수 생성

export type CountActionType = "INC" | "DEC";
export type CountAction = {
  type: CountActionType;
  payload: { value: number };
};

export const initState = {
  count: 0,
};

export function counterReducer(state: typeof initState, action: CountAction) {
  // 분해
  const { value } = action.payload;
  switch (action.type) {
    case "INC":
      return {
        ...state,
        count: state.count + value,
      };
    case "DEC":
      return {
        ...state,
        count: state.count - value,
      };
    default:
      throw new Error();
  }
}
