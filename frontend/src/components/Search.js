import { useState } from "react"
import { useContactContext } from "../hooks/useContactContext"
const Search = () => {
  const {dispatch} = useContactContext()
  const [searchContact, setSearchContact] = useState("") 
    const handleSearch = (e) => {
      const {value}  = e.target
      setSearchContact(value)
      dispatch({type: "SEARCH_CONTACT", payload: value.trim()})
    }
  return (
    <div>
        <input 
          type="search" 
          id="search_name" 
          value={searchContact}
          onChange={handleSearch}
        />
    </div>
  )
}
export default Search