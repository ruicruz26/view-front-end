import React, { FormEvent } from "react";
import Input from '../generics/Input';
import './Forms.css';
import { login } from "../../services/Auth";
import { formPayload } from "../../utilities/utilities";
import { useUser } from '../../context/contexts';
import { useHistory } from "react-router";
import { useToken } from "../../context/contexts";
import { useFlashbag } from "../../context/contexts";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {

    const {setUser} = useUser();
    
    const {setToken} = useToken();

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    async function submitLoginForm(e: FormEvent) {
        
        e.preventDefault();

        const payload = formPayload(e.target);

        try {
            await login(payload)
                .then(res => {
                    if(res !== undefined) {
                        localStorage.setItem("token",res.token)
                        localStorage.setItem("userId",res.user.id_users);
                        
                        
                        setUser(res.user);
                        setToken(res.token);
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't login, username/password don't match." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }
                })
                .then(() => {
                    navigateToMainscreen();
                })
        }

        catch (err) {
            alert(err);
        }
    }

    function navigateToMainscreen() {
            history.push("/mainscreen");
    }

    function switchVisibility({target}: any) {

        if(target.classList.contains("fa-eye")) {

            let passwordInput: HTMLInputElement | null = document.querySelector("#password");

            if(passwordInput) {
                passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";
            }
        }
    }

    return(
        <>
            <div className="loginContainer" onClick={switchVisibility}>
                <form className="loginForm" onSubmit={submitLoginForm}>
                    <Input inputClass="primary" type="text" name="username" id="username" autocomplete="off" label="Username"/>
                    <Input inputClass="primary" type="password" name="password" id="password" autocomplete="off" label="Password" placeholderIcon="fas fa-eye"/>
                    <button className={`button primary`}>Log In</button>
                    <Link to="/forgotPassword">Forgot your password?</Link>
                </form>
            </div>
        </>
    )
}

export default LoginForm;