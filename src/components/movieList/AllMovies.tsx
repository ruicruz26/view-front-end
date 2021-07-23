import React from 'react';
import { useEffect, useState } from 'react';
import './Movie.css';
import Movie from '../../models/movie';
import MovieService from '../../services/Movies';
import MovieItem from './MovieItem';
import { Link } from 'react-router-dom';

const AllMovies: React.FC = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  
  const [showedMovies, setShowedMovies] = useState<Movie[]>([]);
  
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    MovieService.getAllMovies()
      .then(movies => { 
        setMovies(movies)
      })
  }, []);

  useEffect(() => {
    let tempMovies: Movie[] = [];

    for (let i = index; i < index + 4; i++) {
      if(movies[i]) {
        tempMovies.push(movies[i]);
      }
    }

    setShowedMovies(tempMovies);

  },[movies,index])

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
      <h1>All Movies</h1>
      <div className="movieListContainer">
        {movies.length > 4 ? 
        <i className="movieListIcon fas fa-angle-left" onClick={changeIndex}></i> :
        ""}
        <ul className="movieList">
          {showedMovies.map((movie, key) => (
              <div key={key} className="movieCard">
                <Link to={`/mainscreen/${movie.id_movies}`}>
                  <MovieItem movie={movie}></MovieItem>
                </Link>
              </div>
            ))}
        </ul>
        {movies.length > 4 ? 
        <i className="movieListIcon fas fa-angle-right" onClick={changeIndex}></i> : 
        ""}
      </div>
    </>
  )
}

export default AllMovies;