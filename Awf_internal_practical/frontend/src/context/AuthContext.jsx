import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) { const [employee,setEmployee]=useState(null),[token,setToken]=useState(null),[role,setRole]=useState(null); function login(employeeData,authToken,employeeRole){setEmployee(employeeData);setToken(authToken);setRole(employeeRole);} function logout(){setEmployee(null);setToken(null);setRole(null);} return <AuthContext.Provider value={{employee,token,role,login,logout}}>{children}</AuthContext.Provider>; }
export const useAuth=()=>useContext(AuthContext);
