import { useState } from "react"
import { useContactContext } from "../hooks/useContactContext";
import { useAuthContext } from "../hooks/useAuthContext";


const AddContact = () => {
    const {dispatch} = useContactContext()
    const {user} = useAuthContext()
    const [contactInfo, setContactInfo] = useState({
        name: "",
        phone_num: "",
        email: ""
    })


    const getContactInfo = (e) => {
        const {name, value} = e.target
        setContactInfo(prevContactInfo => {
            return {
                ...prevContactInfo,
                [name]: value
            }            
        })

    }
    console.log(contactInfo);

    const submitContactInfo = async (e) => {
        e.preventDefault()

        if(!user) {
            return
        }

        const response = await fetch('/api/contact', {
            method: "POST",
            body: JSON.stringify(contactInfo),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (!response.ok) {
            console.log(json.error);
        }
        if (response.ok) {
            setContactInfo({
                name: "",
                phone_num: "",
                email: ""
            })
            dispatch({type: "ADD_CONTACT", payload: json})
            
            console.log('response okay', json);
        }
        
        console.log(contactInfo)
    }
    

  return (
    <div>
        <form onSubmit={submitContactInfo} className="form">
            <label htmlFor="name">Name:</label> <br />
            <input type="text" name="name" id="name" value={contactInfo.name} onChange={getContactInfo}/> <br />
            <label htmlFor="number">Number:</label> <br />
            <input type="text" name="phone_num" id="number" value={contactInfo.phone_num} onChange={getContactInfo}/> <br />
            <label htmlFor="mail">Mail:</label> <br />
            <input type="text" name="email" id="mail" value={contactInfo.email} onChange={getContactInfo}/> <br />
            <button>Add Contact</button>
        </form>
    </div>
  )
}
export default AddContact