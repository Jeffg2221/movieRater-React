const MovieController = require("../controllers/movie.controller");
const {authenticate}= require('../config/jwt.config');

module.exports = (app)=>{
    app.get("/api/movies", MovieController.getAll);
    app.post("/api/movies",authenticate, MovieController.create);
    app.get("/api/getCurrentUserMovies", MovieController.getUserMovies);
    app.get("/api/movies/:id", MovieController.getOneMovie);
    app.put('/api/movies/:id', MovieController.Update);
    app.delete("/api/movies/:id", MovieController.deleteOneMovie);
}