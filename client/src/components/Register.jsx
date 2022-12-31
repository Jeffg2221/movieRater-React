import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    // forms submit variables 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    //for redirect
    const navigate = useNavigate()






    const [errors, setErrors] = useState([]);

    const register = (e) => {
        e.preventDefault();
        const tempObjToSendToDB = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        }
        axios.post('http://localhost:8000/api/register', tempObjToSendToDB, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate("/dashboard")
                }
            })
            .catch(error => {
                const errorResponse = error.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    
}






return (
    <>
        <div >
            {errors.map((error, index) => <p key={index}>{error}</p>)}
        </div>

        <div>
            <h1>Register Below</h1>
            <form onSubmit={register}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    {errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    {errors.email ? <p className="text-danger">{errors.email.message}</p> : ""}

                </div><div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    {errors.password ? <p className="text-danger">{errors.password.message}</p> : ""}

                </div><div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    {errors.confirm? <p className="text-danger">{errors.confirm.message}</p>: ""}

                </div>
                <input type="submit" value="Sign up" className="btn btn-primary" />

            </form>
        </div>
    </>
)
}

export default Register
