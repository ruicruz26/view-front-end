import React, { FormEvent } from "react";
import './Forms.css';
import { resetPassword } from "../../services/Auth";
import { formPayload } from "../../utilities/utilities";
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";
import { useParams } from "react-router";

const ResetPasswordForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    async function submitLoginForm(e: FormEvent) {
        
        e.preventDefault();

        const payload = formPayload(e.target);

        try {
            await resetPassword(payload)
                .then(res => {
                    if(res !== undefined) {
                        setFlashbag({"flashbagBody": "Password Reset!" ,"flashbagHeader": "Sucess" ,"flashbagStatus" : "success"});
                        navigateToLogin();
                    } else {
                        setFlashbag({"flashbagBody": "Something went wrong please try again." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
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
                <h2>Fill in your new password!</h2>
                <form className="loginForm" onSubmit={submitLoginForm}>
                    <input hidden type="text" name="id_users" id="id_users" value={id} readOnly/>
                    <div className="inputBox primary">
                        <label htmlFor="password">New Password</label>
                        <input type="text" name="password" id="password" autoComplete="off" minLength={4} required/>
                    </div>
                    <button className={`button primary`}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default ResetPasswordForm;