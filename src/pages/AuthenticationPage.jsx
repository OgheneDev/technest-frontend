import React from 'react'
import AccountBanner from '../components/AccountBanner'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

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
