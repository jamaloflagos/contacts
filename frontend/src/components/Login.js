import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const {login} = useLogin()

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
    
        await login(userInfo.email, userInfo.password)
        
    }
  return (
    <div>
        <form onSubmit={signupSubmit} className="login">
            <label htmlFor="email">Email:</label> <br />
            <input type="text" value={userInfo.email} onChange={getUSerInfo} name="email" id="email"/> <br />
            <label htmlFor="password">Pssword:</label> <br />
            <input type="text" value={userInfo.password} onChange={getUSerInfo} name="password" id="password"/>
            <button>Login</button>
        </form>
    </div>
  )
}
export default Login