const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


module.exports = {
    create: async (req, res)=>{
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        let foundUser = await User.findOne({_id: decodedJWT.payload.id});
        let {...movieData} = req.body;
        movieData.user = foundUser;
        Movie.create(movieData)
            .then(newMovie=>{
                User.findOneAndUpdate(
                    {_id: decodedJWT.payload.id},
                    { $push: { movies: newMovie  } }
                )
                .then(updatedUser=>{
                    res.json({results: newMovie})
                })
    
            })
            .catch(err=>{
                res.json(err)
            })
    },

    getAll: (req, res) => {
        Movie.find().sort({name:"asc"})
            .then(allMovies => {
                res.json(allMovies)
            })

            .catch(err => res.json(err));
    },

    getUserMovies: async (req,res)=>{
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        let foundUser = await User.findOne({_id: decodedJWT.payload.id});
        Movie.find({user: foundUser}).sort({date:-1})
            .then(movies=>{
                res.json({results: movies})
            })
            .catch(err=>{
                res.json(err)
            })
    },


    getOneMovie:(req, res) => {
        //http://localhost:8000/api/movies/id
        Movie.findById(req.params.id)
            .then(oneMovie => res.json(oneMovie))
            .catch(err => res.json(err))
    },

        // Update
        Update: (req, res) => {
            console.log("UPDATE ID:", req.params.id)
            console.log("req.body:", req.body)
            Movie.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
                .then(updatedMovie => res.json(updatedMovie))
                    .catch(err => res.json(err))
    },

    deleteOneMovie: (req,res)=>{
        Movie.deleteOne({_id: req.params.id})
            .then(expense=>{
                res.json({results: expense})
            })
            .catch(err=>{
                res.json(err)
            })
    }
    




}
