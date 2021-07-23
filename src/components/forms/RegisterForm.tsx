import React, { FormEvent } from "react";
import Button from '../generics/Button';
import './Forms.css';
import { register } from "../../services/Auth";
import {formPayload} from "../../utilities/utilities";
import { useUser } from '../../context/contexts';
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";
import { useToken } from "../../context/contexts";

const RegisterForm: React.FC = () => {    

    const {setUser} = useUser();

    const {setToken} = useToken();

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    async function submitRegisterForm(e: FormEvent) {
        e.preventDefault();

        const payload = formPayload(e.target);

        try {
            await register(payload)
                .then(response => {
                    if(response !== undefined) {
                        setUser(response.user);
                        setToken(response.token);

                        localStorage.setItem("token",response.token)
                        localStorage.setItem("userId",response.user.id_users);
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't register, please contact company for more information." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }
                })
                .then(() => {
                    history.push("/mainscreen");
                })
        }
        
        catch(err) {
            alert(`Erro ${err}`);
        }
    }

    return(
        <>
            <div className="loginContainer">
                <form className="loginForm" onSubmit={submitRegisterForm}>
                <div className={`inputBox primary`}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="name" id="name" className="input" autoComplete="off" required></input>
                </div>
                <div className={`inputBox primary`}>
                    <label htmlFor="username">Username *</label>
                    <input type="text" name="username" id="username" className="input" autoComplete="off" required></input>
                </div>
                <div className={`inputBox primary`}>
                    <label htmlFor="password">Password *</label>
                    <input type="text" name="password" id="password" className="input" autoComplete="off" required></input>
                </div>
                <div className={`inputBox primary`}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="input" autoComplete="off"></input>
                </div>
                <div className={`inputBox primary`}>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" className="input" autoComplete="off"></input>
                </div>
                <Button buttonClass="primary">Register</Button>
                </form>
            </div>
        </>
    )
}

export default RegisterForm;