import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    //for redirect
    const navigate = useNavigate()

    // forms submit variables 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //DB error array
    const [errors, setErrors] = useState([]);

    const login = (e) => {
        e.preventDefault();
        const tempObjToSendToDB = {
            email,
            password,
        }
        axios.post('http://localhost:8000/api/login', tempObjToSendToDB, { withCredentials: true })
        .then(response => {
            console.log("Client Success")
            console.log(response.data)
            navigate('/dashboard')
        })
        .catch(error => {
            console.log("Something Went Wrong")
            console.log(error)
          const errorResponse = error.response.data.errors; // Get the errors from err.response.data
              const errorArr = []; // Define a temp error array to push the messages in
              for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
              // Set Errors
                setErrors(errorArr);
        })}




    return (
        <>
            <div>
                {errors.map((error, index) => <p key={index}>{error}</p>)}
            </div>
            <div>
                <h1>Login Below</h1>
                <form onSubmit={login}>


                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        {errors.email ? <p className="text-danger">{errors.email.message}</p> : ""}

                    </div><div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        {errors.password ? <p className="text-danger">{errors.password.message}</p> : ""}

                    </div>
                    <input type="submit" value="Log In" className="btn btn-primary" />

                </form>

            </div>
        </>
    )
}

export default Login
