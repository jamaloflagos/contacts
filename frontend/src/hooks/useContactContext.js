import { contactContext } from "../contexts/contactContext";
import { useContext } from "react";

export const useContactContext = () => {
    const context = useContext(contactContext)

    if(!context) {
        throw Error("must be used in a context provider")
    }

    return context
}