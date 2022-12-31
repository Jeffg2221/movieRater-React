import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const View = (props) => {

    const [movies, setMovies] = useState([])

    const navigate = useNavigate()

    //grab the url variable
    const { id } = useParams()

    const [thisMovie, setThisMovie] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8000/api/movies/' + id, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setThisMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id])


    // go to the update route
    const goToUpdate = (movieMongoID) => {
        console.log(movieMongoID)
        navigate("/movies/" + movieMongoID + "/edit")
    }

    //Delete
    const deleteMovie = (deleteID) => {
        if (window.confirm("Are you sure you want to delete")) {


            axios.delete("http://localhost:8000/api/movies/" + deleteID)

                .then(res => {
                    console.log("DELETE SUCCESS", res.data)
                    navigate("/movies")

                    //remove form the DOM after a successful delete
                    setMovies(movies.filter((movie) => movie._id !== deleteID))
                })
                .catch(err => console.log(err))
        }
    }





    return (
        <div style={{
            backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3TJH4_SAA7ThS1QSckEKvDJLcv6CYIDZkKQ&usqp=CAU")`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", color: "teal"
        }}>
            <>
                <button className='all'> <Link to="/dashboard">Movie List</Link> </button> &nbsp; &nbsp;
                <button className="new"><Link to="/movies/new">Add Movie Rating</Link></button> <br />
                <br />
            </>
            {
                thisMovie ? (

                    <div>
                        <h1>About</h1>

                        <h4> Movie Title: {thisMovie.title}</h4>
                        <ul>

                            <li>Movie Rating: {thisMovie.rating}</li>
                            <li>Right Cast?: {thisMovie.cast ? "Yes" : "No"}</li>
                            <li>Perfect Length?: {thisMovie.length ? "Yes" : "No"}</li>
                            <li>End Credits 👀: {thisMovie.credits ? "Yes" : "No"}</li>

                        </ul>
                        <p>
                            <img src={thisMovie.img} alt="" /> <br /><br />
                            {thisMovie.comments}
                        </p>
                        {/* <button onClick={() => goToUpdate(thisMovie._id)}>Edit</button> <button onClick={() => deleteMovie(thisMovie._id)}>Delete</button> */}
                    </div>
                ) : "loading...."

            }




        </div>
    )
}

export default View
