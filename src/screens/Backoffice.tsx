import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import BackofficeList from '../components/backoffice/BackofficeList';

const Backoffice: React.FC = () => {
    
    return (
        <>
            <Header></Header>
            <BackofficeList></BackofficeList>
            <Footer></Footer>
        </>
    )
}

export default Backoffice;