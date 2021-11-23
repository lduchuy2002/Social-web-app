import { NextPage } from 'next'
import Image from 'next/image'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Alert from '../components/Alerts'
import { useAuth, User } from '../context/Auth'

const Register: NextPage = () => {
  const [startDate, setStartDate] = useState<any>(new Date())
  const [userSignUp, setUserSignUp] = useState<User>({} as User)
  const { error, signUp, loading } = useAuth()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    signUp({
      ...userSignUp,
      birthday: startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear(),
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserSignUp({ ...userSignUp, [name]: value })
  }

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserSignUp({ ...userSignUp, [name]: value })
  }

  return (
    <div className="app-padding">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <Image src="/social-web-logo.png" width={40} height={40} alt="social-web-logo"></Image>
        <div className="title ps-2 font-size-25 font-weight-600">PupuKity</div>
      </div>
      <form className="app-padding m-auto card rounded-10" id="register" onSubmit={handleSubmit}>
        <h5 className="card-title text-center">Register</h5>
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
        <div className="form-group mt-3">
          <input
            type="text"
            name="username"
            className="form-control app-control"
            id="inputUserName"
            placeholder="User name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <DatePicker name="birthday" className="app-control" selected={startDate} onChange={setStartDate}></DatePicker>
        </div>
        <div className="form-group mt-3">
          <select
            className="form-select app-control"
            placeholder="Gender"
            name="gender"
            onChange={handleGenderChange}
            defaultValue={0}>
            <option value={0}>Female</option>
            <option value={1}>Male</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <input type="checkbox" className="form-check-input ml-2" id="check" />
          {'\t'}
          <label className="form-check-label ps-2" htmlFor="exampleCheck">
            I agree to the Terms of Service
          </label>
        </div>
        <button type="submit" className="btn btn-danger d-block rounded-33 w-100 mt-3" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register
