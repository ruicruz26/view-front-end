import axios from 'axios';
import User from '../models/user';
import UserFavorite from '../models/userFavorite';
import UserSeen from '../models/userSeen';
import { serviceErrorHandler } from '../utilities/utilities';

class UsersService {

    static url: string;
    static token: string;

    constructor() {
        UsersService.url = `${process.env.REACT_APP_API_URL}/api/`;
        UsersService.token = localStorage.getItem("token")!;
    }

    /* BASIC USER CRUD */

    public async getAllUsers(): Promise<User[]> {

        const users: User[] = [];

        try{
            const response = await axios.get(`${UsersService.url}users`, {
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
                }
            })

            response.data.forEach((res: any) => {
                users.push(new User(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return users;
    }

    public async getUser(id: number): Promise<User> {

        let user: User = new User();

        try{
            const response = await axios.get(`${UsersService.url}users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
                }
            })
            
            user = response.data;
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return user;
    }

    public async postUser(payload: User): Promise<any> {

        let res;

        try {
            await axios.post(`${UsersService.url}users`,payload,{
                "headers" : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${UsersService.token}`
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

    public async deleteUser(id: number): Promise<void> {

        let res;

        try {
            await axios.delete(`${UsersService.url}users/${id}`,{
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
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

    /* USER FAVORITE */

    public async getAllUserFavorites(id: number): Promise<UserFavorite[]> {
        
        const userFavorites: UserFavorite[] = [];

        try{

            await axios.get(`${UsersService.url}users/${id}/favorites`,{
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
                }
            })

            .then(response => {
                if(response.status === 200) {
                    response.data.forEach((res: any) => {
                        userFavorites.push(new UserFavorite(res))
                    })
                }
            })
        }
        
        catch(err) {
            serviceErrorHandler(err);
        }

        return userFavorites;
    }

    public async postUserFavorite(payload: any): Promise<void> {

        let res;

        try {
            await axios.post(`${UsersService.url}users/favorites`,payload,{
                headers: {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${UsersService.token}`
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

    public async deleteUserFavorite(userId: number, moviesId: number): Promise<void> {

        let res;

        try {
            await axios.delete(`${UsersService.url}users/${userId}/favorites/${moviesId}`,{
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
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

    /* USER SEEN */

    public async getAllUserSeen(id: number): Promise<UserSeen[]> {
        
        const userSeen: UserSeen[] = [];

        try{

            await axios.get(`${UsersService.url}users/${id}/seen`,{
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
                }
            })

            .then(response => {
                if(response.status === 200) {
                    response.data.forEach((res: any) => {
                        userSeen.push(new UserSeen(res))
                    })
                }
            })
        }
        
        catch(err) {
            serviceErrorHandler(err);
        }

        return userSeen;
    }

    public async postUserSeen(payload: any): Promise<void> {

        let res;

        try {
            await axios.post(`${UsersService.url}users/seen`,payload,{
                headers: {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${UsersService.token}`
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

    public async deleteUserSeen(userId: number, moviesId: number): Promise<void> {
            
        let res;

        try {
            await axios.delete(`${UsersService.url}users/${userId}/seen/${moviesId}`,{
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
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

    public async postUserPhoto(payload: any): Promise<void> {
        
        let res;

        try {
            await axios.post(`${UsersService.url}usersPhoto`,payload ,{
                headers: {
                    'Authorization': `Bearer ${UsersService.token}`
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

export default new UsersService();