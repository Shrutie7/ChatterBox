import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
// initial state at the begining user is null,no error,not fetching anything at begining

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
    {/* wrap AuthProvider with App in index.js hence children is entire App therefore all these values are accessible to entire App*/}
      {children}
    </AuthContext.Provider>
  );
};


// when user click login button it will dispatch action and then go to reducer and reducer will decide which properties will be updated inside initial state 
//  INITIAL_STATE = {
//   user: null,
//   isFetching: false,
//   error: false,
// };

// ACTION 1 (LOGIN CLICK MAIL AND PASSWORD will be taken dispatch this action)
// Reducer (update state)
//  NEW_STATE = {
//   user: null,
//   isFetching: true,
//   error: false,
// };

//  CUURENT_STATE = {
//   user: null,
//   isFetching: true,
//   error: false,
// };

// ACTION 2(possiblity 1)(login success action dispatch )
// reducer (update state hence update user hence user wont be null if successfull login no fetching anymore therefore isFetching false)
//  NEW_STATE = {
//   user: {username:john,email:john@gmail.com ,.......},
//   isFetching: false,
//   error: false,
// };

// ACTION 2(possiblity 1)(LOGIN FAILURE{error})
// reducer(update state login failure hence fetching ended and error true)
//  NEW_STATE = {
//   user: null,
//   isFetching: false,
//   error: true,
// };



