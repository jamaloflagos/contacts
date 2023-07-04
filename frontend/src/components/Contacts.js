import { useContactContext } from "../hooks/useContactContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Contacts = ({name, phone_num, email, _id}) => {
  const {dispatch} = useContactContext()
  const {user} = useAuthContext()

  const deleteContact = async () => {
    if(!user) {
      return
    }
    const res = await fetch(`/api/contact/${_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await res.json()
    dispatch({type: "DELETE_CONTACT", payload: json})
  }
  
  
  return (
    <div className="contact-box">
      <div className="contact-col">
        <img src="https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg" alt="as" />
        <div>
            <h3 className="name">{name}</h3>
            <span className="number">{phone_num}</span> <br />
            <span className="mail">{email}</span>
        </div>
      </div>
      <button className="delete-btn" onClick={deleteContact}><i class="fa-solid fa-trash-can"></i></button>
    </div>
  )
}
export default Contacts