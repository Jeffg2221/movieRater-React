import React, { useEffect, useState } from 'react'
import { useParams, useNavigate ,Link} from 'react-router-dom'
import axios from 'axios'
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
        marginLeft: "25rem"
    },
    input: {
        marginBottom: "1rem",

    },
    button: {
        width: "100%"
    }
}
const Update = (props) => {

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

    //keep track of what is being typed via useState hook
    // forms state variable
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [rating, setRating] = useState("")
    const [comments, setComments] = useState("")
    const [genre, setGenre] = useState("")
    const [cast, setCast] = useState("")
    const [length, setLength] = useState("")
    const [credits, setCredits] = useState("")

    const navigate = useNavigate()

    //grab the url variable
    const { id } = useParams()



    useEffect(() => {
        axios.get('http://localhost:8000/api/movies/' + id, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setTitle(res.data.title)
                setImg(res.data.img)
                setRating(res.data.rating)
                setComments(res.data.comments)
                setGenre(res.data.genre)
                setCast(res.data.cast)
                setLength(res.data.length)
                setCredits(res.data.credits)

            })
            .catch(err => console.log(err))
    }, [id])
    const [errors, setErrors] = useState([]);
    //onSubmit to update title, price, and description
    const updateMovie = (e) => {
        e.preventDefault();
        // console.log(title,price,description)  checks if content is being recorded in the form 
        //! PUT REQUEST
        axios.put("http://localhost:8000/api/movies/" + id, {

            title,
            img,
            rating,
            comments,
            genre,
            cast,
            length,
            credits
        })

            .then(res => {
                console.log("✅ client success")
                console.log(res.data)
                navigate("/dashboard")
            })
            .catch(err => {
                console.log("❌ client error")
                console.log(err)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                console.log(JSON.stringify(errorResponse))
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }



    return (
        <div>
            <>
                <button className='all'> <Link to="/dashboard">Movie List</Link> </button> &nbsp; &nbsp;
                <button className="new"><Link to="/movies/new">Add Movie Rating</Link></button> <br />
                <br />
            </>
            <h1>Update Rating</h1>

            <div>
                <Paper elevation={3} style={styles.paper}>
                    <h2>Add Movie Rating</h2>
                    <form onSubmit={updateMovie}>
                        {errors.map((err, index) => <p key={index}>{err}</p>)}


                        <p>
                            <label>Title</label><br />
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

                            {title.length > 0 && title.length < 2
                                ? "First title must be at least 2 characters." : ""}



                        </p>

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
                                ? "comments  must be at least 2 characters." : ""}
                        </p>
                        <p>
                            <label>Genre:</label><br />
                            <select className="form-control" onChange={e => setGenre(e.target.value)} value={genre} >
                                {
                                    genreOptions.map((gen, i) => {
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
                            Update Rating
                        </Button>
                    </form>



                </Paper>

            </div>
        </div>
    )
}

export default Update
