import React from "react";
import { NavLink, Route } from "react-router-dom";
import './Backoffice.css';
import BackofficeUser from "./BackofficeUser";
import BackofficeUserForm from "../forms/backofficeUserForm";
import BackofficeMovie from "./BackofficeMovie";
import BackofficeMovieForm from "../forms/backofficeMovieForm";
import BackofficeCast from "./BackofficeCast";
import BackofficeCastForm from "../forms/backofficeCastForm";
import BackofficeRole from "./BackofficeRole";
import BackofficeRoleForm from "../forms/backofficeRoleForm";
import BackofficeGenre from "./BackofficeGenre";
import BackofficeGenreForm from "../forms/backofficeGenreForm";
import BackofficeMediaForm from "../forms/backofficeMediaForm";
import BackofficeStreamForm from "../forms/backofficeStreamForm";

const BackofficeList: React.FC = () => {

    return (
        <>
        <ul className="backofficeHeader">
            <li>
                <NavLink activeClassName="active" to="/backoffice/users">Users</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/backoffice/movies">Movies</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/backoffice/cast">Cast</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/backoffice/roles">Roles</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/backoffice/genre">Genres</NavLink>
            </li>
        </ul>

        <div className="backofficeBody">
            <Route exact path="/backoffice/users" component={BackofficeUser} />
            <Route exact path="/backoffice/users/:id" component={BackofficeUserForm} />
            <Route exact path="/backoffice/movies" component={BackofficeMovie} />
            <Route exact path="/backoffice/movies/:id" component={BackofficeMovieForm} />
            <Route exact path="/backoffice/cast" component={BackofficeCast} />
            <Route exact path="/backoffice/cast/:id" component={BackofficeCastForm} />
            <Route exact path="/backoffice/roles" component={BackofficeRole} />
            <Route exact path="/backoffice/roles/:id" component={BackofficeRoleForm} />
            <Route exact path="/backoffice/genre" component={BackofficeGenre} />
            <Route exact path="/backoffice/genre/:id" component={BackofficeGenreForm} />
            <Route exact path="/backoffice/movies/:id/media" component={BackofficeMediaForm} />
            <Route exact path="/backoffice/movies/:id/stream" component={BackofficeStreamForm} />
        </div>
        </>
    )
}

export default BackofficeList;