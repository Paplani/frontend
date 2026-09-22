// name, year, warning
export type UserType = {
  name: string;
  year: number;
  warning: string;
};

// Reducer 에서 사용할 action type 지정
export type UserAction =
  | {
      type: "SET_NAME";
      name: string;
    }
  | {
      type: "SET_YEAR";
      year: number;
    }
  | {
      type: "RESET";
    };

// 초기값 설정
export const initUser: UserType = {
  name: "",
  year: 0,
  warning: "",
};
