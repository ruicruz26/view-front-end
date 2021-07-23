import React from 'react';
import { useEffect, useState } from 'react';
import './Movie.css';
import Movie from '../../models/movie';
import MovieService from '../../services/Movies';
import MovieItem from './MovieItem';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/contexts';
import { useFlashbag } from "../../context/contexts";

const MoviesSeen: React.FC = () => {

  const {user} = useUser();
  
  const [movies, setMovies] = useState<Movie[]>([]);

  const [showedMovies, setShowedMovies] = useState<Movie[]>([]);
  
  const [index, setIndex] = useState<number>(0);

  const { setFlashbag } = useFlashbag();

  useEffect(() => {
    if(user.id_users) {    
      MovieService.allUserSeen(user.id_users)
        .then(movies => {
          if(movies) {
            setMovies(movies)
          }
        })
    }
  }, [user.id_users]);

  useEffect(() => {
    let tempMovies: Movie[] = [];

    for (let i = index; i < index + 4; i++) {
      if(movies[i]) {
        tempMovies.push(movies[i]);
      }
    }

    setShowedMovies(tempMovies);

  },[movies,index])

  function deleteSeen(movieId: number) {

    MovieService.deleteUserSeen(user.id_users!, movieId)
      .then(res => {
        if(res !== undefined) {
          let newMovies = movies.filter(movie => movie.id_movies !== movieId);
          setMovies(newMovies)

          setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
      } else {
          setFlashbag({"flashbagBody": "Couldn't delete from favorites." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
      }
      })
  }

  function changeIndex(e: any) {
    if(e.target.classList.contains("fa-angle-right")) {
      if(index + 4 < movies.length) {
        setIndex(index + 1);
      }
    }
    
    if(e.target.classList.contains("fa-angle-left")) {
      if(index > 0) {
        setIndex(index - 1);
      }
    }
  }

  return (
    <>
      <h1>Already Watched</h1>
      <div className="movieListContainer">
        {movies.length > 4 ? 
        <i className="movieListIcon fas fa-angle-left" onClick={changeIndex}></i> : 
        ""}
        <ul className="movieList">
          {showedMovies.map((movie, key) => {
            return(
              <div key={key} className="movieCard">
                <i className="fas fa-times" onClick={() => deleteSeen(movie.id_movies!)}></i>
                <Link to={`/mainscreen/${movie.id_movies}`}>
                  <MovieItem movie={movie}></MovieItem>
                </Link>
              </div>
            )
          })}
        </ul>
        {movies.length > 4 ? 
        <i className="movieListIcon fas fa-angle-right" onClick={changeIndex}></i> : 
        ""}
      </div>
    </>
  )
}

export default MoviesSeen;