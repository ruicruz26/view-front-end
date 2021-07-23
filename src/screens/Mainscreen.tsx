import React from 'react';
import Header from '../components/header/Header';
import AllMovies from '../components/movieList/AllMovies';
import MoviesFavorites from '../components/movieList/MoviesFavorites';
import MoviesSeen from '../components/movieList/MoviesSeen';
import Footer from '../components/footer/Footer';
import MovieView from '../components/movieList/MovieView';
import { Route } from 'react-router';

const Mainscreen: React.FC = () => {

    return (
        <>
            <Header></Header>
            <Route exact path="/mainscreen">
                <div className="moviesContainer">
                    <AllMovies></AllMovies>
                    <MoviesSeen></MoviesSeen>
                    <MoviesFavorites></MoviesFavorites>
                </div>
            </Route>
            <Route exact path="/mainscreen/:id" component={MovieView} />
            <Footer>
                <div>Copyright RuiCruz</div>
            </Footer>
        </>
    )
}

export default Mainscreen;