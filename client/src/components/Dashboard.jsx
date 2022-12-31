import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([])






    const [loggedInUser, setLoggedInUser] = useState({})
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res when getting logged in user", res)
                if (res.data.results) {
                    //this means the user is logged in and can accees this page
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err => {
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when gettign logged in user", err)
                navigate("/")

            })
    }, [])

    // trigger when the component has finished loading
    useEffect(() => {
        //get all the authors from server
        axios.get("http://localhost:8000/api/movies", { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setMovies(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //Delete
    const deleteMovie = (deleteID) => {
        if (window.confirm("Are you sure you want to delete your rating")) {


            axios.delete("http://localhost:8000/api/movies/" + deleteID)

                .then(res => {
                    console.log("DELETE SUCCESS", res.data)

                    //remove form the DOM after a successful delete
                    setMovies(movies.filter((movie) => movie._id !== deleteID))
                })
                .catch(err => console.log(err))
        }
    }

    // go to the update route
    const goToUpdate = (moviesMongoDB) => {
        console.log(moviesMongoDB)
        navigate("/movies/" + moviesMongoDB + "/edit")
    }







    const logout = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (

        <div style={{
            backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3TJH4_SAA7ThS1QSckEKvDJLcv6CYIDZkKQ&usqp=CAU")`, backgroundRepeat: '',  color: "red", 
        }}>
            <>
                <button className='all'> <Link to="/dashboard">Movie List</Link> </button> &nbsp; &nbsp;
                <button className="new"><Link to="/movies/new">Add Movie Rating</Link></button> <br />
                <br />
            </>


            {loggedInUser ?
                <div>
                    <h1>Welcome {loggedInUser.firstName}</h1>
                    <button className='logout' onClick={logout}>Logout</button>
                </div>




                :
                <h1>Please log in first</h1>}

            <div >
                {
                    movies.map((oneMovie) => {
                        return (
                            <div key={oneMovie._id}>
                                <ul>

                                    <li className='title'>&nbsp;&nbsp;{oneMovie.title} </li>

                                    <li><img src={oneMovie.img} alt="" /></li>
                                    <li>
                                        <button className='view'><Link to={`/movies/${oneMovie._id}`} >View Rating</Link></button> &nbsp;
                                        {oneMovie.user == loggedInUser._id ?

                                            <div>
                                                <button className='edit' onClick={() => goToUpdate(oneMovie._id)}>Edit</button>
                                                <button className='delete' onClick={() => deleteMovie(oneMovie._id)}>Delete Rating</button>
                                            </div>

                                            : ""

                                        }

                                    </li>
                                </ul>




                            </div>
                        )
                    })



                }



            </div>


        </div>



    );
};


export default Dashboard;
