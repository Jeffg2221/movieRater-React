import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
const styles = {
    paper: {
        width: "40rem", padding: "1rem",
        marginLeft:"40rem"
    },
    input: {
        marginBottom: "1rem",
        
    },
    button: {
        width: "100%"
    }
}

const CreateMovie = (props) => {

    const navigate = useNavigate()

    const genreOptions = [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime and mystery",
        "Fantasy",
        "Historical",
        "Historical fiction",
        "Horror",
        "Romance",
        "Satire",
        "Science Fiction",
        "Cyberpunk and derivatives",
        "Speculative",
        "Thriller",
        "Western",
        "Other",
        ]

    // forms state variable
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [rating, setRating] = useState("")
    const [comments, setComments] = useState("")
    const [genre, setGenre] = useState("")
    const [cast, setCast] = useState(true)
    const [length, setLength] = useState(true)
    const [credits, setCredits] = useState(true)


    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    const createMovie = (e) => {
        e.preventDefault()
        // console.log(title)

        const newMovie = {
            title, 
            img, 
            rating,
            genre,
            comments,  
            cast, 
            length, 
            credits 

        }
        console.log(newMovie)

        axios.post("http://localhost:8000/api/movies", newMovie, {withCredentials: true})
        .then(response=>{
            // console.log(response)
            if(response.data.errors){
                setErrors(response.data.errors);
            }else{
                navigate("/dashboard")
            }
        })
        .catch(err=>console.log(err))
        navigate("/")
    }




    return (
        <div>
            {/* {JSON.stringify(title)} */}

            <>
                <button className='all'> <Link to="/dashboard">Movie List</Link> </button> &nbsp; &nbsp;
                <button className="new"><Link to="/movies/new">Add Movie Rating</Link></button> <br />
                <br />
            </>

            <Paper elevation={3} style={styles.paper}>
                <h2>Add Movie Rating</h2>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <form onSubmit={createMovie}>
                

                    
                    <p>
                        
                        <label>Title</label><br />
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                        
                        
                    </p>
                    <div>
                        {title.length > 0 && title.length < 2
                        ? "First title must be at least 2 characters.": ""}
                    </div>
                    
                    <p>
                        <label>Image Url</label><br />
                        <input type="text" onChange={(e) => setImg(e.target.value)} value={img} />
                    </p>
                    <p>
                        <label>Movie Rating</label><br />
                        <input type="number" onChange={(e) => setRating(e.target.value)} value={rating} />
                    </p>
                    <p>
                        <label>Comments</label><br />
                        <input type="text" onChange={(e) => setComments(e.target.value)} value={comments} />

                        {comments.length > 0 && comments.length < 2
                        ? "comments  must be at least 2 characters.": ""}
                    </p>
                    <p>
                        <label>Genre:</label><br />
                        <select className="form-control" onChange={e => setGenre(e.target.value)} value={genre} >
                        {
                            genreOptions.map((gen,i)=>{
                                return <option key={i} value={gen}>{gen}</option>
                            })
                        }
                            
                        </select>
                    </p>
                    <p>
                        <label>Right Cast</label><br />
                        <input type="checkbox" onChange={(e) => setCast(e.target.checked)} checked={cast} />

                        </p>
                        <p>
                            <label>Perfect Length</label><br />
                            <input type="checkbox" onChange={(e) => setLength(e.target.checked)} checked={length} />
                        </p>
                        <p>
                            <label>End Credits 👀 </label><br />
                            <input type="checkbox" onChange={(e) => setCredits(e.target.checked)} checked={credits} />
                        </p>
                

                    {/* <Link to="/authors" className="btn btn-success">
                        Cancel
                    </Link>
                    &nbsp; */}
                    <Button type="submit" variant="contained" color="primary">
                        Add Rating
                    </Button>
                </form>



            </Paper>
        </div>
    )
}

export default CreateMovie