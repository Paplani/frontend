// state 값의 변경을 담당하는 함수 생성

export type BankActionType = "DEP" | "WIT";
export type BankAction = {
  type: BankActionType;
  payload: { amountMoney: number };
};

export const initState = {
  balance: 0,
};

export function bankReducer(state: typeof initState, action: BankAction) {
  // 분해
  const {amountMoney } = action.payload;
  switch (action.type) {
    case "DEP":
      return {
        ...state,
        balance: state.balance + amountMoney,
      };
    case "WIT":
      return {
        ...state,
        balance: state.balance - amountMoney,
      };
    default:
      throw new Error();
  }
}
