import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import Alert from '../components/Alerts'
import Image from 'next/image'
import Link from 'next/Link'
import { AuthCredential, useAuth } from '../context/Auth'

const Login = () => {
  const [userSignIn, setUserSignIn] = useState<AuthCredential>({} as AuthCredential)
  const { error, loading, signIn } = useAuth()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    signIn(userSignIn)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserSignIn({ ...userSignIn, [name]: value })
  }

  return (
    <div className="app-padding">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <Image src="/social-web-logo.png" width={40} height={40} alt="social-web-logo"></Image>
        <div className="title ps-2 font-size-25 font-weight-600">PupuKity</div>
      </div>
      <form className="app-padding m-auto card rounded-10" id="register" onSubmit={handleSubmit}>
        <h5 className="card-title text-center">Login</h5>
        <Alert type={error?.type} message={error?.message} />
        <div className="form-group mt-3">
          <input
            type="email"
            name="email"
            className="form-control app-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="password"
            name="password"
            className="form-control app-control"
            id="inputPassword"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-danger rounded-33 mt-3" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <span className="span d-flex mt-3">OR</span>
        <Link href="/register">
          <button type="button" className="btn btn-secondary rounded-33 mt-3">
            Create an account
          </button>
        </Link>
      </form>
    </div>
  )
}

export default Login
