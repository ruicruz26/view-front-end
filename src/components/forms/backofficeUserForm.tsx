import React , { useState , useEffect, FormEvent } from "react";
import User from "../../models/user";
import UsersService from "../../services/Users"
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeUserForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [user, setUser] = useState<User>(new User({
        "id_users": undefined,
        "name": "",
        "username": "",
        "password": "",
        "email": "",
        "phone": "",
        "user_role": "",
        "profile_picture": ""
    }));

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        if(id !== "null") {
            UsersService.getUser(Number(id))
            .then(resUser => {
                setUser(resUser)
            })
        }
    }, [id]);

    function handleOnChange(e: any) {
        
        setUser({...user, [e.target.name] : e.target.value});
    }

    function submitForm(e: FormEvent) {
        e.preventDefault();

        try {
            UsersService.postUser(user)
            .then(res => {
                if(res !== undefined) {
                    setFlashbag({"flashbagBody": `${user.id_users ? "Updated" : "Created"} successfully!` ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    history.push("/backoffice/users");
                } else {
                    setFlashbag({"flashbagBody": "Couldn't create user." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
        } catch(err) {
            alert(err);
        }
    }

    return (
        <>
        <form onSubmit={submitForm}>
                <div className={`inputBox secondary`}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="name" id="name" className="input" autoComplete="off" value={user?.name ? user?.name : ""} placeholder="Name..." onChange={handleOnChange} required></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="username">Username *</label>
                    <input type="text" name="username" id="username" className="input" autoComplete="off" value={user?.username ? user?.username : ""} placeholder="Username..." onChange={handleOnChange} required></input>
                </div>
                {user?.id_users === undefined ? 
                    <div className={`inputBox secondary`}>
                        <label htmlFor="password">Password *</label>
                        <input type="text" name="password" id="password" className="input" autoComplete="off" placeholder="Password..." onChange={handleOnChange} required></input>
                    </div>
                : ""}
                <div className={`inputBox secondary`}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="input" autoComplete="off" value={user?.email ? user?.email : ""} placeholder="Email..." onChange={handleOnChange}></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" className="input" autoComplete="off" value={user?.phone ? user?.phone : ""} placeholder="Phone..." onChange={handleOnChange}></input>
                </div>
                <div className={`dropdownPrimary`}>
                    <label htmlFor="user_role">Role *</label>
                    <select name="user_role" id="user_role" onClick={handleOnChange} required>
                        <option>Choose an option...</option>
                        <option selected={user.user_role === "Master"} value="Master">Master</option>
                        <option selected={user.user_role === "Client"} value="Client">Client</option>
                    </select>
                </div>
                <div className="formFooter">
                    <Link to="/backoffice/users">Go Back</Link>
                    <button className="button">{user.id_users ? "Edit User" : "Create New User"}</button>
                </div>
                </form>
        </>
    )
}

export default BackofficeUserForm;