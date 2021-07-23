import React , {useState} from "react";
import './Movie.css';
import Movie from "../../models/movie";
import { useEffect } from "react";
import MediaService from '../../services/Media';
import Media from "../../models/media";

interface MovieItemProps {
    movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({movie}) => {

    const [movieMedia, setMovieMedia] = useState<Media[]>([]);

    useEffect(() => {
        MediaService.getAllMediaByMovie(Number(movie.id_movies))
        .then(media => {
            setMovieMedia(media);
        })
    }, [movie.id_movies])

    return(
        <>
            <div>
                {movieMedia[0] !== undefined ? 
                <img src={`${process.env.REACT_APP_API_URL}/media/images/${movieMedia[0].file_location}`} alt="tst" /> : 
                <p>Oops, seems something is missing!</p>}
            </div>
            <p>
                {movie.name}
            </p>
            <div className="movieDescription">
                {movie.description}
            </div>
        </>
    )
}

export default MovieItem;