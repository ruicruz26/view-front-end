import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { useHistory } from 'react-router';

const ForgotPassword: React.FC = () => {

    let userId = localStorage.getItem("userId");
    
    const history = useHistory();

    if(userId !== null) {
        history.push("/mainscreen");
    }

    return (
        <>
            <Header hideHeader></Header>
            <ForgotPasswordForm></ForgotPasswordForm>
            <Footer>
                <Link to="/">Already Signed Up?</Link>
            </Footer>
        </>
    )
}

export default ForgotPassword;