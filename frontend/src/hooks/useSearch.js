import { useContactContext } from "./useContactContext"
import { useAuthContext } from "./useAuthContext"
export const useSearch = () => {
    const {user} = useAuthContext()
    const {contacts, dispatch} = useContactContext()
    const search = async () => {
        const response = await fetch(`/api/contact/${contacts.name}`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            console.log(json.error);
        }

        dispatch({type: "SEARCH_CONTACT", payload: json})
    } 

    return {search}
}