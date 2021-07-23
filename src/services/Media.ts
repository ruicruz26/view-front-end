import axios from 'axios';
import Media from '../models/media';
import { serviceErrorHandler } from '../utilities/utilities';

class MediaService {

    static url: string;
    static token: string;

    constructor() {
        
        MediaService.url = `${process.env.REACT_APP_API_URL}/api/`;
        MediaService.token = localStorage.getItem("token")!;
    }

    /* BASIC CAST CRUD */

    public async getAllMediaByMovie(id: number): Promise<Media[]> {

        const media: Media[] = [];

        try{
            const response = await axios.get(`${MediaService.url}media/${id}`, {
                headers: {
                    'Authorization': `Bearer ${MediaService.token}`
                }
            })

            response.data.forEach((res: any) => {
                media.push(new Media(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return media;
    }

    public async postMedia(payload: any): Promise<any> {

        let res;
        
        try {
            await axios.post(`${MediaService.url}media`,payload,{
                "headers" : {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : `Bearer ${MediaService.token}`
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

    public async deleteMedia(id: number): Promise<any> {
        
        let res;

        try {
            await axios.delete(`${MediaService.url}media/${id}`,{
                headers: {
                    'Authorization': `Bearer ${MediaService.token}`
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

export default new MediaService();