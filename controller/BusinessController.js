import * as reviewsDao from '../daos/reviewsDao.js'


export default class BusinessController implements MovieControllerI {

    private static movieDao: MovieDao = MovieDao.getInstance();
    private static movieController: BusinessController | null = null;


    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MovieController
     */
    public static getInstance = (app: Express): MovieController => {
    if (MovieController.movieController === null) {
    MovieController.movieController = new BusinessController();
    app.post("/api/movies", MovieController.movieController.createMovie);
    app.post("/api/movies/likes", MovieController.movieController.likeMovie);
    app.post("/api/movies/dislikes", MovieController.movieController.dislikeMovie);

    app.get("/api/movies", MovieController.movieController.findAllMovies);
    app.get("/api/movies/:mid", MovieController.movieController.findMovieByID);
    app.get("/api/movies/:mid", MovieController.movieController.findMovieByImdbID);
    app.put("/api/movies/:mid", MovieController.movieController.updateMovie);
    app.delete("/api/movies/:mid", MovieController.movieController.deleteMovie);
    app.delete("/api/movies", MovieController.movieController.deleteAllMovie);
}
return BusinessController.movieController;
}


private constructor() {
}

findAllMovies = (req: Request, res: Response) => {

    BusinessController.movieDao.findAllMovies()
        .then((movies: Movie[]) => res.json(movies));

}

createMovie = (req: Request, res: Response) => {
    BusinessController.movieDao.createMovie(req.body)
        .then((movie: Movie) => res.json(movie))
}

findMovieByID = (req: Request, res: Response) =>
    BusinessController.movieDao.findMovieByID(req.params.mid)
        .then((movie: Movie) => res.json(movie));

findMovieByImdbID = (req: Request, res: Response) =>
    BusinessController.movieDao.findMovieByImdbID(req.params.mid)
        .then((movie: Movie) => res.json(movie));


deleteMovie = (req: Request, res: Response) =>
    BusinessController.movieDao.deleteMovie(req.params.mid)
        .then((status) => res.json(status));

updateMovie = (req: Request, res: Response) =>
    BusinessController.movieDao.updateMovie(req.params.mid, req.body)
        .then((status) => res.json(status));


likeMovie = async (req: Request, res: Response) => {
    const movie = req.body;
    const actualMovie = await BusinessController.movieDao.likeMovie(movie);
    res.json(actualMovie)
}

dislikeMovie = async (req: Request, res: Response) => {
    const movie = req.body;
    const actualMovie = await BusinessController.movieDao.dislikeMovie(movie);
    res.json(actualMovie)
}

deleteAllMovie = (req: Request, res: Response) =>
    BusinessController.movieDao.deleteAllMovie()
        .then((status) => res.json(status));


}

