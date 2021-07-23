import React from 'react';
import './Header.css';
import { useUser } from '../../context/contexts';
import { useHistory } from "react-router";
import { removeFromLocale } from '../../utilities/utilities';
import {Link} from 'react-router-dom'; 
import Flashbag from "./Flashbag";

interface HeaderProps {
  hideHeader?: boolean;
}

const Header: React.FC<HeaderProps> = ({hideHeader}) => {

  const {user} = useUser();

  const history = useHistory();

  function signOut(): void {
    
    removeFromLocale("token");
    removeFromLocale("userId");
    history.push("/");
  }

  function navClick(): void {
    
    let navButton: HTMLElement | null = document.querySelector("nav > i");

    if(navButton) {
      navButton.classList.toggle("open");
    }
  }

  return (
    <>
      <header>
      <Flashbag></Flashbag>
        <div>
          <div className="logo">
            <span>
            <Link to="/mainscreen">View</Link>
            </span>
          </div>
          {hideHeader ? 
            ""
          :
          <>
            <p>
              Hello, {user.name}
            </p>
            <nav>
              <i className="fas fa-bars" onClick={navClick}></i>
              <ul>
                <i className="fas fa-times" onClick={navClick}></i>
                {user.user_role === "Master" ? 
                  <Link to="/backoffice/users">Backoffice</Link> :
                ""}
                <Link to="/personal">Personal Area</Link>
                <button className="button primary" onClick={signOut}>Sign Out</button>
              </ul>
            </nav>
            </>
          }  
        </div>
      </header>
    </>
  )

}

export default Header;