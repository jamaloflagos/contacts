import { useAuthContext } from "./useAuthContext";
import { useContactContext } from "./useContactContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: contactDispatch} = useContactContext()

    const logout = () => {
        dispatch({type: "LOGOUT"})

        localStorage.removeItem("user")

        contactDispatch({type: "SET_CONTACTS", payload: null})
    }

    return {logout}
}