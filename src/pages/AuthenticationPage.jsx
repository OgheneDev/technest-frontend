import React from 'react'
import AccountBanner from '../components/AuthPage/AccountBanner'
import SignInForm from '../components/AuthPage/SignInForm'
import SignUpForm from '../components/AuthPage/SignUpForm'

const AuthenticationPage = () => {
  return (
    <div>
      <AccountBanner />
      <div className="md:flex gap-10 md:px-[150px] md:py-10">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  )
}

export default AuthenticationPage
