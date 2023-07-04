import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const {error, isLoading, signup} = useSignup()

    const getUSerInfo = (e) => {
        const {name, value} = e.target
        setUserInfo(prevUserInfo => {
            return {
                ...prevUserInfo,
                [name]: value
            }
        })
    }

    const signupSubmit = async (e)=>{
        e.preventDefault()
    
        await signup(userInfo.email, userInfo.password)
    }
  return (
    <div>
        <form onSubmit={signupSubmit} className="signup">
            <label htmlFor="email">Email:</label> <br />
            <input type="text" value={userInfo.email} onChange={getUSerInfo} name="email" id="email"/> <br />
            <label htmlFor="password">Pssword:</label> <br />
            <input type="text" value={userInfo.password} onChange={getUSerInfo} name="password" id="password"/>
            <button>SignUp</button>
        </form>
    </div>
  )
}
export default Signup