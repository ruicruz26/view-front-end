import axios from 'axios';
import Movie from '../models/movie';
import MovieCast from '../models/castMovie';
import NonCastMovie from '../models/NonCastMovie';
import MovieGenre from '../models/genreMovie';
import Genre from '../models/genre';
import { serviceErrorHandler } from '../utilities/utilities';
import UserSeen from '../models/userSeen';
import UserFavorite from '../models/userFavorite';

class MovieService {

    static url: string;
    static token: string;

    constructor() {

        MovieService.url = `${process.env.REACT_APP_API_URL}/api/`;
        MovieService.token = localStorage.getItem("token")!; 
    }

    /* BASIC MOVIE CRUD */

    public async getAllMovies(): Promise<Movie[]> {
        
        let movies: Movie[] = [];

        try{
            const response = await axios.get(`${MovieService.url}movies`, {
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })

            response.data.forEach((res: any) => {
                movies.push(new Movie(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return movies;
    }

    public async getMovie(id: number): Promise<Movie> {

        let movie: Movie = new Movie();    

        try{
            const response = await axios.get(`${MovieService.url}movies/${id}`, {
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })

            movie = response.data;
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return movie;
    }

    public async postMovie(payload: Movie): Promise<any> {

        let res;

        try {
            await axios.post(`${MovieService.url}movies`,payload,{
                "headers" : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async deleteMovie(id: number): Promise<any> {

        let res;

        try {
            await axios.delete(`${MovieService.url}movies/${id}`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    /* MOVIE CAST */

    public async getAllMovieCast(id: number): Promise<MovieCast[]> {
        
        const movieCast: MovieCast[] = [];

        try{

            await axios.get(`${MovieService.url}movies/${id}/cast`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })

            .then(response => {
                if(response.status === 200) {
                    response.data.forEach((res: any) => {
                        movieCast.push(new MovieCast(res))
                    })
                }
            })
        }
        
        catch(err) {
            serviceErrorHandler(err);
        }

        return movieCast;
    }

    public async getAllMovieNonCast(id: number): Promise<NonCastMovie[]> {
        
        const movieCast: NonCastMovie[] = [];

        try{

            await axios.get(`${MovieService.url}movies/${id}/noncast`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })

            .then(response => {
                if(response.status === 200) {
                    response.data.forEach((res: any) => {
                        movieCast.push(new NonCastMovie(res))
                    })
                }
            })
        }
        
        catch(err) {
            serviceErrorHandler(err);
        }

        return movieCast;
    }

    public async postMovieCast(payload: any): Promise<any> {

        let res;

        try {
            await axios.post(`${MovieService.url}movies/cast`,payload,{
                headers: {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async deleteMovieCast(movieId: number, castId: number): Promise<any> {

        let res;

        try {
            await axios.delete(`${MovieService.url}movies/${movieId}/cast/${castId}`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    /* MOVIE GENRE */

    public async getAllMovieGenre(id: number): Promise<MovieGenre[]> {
        
        const movieGenre: MovieGenre[] = [];

        try{

            await axios.get(`${MovieService.url}movies/${id}/genre`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })

            .then(response => {
                if(response.status === 200) {
                    response.data.forEach((res: any) => {
                        movieGenre.push(new MovieGenre(res))
                    })
                }
            })
        }
        
        catch(err) {
            serviceErrorHandler(err);
        }

        return movieGenre;
    }

    public async getAllNonMovieGenre(id: number): Promise<Genre[]> {
        
        const movieGenre: Genre[] = [];

        try{

            await axios.get(`${MovieService.url}movies/${id}/nongenre`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })

            .then(response => {
                if(response.status === 200) {
                    response.data.forEach((res: any) => {
                        movieGenre.push(new Genre(res))
                    })
                }
            })
        }
        
        catch(err) {
            serviceErrorHandler(err);
        }

        return movieGenre;
    }

    public async postMovieGenre(payload: any): Promise<any> {

        let res;

        try {
            await axios.post(`${MovieService.url}movies/genre`,payload,{
                headers: {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async deleteMovieGenre(movieId: number, genreId: number): Promise<any> {
        
        let res;

        try {
            await axios.delete(`${MovieService.url}movies/${movieId}/genre/${genreId}`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async allUserSeen(userId: number): Promise<any> {
        let res;
        
        try {
            await axios.get(`${MovieService.url}users/${userId}/seen`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                if(response.status === 200) {
                    res = response.data;
                }
            })
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async createUserSeen(payload: UserSeen): Promise<any> {
        
        let res;

        try {
            await axios.post(`${MovieService.url}users/seen`,payload,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`,
                    "Content-Type" : "application/json"
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async deleteUserSeen(userId: number, movieId: number): Promise<any> {
        
        let res;

        try {
            await axios.delete(`${MovieService.url}users/${userId}/seen/${movieId}`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`,
                    "Content-Type" : "application/json"
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }
        
        return res;
    }

    public async allUserFavorites(userId: number): Promise<any> {
        let res;

        try {
            await axios.get(`${MovieService.url}users/${userId}/favorites`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`
                }
            })
            .then(response => {
                if(response.status === 200) {
                    res = response.data;
                }
            })
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async createUserFavorites(payload: UserFavorite): Promise<any> {
        
        let res;

        try {
            await axios.post(`${MovieService.url}users/favorites`,payload,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`,
                    "Content-Type" : "application/json"
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async deleteUserFavorites(userId: number, movieId: number): Promise<any> {
        
        let res;

        try {
            await axios.delete(`${MovieService.url}users/${userId}/favorites/${movieId}`,{
                headers: {
                    'Authorization': `Bearer ${MovieService.token}`,
                    "Content-Type" : "application/json"
                }
            })
            .then(response => {
                res = response;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }
}

export default new MovieService();