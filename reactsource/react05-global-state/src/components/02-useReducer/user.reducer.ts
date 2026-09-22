import { initUser, type UserAction, type UserType } from "../01-useState/user.types";

export function UserReducer(user: UserType, action: UserAction) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...user,
        name: action.name.trim(),
      };
    case "SET_YEAR": { // const inputYear = value === "" ? 0 : parseInt(value);
      const age = new Date().getFullYear() - action.year;

      return {
        ...user,
        year: action.year,
        warning: action.year !== 0 && age < 18 ? "18세 이상이여야 합니다." : "",
      };
    }
    case "RESET":
      return initUser;
    default:
      return user;
  }
}
