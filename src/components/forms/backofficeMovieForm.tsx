import React , { useState , useEffect, FormEvent } from "react";
import Movie from "../../models/movie";
import MovieService from "../../services/Movies"
import { useParams , Link } from 'react-router-dom';
import { useHistory } from "react-router";
import moment from "moment";
import BackofficeMovieCastForm from "./backofficeMovieCastForm";
import BackofficeMovieGenreForm from "./backofficeMovieGenreForm";
import { useFlashbag } from "../../context/contexts";
import { currentDate } from "../../utilities/utilities";

const BackofficeUserForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [movie, setMovie] = useState<Movie>(new Movie());
    
    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        if(id !== "null") {
            MovieService.getMovie(Number(id))
                .then(resMovie => {
                    setMovie(resMovie)
                })
        }
    }, [id, movie.id_movies]);

    
    function submitForm(e: FormEvent) {

        e.preventDefault();

        //To Correct Date Format;
        movie.release_date = moment(movie.release_date).format("YYYY-MM-DD");

        try {
            MovieService.postMovie(movie)
            .then(res => {
                if(res !== undefined) {
                    setFlashbag({"flashbagBody": `${movie.id_movies ? "Updated" : "Created"} successfully!` ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    history.push("/backoffice/movies");
                } else {
                    setFlashbag({"flashbagBody": "Couldn't create movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
            

        } catch(err) {
            alert(err);
        }
    }

    function handleOnChange(e: any) {
        setMovie({...movie, [e.target.name] : e.target.value});
    }

    return (
        <>
        <form onSubmit={submitForm}>
                <div className={`inputBox secondary`}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="name" id="name" className="input" autoComplete="off" value={movie?.name} placeholder="Name..." onChange={handleOnChange} required></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="description">Description *</label>
                    <textarea rows={2} name="description" id="description" className="input" autoComplete="off" value={movie?.description} maxLength={500} placeholder="Description..." onChange={handleOnChange} required></textarea>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="duration">Duration * (in minutes)</label>
                    <input type="number" name="duration" id="duration" className="input" autoComplete="off" value={movie?.duration} placeholder="200..." onChange={handleOnChange} required></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="classification">Age Restriction *</label>
                    <input type="number" name="classification" id="classification" className="input" autoComplete="off" value={movie?.classification} placeholder="18..." max="18" onChange={handleOnChange} required></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="release_date">Release Date *</label>
                    <input type="date" name="release_date" id="release_date" className="input" autoComplete="off" value={ moment(movie.release_date === "1900-01-01" ? currentDate() : movie.release_date).format("YYYY-MM-DD") } onChange={handleOnChange} required></input>
                </div>
                <div className="formFooter">
                    <Link to="/backoffice/movies">Go Back</Link>
                    <button className="button">{ movie.id_movies ? "Edit Movie" : "Create New Movie"}</button>
                </div>
                </form>

                {movie.id_movies !== undefined ? 
                <>
                    <BackofficeMovieCastForm movieId={movie.id_movies}/>

                    <BackofficeMovieGenreForm movieId={movie.id_movies}/>
                </>
                : 
                ""}
        </>
    )
}

export default BackofficeUserForm;