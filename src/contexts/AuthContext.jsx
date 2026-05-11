import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('run use')
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
    setRole(localStorage.getItem("role"));
    setAvatar(localStorage.getItem("avatar"));
    setIsAuth(JSON.parse(localStorage.getItem("isAuth")));
    // setLoading(JSON.parse(localStorage.getItem("loading")));
    setLoading(false);
    // console.log(value);
    
  }, []);

  const login = (data) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("avatar", data.avatar.url);
    localStorage.setItem("isAuth", true);
    localStorage.setItem("loading", false);
    setUsername(data.username);
    setEmail(data.email);
    setRole(data.role);
    setAvatar(data.avatar.url);
    setIsAuth(true);
    setLoading(false);
  };

  const logout = () => {
    localStorage.clear()
    setUsername(null);
    setEmail(null);
    setRole(null);
    setAvatar(null);
    setIsAuth(false);
    setLoading(false);
    
  }

  const value = {
    username,
    email,
    role,
    avatar,
    isAuth,
    loading,
    login,
    logout,
    setUsername,
    setEmail,
    setRole,
    setAvatar,
    setIsAuth,
    setLoading,
  };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};
