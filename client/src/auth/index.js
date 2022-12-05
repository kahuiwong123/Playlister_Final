import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR_MESSAGE: "ERROR_MESSAGE",
    NOT_GUEST: "NOT_GUEST"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        notGuest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn()
        const temp = async () => {
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
            }
        }
        temp()
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: auth.errorMessage,
                    notGuest: true
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: auth.errorMessage,
                    notGuest: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: auth.errorMessage,
                    notGuest: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: auth.errorMessage,
                    notGuest: true
                })
            }

            case AuthActionType.ERROR_MESSAGE: {
                return setAuth({
                    ...auth,
                    errorMessage: payload.errorMessage
                })
            }

            case AuthActionType.NOT_GUEST: {
                return setAuth({
                    ...auth, user: null, loggedIn: true, notGuest: false
                })
            }

            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            }); 
        } else {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: response.data.errorMessage
                }
            })
        }
    }

    auth.registerUser = async function (firstName, lastName, username, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, username, email, password, passwordVerify);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        } else {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: response.data.errorMessage
                }
            })
        }
    }

    auth.hideErrorModal = () => {
        authReducer({
            type: AuthActionType.ERROR_MESSAGE,
            payload: {
                errorMessage: null
            }
        })
    }

    auth.setErrorMessage = (err) => {
        authReducer({
            type: AuthActionType.ERROR_MESSAGE,
            payload: {
                errorMessage: err
            }
        })
    }


    auth.loginUser = async function (email, password) {
        const response = await api.loginUser(email, password, true);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        } else {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: response.data.errorMessage
                }
            })
        }
    }

    auth.logoutUser = async function () {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.loginGuest = () => {
        const asyncGuest = async () => {
            const response = await api.loginUser("", "", false);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.NOT_GUEST,
                    payload: null
                })
                history.push("/");
            }
        }
        asyncGuest()
    }

    auth.getUserInitials = function () {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }

        else if (!auth.notGuest) {
            return "Guest"
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };