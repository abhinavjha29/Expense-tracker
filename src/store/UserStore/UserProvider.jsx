import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "..";

export const UserContext = createContext();

const UserProvider = (props) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, SetUserData] = useState({});
  useEffect(() => checkLogin(), []);
  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  };
  const handleSignUp = async (user) => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/user/postSignup",
        user
      );

      return resp;
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const login = async (loginDetail) => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/user/login",
        loginDetail
      );
      console.log(resp);
      if (resp) {
        dispatch(setToken(resp.data.token));
        localStorage.setItem("token", resp.data.token);
        SetUserData(resp);

        checkLogin();
        if (resp.data.data.userVerified) {
          console.log(resp.data.data.userVerified);
          localStorage.setItem("emailVerified", true);
        }
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const userContext = {
    userSignUp: handleSignUp,
    userLogin: login,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    userData: userData,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
