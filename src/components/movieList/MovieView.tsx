import React , { useState , useEffect } from "react";
import Movie from "../../models/movie";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from "moment";
import MovieService from "../../services/Movies"
import StreamService from "../../services/Stream";
import MediaService from "../../services/Media";
import Media from "../../models/media";
import Stream from "../../models/stream";
import { useUser } from "../../context/contexts";
import { useFlashbag } from "../../context/contexts";

const MovieView: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const { user } = useUser();

    const [movie, setMovie] = useState<Movie>(new Movie());

    const [movieMedia, setMovieMedia] = useState<Media[]>([]);
    
    const [movieStream, setMovieStream] = useState<Stream[]>([]);

    const { setFlashbag } = useFlashbag();

    let [isUserFavorite, setIsUserFavorite] = useState<boolean>();

    let currentMedia = 0;

    useEffect(() => {
        MovieService.getMovie(Number(id))
            .then(resMovie => {
                setMovie(resMovie)
            })

    
            MediaService.getAllMediaByMovie(Number(id))
            .then(media => {
                setMovieMedia(media);
            })

            StreamService.getAllStreamsByMovie(Number(id))
            .then(stream => {
                setMovieStream(stream);
            })
    }, [id]);

    useEffect(() => {        
        if(user.id_users !== undefined) {
            MovieService.allUserFavorites(user.id_users)
                .then(res => {
                    res.forEach((res: Movie) => {
                        if(res.id_movies === Number(id)) {
                            setIsUserFavorite(true);
                        }
                    })
                })
        }
    },[id,user.id_users]);
    
    function chooseMedia(e: any) {

        if(e.target.classList.contains("fa-angle-left")) {
            if(currentMedia - 1 >= 0) {
                currentMedia -= 1;
            } else {
                currentMedia = movieMedia.length-1;
            }

            document.querySelector("img")!.src = `${process.env.REACT_APP_API_URL}/media/images/${movieMedia[currentMedia].file_location}`
        }

        if(e.target.classList.contains("fa-angle-right")) {
            if(currentMedia + 1 < movieMedia.length) {
                currentMedia += 1;
            } else {
                currentMedia = 0;
            }

            document.querySelector("img")!.src = `${process.env.REACT_APP_API_URL}/media/images/${movieMedia[currentMedia].file_location}`
        }
    }

    function chooseStream(streamId: number) {

        let bool: boolean;
        
        if(user.id_users !== undefined) {
            MovieService.allUserSeen(user.id_users)
                .then(res => {
                    res.forEach((res: Movie) => {
                        if(res.id_movies === Number(id)) {
                            
                            bool = true;
                        }
                    })

                    if(!bool) {
                        MovieService.createUserSeen({"users_id": user.id_users!, "movies_id": movie.id_movies!})
                        .then(res => {
                            if(res !== undefined) {                      
                                setFlashbag({"flashbagBody": "Added successfully to your seen list!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                            } else {
                                setFlashbag({"flashbagBody": "Couldn't add to favorites." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                            }
                        })
                    }
                })
        }
        
        StreamService.streamMovie(streamId)
        .then(stream => {
            if(stream.data.response !== undefined) {
                let src = document.querySelector('.moviePlayer video')!;

                src.setAttribute('src', `${process.env.REACT_APP_API_URL}/api/streaming/${stream.data.response.file_location}`);
            }
        })
    }
    
    function markAsFavorite() {
        if(!isUserFavorite) {
            MovieService.createUserFavorites({"users_id": user.id_users!, "movies_id": movie.id_movies!})
                .then(res => {
                    if(res !== undefined) {
                        setIsUserFavorite(true);
              
                        setFlashbag({"flashbagBody": "Added successfully to your favorites list!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't add to favorites." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }
                })
            
        }
    }

    return (
        <>
            <div className="movieView">
                <div className="viewControls">
                    <Link to="/mainscreen">Go Back</Link>
                </div>
                <div className="viewBody">
                    <p className="movieTitle">{movie.name}</p>
                    <div className="movieContent">
                        {movieMedia[currentMedia] !== undefined ? 
                        <div className="movieImages" onClick={chooseMedia}>
                            <i className="fas fa-angle-left"></i>
                            <img src={`${process.env.REACT_APP_API_URL}/media/images/${movieMedia[currentMedia].file_location}`} alt="tst" /> 
                            <i className="fas fa-angle-right"></i>
                        </div>
                        : 
                        <p>Oops, seems something is missing!</p>}
                        <div>
                            <div className="movieInfo">
                                <p>This movie as a duration of {movie.duration} min.</p>
                                <p>This movie is age restriction of {movie.classification} years old.</p>
                                <p>This movie was released in {moment(movie.release_date).format("DD-MM-YYYY")}.</p>
                            </div>
                            <div className="movieDescription">
                                <p>{movie.description}</p>
                            </div>
                        </div>
                        <div>
                            <div className="header">
                                <p>Movie Options:</p>
                            </div>
                            <div className="body">
                                <ul>
                                    {movieStream.map((stream, key) => (
                                        <li key={key} onClick={() => chooseStream(stream.id_stream!)}>
                                            <button className="button primary">{`${stream.stream_type} - Play Now`}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="footer">
                                <p>Click <i onClick={markAsFavorite} className={`${isUserFavorite ? "fas" : "far"} fa-heart`}></i> and watch later!</p>
                            </div>
                        </div>
                    </div>
                    <div className="moviePlayer">
                        <p>Choose one of the options above to watch<b>{movie.name}</b></p>
                        <video controls autoPlay>
                            <p>Your browser does not support the native video player.</p>
                        </video>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieView;