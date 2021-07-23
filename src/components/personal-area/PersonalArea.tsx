import React , { useState } from "react";
import "./PersonalArea.css"
import { useUser } from "../../context/contexts";
import { FormEvent } from "react";
import UsersService from "../../services/Users";
import User from "../../models/user";
import { useEffect } from "react";
import { useFlashbag } from '../../context/contexts';

const PersonalArea: React.FC = () => {

    const {user ,setUser} = useUser();

    const [loggedUser, setLoggedUser] = useState<User>(new User());

    const { setFlashbag } = useFlashbag();

    useEffect(() => {
        if(user.id_users !== undefined) {
            UsersService.getUser(user.id_users)
                .then(res => {
                    setLoggedUser(res)
                })
        }
    },[loggedUser.profile_picture,user.id_users])

    function submitForm(e: FormEvent) {

        e.preventDefault();

        try {
            UsersService.postUser(loggedUser)
            .then(res => {
                if(res !== undefined) {
                    setUser(loggedUser)
                    setFlashbag({"flashbagBody": "User edited with success!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                }
            })
        } catch(err) {
            alert(err);
        }
    }

    function handleOnChange(e: any) {
        
        setLoggedUser({...loggedUser, [e.target.name] : e.target.value});
    }

    function openFileWindow() {

        let file:HTMLInputElement = document.querySelector("#file")!;

        file.click();
    }

    function addMediaToUser(e: any) {
        const media = new FormData();

        media.append('user_id', user.id_users!.toString());
        media.append('file', e.target.files[0]);

        UsersService.postUserPhoto(media)
            .then(res => {
                setLoggedUser(new User(res))
        })
    }

    return (
        <>
            <div className="backofficeBody">
                <div className="userImage">
                    <div className="image">
                        { loggedUser.profile_picture !== "undefined" && loggedUser.profile_picture !== "" ? 
                        <img src={`${process.env.REACT_APP_API_URL}/media/images/profilePictures/${loggedUser.profile_picture}`} alt="" /> : 
                        <i className="fas fa-user"></i> }
                    <button className="button" onClick={openFileWindow}>Add Photo</button>
                    <input className="hidden" type="file" name="file" id="file" onChange={addMediaToUser} accept="image/*" />
                    </div>
                </div>
                <div className="userInfo">
                <form onSubmit={submitForm}>
                <div className={`inputBox secondary`}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="name" id="name" className="input" autoComplete="off" value={loggedUser.name} placeholder="Name..." onChange={handleOnChange} required></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="username">Username *</label>
                    <input type="text" name="username" id="username" className="input" autoComplete="off" value={loggedUser.username} placeholder="Username..." onChange={handleOnChange} required></input>
                </div>
                {user?.id_users === undefined ? 
                    <div className={`inputBox secondary`}>
                        <label htmlFor="password">Password *</label>
                        <input type="text" name="password" id="password" className="input" autoComplete="off" placeholder="Password..." onChange={handleOnChange} required></input>
                    </div>
                : ""}
                <div className={`inputBox secondary`}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="input" autoComplete="off" value={loggedUser.email} placeholder="Email..." onChange={handleOnChange}></input>
                </div>
                <div className={`inputBox secondary`}>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" className="input" autoComplete="off" value={loggedUser.phone} placeholder="Phone..." onChange={handleOnChange}></input>
                </div>
                <div className="formFooter">
                    <button className="button">{user.id_users ? "Edit User" : "Create New User"}</button>
                </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default PersonalArea;