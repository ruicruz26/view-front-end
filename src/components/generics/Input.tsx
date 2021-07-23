import React from 'react';
import './Generics.css'

interface InputProps {
    label? : string;
    type? : string;
    id?: string;
    name? : string;
    inputClass? : string;
    autocomplete? : string;
    placeholderIcon? : string;
}

const Button: React.FC<InputProps> = ({type, name, id, inputClass, autocomplete, label, placeholderIcon}) => {

    return (
        <>
            <div className={`inputBox ${inputClass}`}>
                <label htmlFor={name}>{label}</label>
                <input type={type} name={name} id={id} className="input" autoComplete={autocomplete}></input>
                {placeholderIcon ? <i className={placeholderIcon}></i> : ""}
            </div>
        </>
    )
}

export default Button;