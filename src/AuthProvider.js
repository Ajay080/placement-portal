import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// const bcrypt=require('bcryptjs')

export const AuthContext = createContext(null)


const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState("")
    const [isAdmin, setIsAdmin]=useState(false)

    const navigate = useNavigate()

    const logout = () => {
        setToken("")
        setIsAuthenticated(false)
        setIsAdmin(false)
        localStorage.removeItem('token')
        navigate('/login')
    }

    const signup = async (name, email, password) => {
        try {
            const data = await (await axios.post(`https://builherfuturebackend.onrender.com/users/signup`, {
                name,
                email,
                password
            })).data
            console.log(data)
            const { token } = data
            localStorage.setItem('token', token)
            if(data.user.role==='admin'){
                setIsAdmin(true)
            }
            setToken(token)
            setIsAuthenticated(true)
            navigate('/')
            
        } catch (error) {
            console.error(error)
console.log("sign err")
        }
    }
    const login = async (name, email, password) => {
        try {
            const response = await axios.post(`https://builherfuturebackend.onrender.com/users/login`, {
                name, email, password
            });
            console.log("fjrjsfs" +response.data)
            const data= response.data
            // const { tokens, user } = data
            const token=response.data.token
            // console.log("sdsjdsdsj", token)
            if(data.user.role==='admin'){
                setIsAdmin(true)
            }
            setToken(token)
            setIsAuthenticated(true)
            localStorage.setItem('token', token)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const checkToken = async (token) => {
        try {
            const data = await (await axios.get(`https://builherfuturebackend.onrender.com/users/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })).data
            // console.log(data)
            if(data.role==='admin'){
                setIsAdmin(true)
            }
            else{
                console.log("not an admin")
            }
            if (data) {
                setToken(token)
                setIsAuthenticated(true)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            // console.log("token:" , token)
            if (token) {
                await checkToken(token)
                navigate(
                    "/"
                )
            }

        })()

    }, [])

    return <AuthContext.Provider value={{ token, setToken, isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin, logout, signup, login }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider