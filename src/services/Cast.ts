import axios from 'axios';
import Cast from '../models/cast';
import CastWithRole from '../models/castWithRole';
import { serviceErrorHandler } from '../utilities/utilities';

class CastService {

    static url: string;
    static token: string;

    constructor() {
        CastService.url = `${process.env.REACT_APP_API_URL}/api/`;
        CastService.token = localStorage.getItem("token")!;
    }

    /* BASIC CAST CRUD */

    public async getAllCast(): Promise<CastWithRole[]> {

        const cast: CastWithRole[] = [];

        try{
            const response = await axios.get(`${CastService.url}cast`, {
                headers: {
                    'Authorization': `Bearer ${CastService.token}`
                }
            })

            response.data.forEach((res: any) => {
                cast.push(new CastWithRole(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return cast;
    }

    public async getCast(id: number): Promise<Cast> {

        let cast: Cast = new Cast();

        try{
            const response = await axios.get(`${CastService.url}cast/${id}`, {
                headers: {
                    'Authorization': `Bearer ${CastService.token}`
                }
            })

            cast = response.data;
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return cast;
    }

    public async postCast(payload: Cast): Promise<any> {

        let res;

        try {
            await axios.post(`${CastService.url}cast`,payload,{
                "headers" : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${CastService.token}`
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

    public async deleteCast(id: number): Promise<any> {
        
        let res;

        try {
            await axios.delete(`${CastService.url}cast/${id}`,{
                headers: {
                    'Authorization': `Bearer ${CastService.token}`
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

export default new CastService();