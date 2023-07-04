import { createContext, useEffect, useReducer } from "react";
export const authContext = createContext()

const authContextReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": 
            return {
                user: action.payload
            }
        case "LOGOUT": 
            return {
                user: null
            }
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authContextReducer, {
        user: null
    })

    // to keep user logged in after refresh
    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    },[])

    console.log(state);
    

    return (
        <authContext.Provider value={{...state, dispatch}}>
            {children}
        </authContext.Provider>
    )
}