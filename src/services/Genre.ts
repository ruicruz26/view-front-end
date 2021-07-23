import axios from 'axios';
import Genre from '../models/genre';
import { serviceErrorHandler } from '../utilities/utilities';

class GenreService {

    static url: string;
    static token: string;

    constructor() {
        
        GenreService.url = `${process.env.REACT_APP_API_URL}/api/`;
        GenreService.token = localStorage.getItem("token")!;
    }

    /* BASIC GENRE CRUD */

    public async getAllGenres(): Promise<Genre[]> {

        const genre: Genre[] = [];

        try{
            const response = await axios.get(`${GenreService.url}genres`, {
                headers: {
                    'Authorization': `Bearer ${GenreService.token}`
                }
            })

            response.data.forEach((res: any) => {
                genre.push(new Genre(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return genre;
    }

    public async getGenre(id: number): Promise<Genre> {

        let genre: Genre = new Genre();

        try{
            const response = await axios.get(`${GenreService.url}genres/${id}`, {
                headers: {
                    'Authorization': `Bearer ${GenreService.token}`
                }
            })

            genre = response.data;
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return genre;
    }

    public async postGenre(payload: Genre): Promise<any> {

        let res;

        try {
            await axios.post(`${GenreService.url}genres`,payload,{
                "headers" : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${GenreService.token}`
                }
            })
            .then(response => {
                res = response;
            })
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return res;
    }

    public async deleteGenre(id: number): Promise<any> {
        
        let res;

        try {
            await axios.delete(`${GenreService.url}genres/${id}`,{
                headers: {
                    'Authorization': `Bearer ${GenreService.token}`
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

export default new GenreService();