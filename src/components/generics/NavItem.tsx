import React from 'react';

interface NavItemProps {
    children? : any;
    link?: string;
}

const NavItem: React.FC<NavItemProps> = ({children, link}) => {

    return (
        <>
            <li><a href={link}>{children}</a></li>
        </>
    )
}

export default NavItem;