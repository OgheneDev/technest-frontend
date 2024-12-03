import React from 'react'
import AccountBanner from '../components/AuthPage/AccountBanner'
import SignInForm from '../components/AuthPage/SignInForm'
import SignUpForm from '../components/AuthPage/SignUpForm'

const AuthenticationPage = () => {
  return (
    <div>
      <AccountBanner />
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default AuthenticationPage
