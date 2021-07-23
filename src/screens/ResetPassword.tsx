import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { useHistory } from 'react-router';

const ResetPassword: React.FC = () => {

    let userId = localStorage.getItem("userId");
    
    const history = useHistory();

    if(userId !== null) {
        history.push("/mainscreen");
    }

    return (
        <>
            <Header hideHeader></Header>
            <ResetPasswordForm></ResetPasswordForm>
            <Footer>
                <Link to="/">Already Signed Up?</Link>
            </Footer>
        </>
    )
}

export default ResetPassword;