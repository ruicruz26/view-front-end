import React from 'react';
import './Generics.css'

interface ButtonProps {
    buttonClass? : string;
    children? : string;
}

const Button: React.FC<ButtonProps> = ({buttonClass, children}) => {

    return (
        <>
            <button className={`button ${buttonClass}`}>{children}</button>
        </>
    )
}

export default Button;