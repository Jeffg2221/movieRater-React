const mongoose = require('mongoose')


const MoviesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "{PATH} is required"],
            minlength: [3, "{PATH} must be atleast 10 characters long"]
        },
        img: {
            type: String,
            required: [true, "{PATH} is required"],
        },
        rating: {
            type: Number,
            min: [1, "Rating must be atleast 1"],
            max: [5, "Rating cant be more than 5"],
        },
        comments: {
            type: String,
            required: [true, "{PATH} is required"],
            minlength: [3, "{PATH} must be atleast 3 characters long"]
        },
        genre: {
            type: String,
            enum: {
                values: [
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
                ],
                message: '{VALUE} is not supported as a category'
            },
            required: [true, "Movie Category is required!"]

        },
        cast: {
            type: Boolean,
            default: true,

        },
        length: {
            type: Boolean,
            default: true,

        },
        credits: {
            type: Boolean,
            default: true,

        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, { timestamps: true });



const Movie = mongoose.model('movies', MoviesSchema);

module.exports = Movie