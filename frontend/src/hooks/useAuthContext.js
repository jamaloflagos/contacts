import { authContext } from "../contexts/authContext";
import { useContext } from "react";

export const useAuthContext = ()=> {
    const context = useContext(authContext)

    if(!context) {
       throw Error("must be used inside a context provider") 
    }

    return context
}