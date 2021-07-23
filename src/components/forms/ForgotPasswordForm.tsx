import React, { FormEvent } from "react";
import Input from '../generics/Input';
import './Forms.css';
import { newPassword } from "../../services/Auth";
import { formPayload } from "../../utilities/utilities";
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const ForgotPasswordForm: React.FC = () => {

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    async function submitPasswordForm(e: FormEvent) {
        
        e.preventDefault();

        const payload = formPayload(e.target);

        try {
            await newPassword(payload)
                .then(res => {
                    if(res !== undefined) {
                        setFlashbag({"flashbagBody": "Check your email for the link to set a new password!" ,"flashbagHeader": "Sucess" ,"flashbagStatus" : "success"});
                        navigateToLogin();
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't find this username, please try again." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }
                })
        }

        catch (err) {
            alert(err);
        }
    }

    function navigateToLogin() {
        history.push("/");
    }

    return(
        <>
            <div className="loginContainer">
                <h2>Fill in your username, then check your email for the link to set a new password!</h2>
                <form className="loginForm" onSubmit={submitPasswordForm}>
                    <Input inputClass="primary" type="text" name="username" id="username" autocomplete="off" label="Username"/>
                    <button className={`button primary`}>Send Request for new password</button>
                </form>
            </div>
        </>
    )
}

export default ForgotPasswordForm;