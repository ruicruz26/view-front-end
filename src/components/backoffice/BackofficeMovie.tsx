import React, {useState, useEffect} from "react";
import Movie from "../../models/movie";
import MovieService from "../../services/Movies";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import moment from 'moment'
import { useFlashbag } from "../../context/contexts";

const BackofficeMovie: React.FC = () => {
    
    const [movies, setMovies] = useState<Movie[]>([]);

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        MovieService.getAllMovies()
        .then(movies => {
            setMovies(movies)
        })
    },[]);


    function deleteMovieOnClick(e: any, id: number) {
        
        e.preventDefault();

        MovieService.deleteMovie(id)
            .then(res => {
                if(res !== undefined) {
                    let newMovies = movies.filter(movie => movie.id_movies !== id);
                    setMovies(newMovies);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                } else {
                    setFlashbag({"flashbagBody": "Can't delete this movie as it as other associations to it such as movies seen by users..." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
    }

    return (
        <>
            <div className="listControls">
                <button className="button" onClick={() => history.push('/backoffice/movies/null')}>Create New Movie</button>
            </div>
            <div className="listHeader">
                <p>Name</p>
                <p>Age Restriction</p>
                <p>Duration</p>
                <p>Release Date</p>
                <p></p>
            </div>
            <ul className="listBody">
                {movies.map((movie, key) => (
                    
                    <li key={key}>
                        <Link to={`/backoffice/movies/${movie.id_movies}`}>
                            <p>{movie.name}</p>
                            <p>{movie.classification}</p>
                            <p>{`${movie.duration} min`}</p>
                            <p>{moment(movie.release_date).format("DD-MM-YYYY")}</p>
                            <p>
                                <i className="fas fa-trash" onClick={(e) => deleteMovieOnClick(e, movie.id_movies!)}></i>
                            </p>
                        </Link>
                        <Link className="iconlink" to={`/backoffice/movies/${movie.id_movies}/media`}><i className="fas fa-images"></i></Link>
                        <Link className="iconlink" to={`/backoffice/movies/${movie.id_movies}/stream`}><i className="fas fa-video"></i></Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeMovie;