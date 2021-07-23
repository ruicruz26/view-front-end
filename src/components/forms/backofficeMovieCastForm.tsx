import React , { useEffect , useState } from "react";
import CastMovie from "../../models/castMovie";
import NonCastMovie from "../../models/NonCastMovie";
import MovieService from "../../services/Movies";
import { useFlashbag } from "../../context/contexts";

interface backofficeMovieCastFormProps {
    movieId: number;
}

const BackofficeMovieCastForm: React.FC<backofficeMovieCastFormProps> = ({movieId}) => {

    const [movieCast, setMovieCast] = useState<CastMovie[]>([]);
    
    const [movieNonCast, setMovieNonCast] = useState<NonCastMovie[]>([]);

    const { setFlashbag } = useFlashbag();

    useEffect(() => {
        MovieService.getAllMovieCast(movieId)
            .then(resMovieCast => {
                setMovieCast(resMovieCast)
            })

            MovieService.getAllMovieNonCast(movieId)
        .then(resNonMovieCast => {
            setMovieNonCast(resNonMovieCast)
        })

    },[movieId,movieCast.length])


    function AddCastToMovie(e: any) {

        if(e.target.value !== "") {
            let movieCastToAdd = new CastMovie({
                                    "movies_id": movieId,
                                    "cast_id": e.target.value,
                                    "name": ""});

            if(e.target.parentElement.classList.contains("dropdownPrimary")) {
                e.target.parentElement.classList.toggle("opened");
            }
        
            MovieService.postMovieCast(movieCastToAdd)
                .then(res  => {
                    if(res !== undefined) {
                        movieCast.push(movieCastToAdd);
                        setMovieCast([...movieCast]);
                        setFlashbag({"flashbagBody": "Added successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't add cast from movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }

                    e.target.value = "";
                })
        }
    }

    function removeCastFromMovie(idMovie: number, idCast: number) {
        
        MovieService.deleteMovieCast(idMovie,idCast)
        .then(res => {
            if(res !== undefined) {
                let newMovieCast = movieCast.filter(moviecast => moviecast.cast_id !== idCast);
                setMovieCast(newMovieCast);
                setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
            } else {
                setFlashbag({"flashbagBody": "Couldn't delete cast from movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
            }
        });
    }

    return (
        <>
        <h2 className="extraAddTitle"><p>Add Cast/Crew</p><p>Current Cast/Crew</p></h2>
        <div className="ExtraAddContainer">
            <div className="addContainer">
                <div className={`dropdownPrimary`}>
                    <label htmlFor="roles_id">Person *</label>
                    <select name="roles_id" id="roles_id" onClick={AddCastToMovie} required>
                        <option value="">Choose an option...</option>
                        {movieNonCast?.map((cast, key) => (
                            <option key={key} value={cast.id_cast}>{cast.name}</option>
                    ))}
                    </select>
                </div>
            </div>
            <div className="showAddedContainer">
                <ul className="addedList">
                    {movieCast.map((movieCast, key) => (
                        <li data-index={key} key={key}>{movieCast.name} <i className="fas fa-trash" onClick={() => removeCastFromMovie(movieCast.movies_id, movieCast.cast_id)}></i></li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default BackofficeMovieCastForm;