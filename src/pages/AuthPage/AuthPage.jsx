import React from "react"
import SignUpForm from '../../components/SignUpForm/SignUpForm';


export default function AuthPage({setUser}) {
  return (
    <main>
      <img src="https://i.imgur.com/CnL6mkj.png" className="logos" />
      <SignUpForm  setUser={setUser}/>
    </main>
  );
}