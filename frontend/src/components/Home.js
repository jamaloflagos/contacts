import { useEffect } from "react";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import { useContactContext } from "../hooks/useContactContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "./Search";
const Home = () => {

    const {contacts, dispatch} = useContactContext()
    const {user} = useAuthContext()

  useEffect(() => {
    const getContacts = async () => {
     const res = await fetch('/api/contact', {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
     })
     const data = await res.json()
        
     if (res.ok) {
        dispatch({type: "SET_CONTACTS", payload: data})

     }

    } 
    
    if (user) {
      getContacts()
    }
    console.log('useeffect ran');

 },[dispatch, user])
 console.log(contacts);
 console.log('home component rendered');
 

  return (
    <div>
      <div className="header">
        <h1>Contact Book</h1>
      </div>
      <Search />
      <div className="grid">
        <div>
          {contacts && contacts.map(contact => {
          return <Contacts key={contact._id} {...contact}/>
          })} 
        </div>
        <AddContact />
      </div> 
    </div>
  )
}
export default Home