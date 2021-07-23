import React , { useEffect , useState } from "react";
import Genre from "../../models/genre";
import GenreMovie from "../../models/genreMovie";
import MovieService from "../../services/Movies"
import { useFlashbag } from "../../context/contexts";

interface backofficeMovieCastFormProps {
    movieId: number;
}

const BackofficeMovieGenreForm: React.FC<backofficeMovieCastFormProps> = ({movieId}) => {

    const [genres, setGenres] = useState<Genre[]>();

    const [movieGenres, setMovieGenres] = useState<GenreMovie[]>([]);

    const { setFlashbag } = useFlashbag();

    useEffect(() => {
        MovieService.getAllMovieGenre(movieId)
            .then(resMovieGenre => {
                setMovieGenres(resMovieGenre)
            })
        
            MovieService.getAllNonMovieGenre(movieId)
            .then(resNonMovieGenre => {
                setGenres(resNonMovieGenre)
            })
    },[movieId,movieGenres.length])

    
    function AddGenreToMovie(e: any) {

        let movieGenreToAdd = new GenreMovie({
                                "movies_id": movieId,
                                "genre_id": e.target.value,
                                "genre_name": ""});

        if(e.target.parentElement.classList.contains("dropdownPrimary")) {
            e.target.parentElement.classList.toggle("opened");
        }

        if(e.target.value !== "") {
            MovieService.postMovieGenre(movieGenreToAdd)
                .then(res => {
                    if(res !== undefined) {
                        movieGenres.push(movieGenreToAdd);
                        setMovieGenres([...movieGenres]);
                        setFlashbag({"flashbagBody": "Added successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't add genre from movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }

                    e.target.value = "";
                })
        }
    }

    function removeGenreFromMovie(e: any, idMovie: number, idGenre: number) {
        
        MovieService.deleteMovieGenre(idMovie,idGenre)
        .then(res => {
            if(res !== undefined) {
                let newMovieGenres = movieGenres.filter(moviegenre => moviegenre.genre_id !== idGenre);
                setMovieGenres(newMovieGenres);
                setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
            } else {
                setFlashbag({"flashbagBody": "Couldn't delete genre from movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
            }
        });
    }

    return (
        <>
            <h2 className="extraAddTitle"><p>Add Genre</p><p>Current Genre</p></h2>
            <div className="ExtraAddContainer">
                <div className="addContainer">
                    <div className={`dropdownPrimary`}>
                        <label htmlFor="genre_id">Genres *</label>
                        <select name="genre_id" id="genre_id" onClick={AddGenreToMovie} required>
                            <option value="">Choose an option...</option>
                            {genres?.map((genre, key) => (
                                <option key={key} value={genre.id_genre}>{genre.name}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className="showAddedContainer">
                    <ul className="addedList">
                        {movieGenres.map((movieGenre, key) => (
                            <li key={key}>{movieGenre.genre_name} <i className="fas fa-trash" onClick={(e) => removeGenreFromMovie(e, movieGenre.movies_id, movieGenre.genre_id)}></i></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BackofficeMovieGenreForm;