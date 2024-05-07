import React from 'react'
import LoginForm from "../../components/LoginForm/LoginForm";


function Login({setUser}) {
  return (
    <div>
    <h1>Log In</h1>
      <LoginForm setUser={setUser}/>
    </div>
  )
}

export default Login
