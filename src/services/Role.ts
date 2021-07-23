import axios from 'axios';
import Role from '../models/role';
import { serviceErrorHandler } from '../utilities/utilities';

class RoleService {

    static url: string;
    static token: string;

    constructor() {
        RoleService.url = `${process.env.REACT_APP_API_URL}/api/`;
        RoleService.token = localStorage.getItem("token")!;
    }

    /* BASIC CAST CRUD */

    public async getAllRoles(): Promise<Role[]> {

        const roles: Role[] = [];

        try{
            const response = await axios.get(`${RoleService.url}roles`, {
                headers: {
                    'Authorization': `Bearer ${RoleService.token}`
                }
            })

            response.data.forEach((res: any) => {
                roles.push(new Role(res))
            })        
        }
        catch(err) {
            serviceErrorHandler(err);
        }

        return roles;
    }

    public async getRole(id: number): Promise<Role> {

        let role: Role = new Role();

        try{
            const response = await axios.get(`${RoleService.url}roles/${id}`, {
                headers: {
                    'Authorization': `Bearer ${RoleService.token}`
                }
            })

            role = response.data;
        }

        catch(err) {
            serviceErrorHandler(err);
        }

        return role;
    }

    public async postRole(payload: Role): Promise<any> {

        let res;

        try {
            await axios.post(`${RoleService.url}roles`,payload,{
                "headers" : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${RoleService.token}`
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

    public async deleteRole(id: number): Promise<any> {

        let res;

        try {
            await axios.delete(`${RoleService.url}roles/${id}`,{
                headers: {
                    'Authorization': `Bearer ${RoleService.token}`
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

export default new RoleService();