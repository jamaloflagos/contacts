import { createContext, useReducer } from "react";

export const contactContext = createContext()

const contactReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CONTACTS':
            return {
                contacts: action.payload
            }
        case 'ADD_CONTACT': 
            return {
                contacts: [action.payload, ...state.contacts]
            }
        case 'DELETE_CONTACT': 
            return {
                contacts: state.contacts.filter(contact => contact._id !== action.payload._id)
            }
        case "SEARCH_CONTACT": 
            if(action.payload === "") {
                return {
                    contacts: state.contacts
                }
            } else {
                return {
                    contacts: state.contacts.filter(contact => contact.name.toLowerCase().includes(action.payload.toLowerCase()))
                } 
            }
        default:
            return state
    }

}
export const ContactContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(contactReducer, {
        contacts: null
    })

    return (
        <contactContext.Provider value={{dispatch, ...state}}>
             {children}
        </contactContext.Provider>
    )
}