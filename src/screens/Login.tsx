import React from 'react';
import Header from '../components/header/Header';
import LoginForm from '../components/forms/LoginForm';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

const Login: React.FC = () => {
    
    let userId = localStorage.getItem("userId");
    
    const history = useHistory();

    if(userId !== null) {
        history.push("/mainscreen");
    }

    return (
        <>
            <Header hideHeader></Header>
            <LoginForm></LoginForm>
            <Footer>
                <Link to="/register">Want to Sign Up?</Link>
            </Footer>
        </>
    )
}

export default Login;