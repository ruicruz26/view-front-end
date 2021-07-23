import axios from 'axios';
import User from '../models/user';
import { serviceErrorHandler } from "../utilities/utilities";

let url = `${process.env.REACT_APP_API_URL}/api/`;

export async function login(payload: User): Promise<any> {

    let res: any;

    if(payload.username  !== "" && payload.password  !== "") {

        try {
            await axios.get(`${url}auth/${payload.username}/${payload.password}`)
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
}

export async function register(payload: User): Promise<any> {

    let res: any;

    if(payload.name  !== "" && payload.username  !== "" && payload.password) {
        try {
            await axios.post(`${url}auth/register`,payload,{
                "headers" : {
                    "Content-Type" : "application/json"
                }
            })
            .then(response => {
                res = response.data;
            })

        } catch (err) {
            serviceErrorHandler(err);
        }
    
        return res;
    }
}

export async function newPassword(payload: any): Promise<any> {

    let res: any;

    try {
        await axios.post(`${url}auth/newPassword`,payload,{
            "headers" : {
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            res = response.data;
        })

    } catch (err) {
        serviceErrorHandler(err);
    }

    return res;
}

export async function resetPassword(payload: any): Promise<any> {

    let res: any;

    try {
        await axios.post(`${url}auth/resetPassword`,payload,{
            "headers" : {
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            res = response.data;
        })

    } catch (err) {
        serviceErrorHandler(err);
    }

    return res;
}