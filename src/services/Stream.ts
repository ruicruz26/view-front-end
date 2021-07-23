import axios from 'axios';
import Stream from '../models/stream';
import { serviceErrorHandler } from '../utilities/utilities';

class StreamService {

    static url: string;
    static token: string;

    constructor() {
        StreamService.url = `${process.env.REACT_APP_API_URL}/api/`;
        StreamService.token = localStorage.getItem("token")!;
    }

    /* BASIC CAST CRUD */

    public async getAllStreamsByMovie(id: number): Promise<Stream[]> {

        const streams: Stream[] = [];

        try{
            const response = await axios.get(`${StreamService.url}streams/${id}`, {
                headers: {
                    'Authorization': `Bearer ${StreamService.token}`
                }
            })

            response.data.forEach((res: any) => {
                streams.push(new Stream(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return streams;
    }

    public async postStream(payload: any): Promise<any> {

        let res;

        try {
            await axios.post(`${StreamService.url}streams`,payload,{
                "headers" : {
                    "Content-Type" : "multipart/data",
                    "Authorization" : `Bearer ${StreamService.token}`
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

    public async deleteStream(id: number): Promise<any> {

        let res;

        try {
            await axios.delete(`${StreamService.url}streams/${id}`,{
                headers: {
                    'Authorization': `Bearer ${StreamService.token}`
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

    public async streamMovie(id: number):Promise<any> {
        
        let res;

        try {
            await axios.get(`${StreamService.url}streamMovie/${id}`,{
                headers: {
                    'Authorization': `Bearer ${StreamService.token}`
                }
            })
            .then(response => {
                if(response.status === 200) {
                    res = response;
                }
            })
        }

        catch (err) {
            serviceErrorHandler(err);
        }

        return res;
    }
}

export default new StreamService();