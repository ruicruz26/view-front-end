import React from "react";
import './Footer.css';

interface FooterProps {
    children?: any;
}

const Footer: React.FC<FooterProps> = ({children}) => {

    return (
        <>
        <footer>
            {children}
        </footer>
        </>
    )
}

export default Footer;