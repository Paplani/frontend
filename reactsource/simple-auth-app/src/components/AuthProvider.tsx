import { useState, type ReactNode } from "react";
import { AuthContext, type LoginFormState } from "../common/AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<LoginFormState>({
    id: "",
    password: "",
  });

  // const login = (id:string, password:string)=> setAuth({id:id, password:password})
  const login = (id: string, password: string) => setAuth({ id, password });
  const logout = () => setAuth({ id: "", password: "" });


  // 공유할 state
  const value = {
    id: auth.id,
    isLoggedIn: auth.id !== "",
    login,
    logout,
  };

  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
