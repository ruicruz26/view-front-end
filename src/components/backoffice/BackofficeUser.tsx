import React, {useState, useEffect} from "react";
import User from "../../models/user";
import UsersService from "../../services/Users";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";
import { useUser } from "../../context/contexts";

const BackofficeUser: React.FC = () => {
    
    const [users, setUsers] = useState<User[]>([]);

    const { user } = useUser();

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        UsersService.getAllUsers()
        .then(user => {
            setUsers(user)
        })
    },[]);

    function deleteUserOnClick(e: any, id: number) {
        
        e.preventDefault();

        UsersService.deleteUser(id)
            .then(res => {
                if(id === user.id_users) {
                    setFlashbag({"flashbagBody": "Can't delete yourself." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    
                } else if(res !== undefined)  {
                    setFlashbag({"flashbagBody": "Can't delete this user." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                } else {
                    let newUsers = users.filter(user => user.id_users !== id);
                    setUsers(newUsers);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                }
            })
    }

    return (
        <>
            <div className="listControls">
                <button className="button" onClick={() => history.push('/backoffice/users/null')}>Create New User</button>
            </div>
            <div className="listHeader">
                <p>Name</p>
                <p>Username</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Role</p>
                <p></p>
            </div>
            <ul className="listBody">
                {users.map((user, key) => (
                    
                    <li key={key}>
                        <Link to={`/backoffice/users/${user.id_users}`}>
                            <p>{user.name}</p>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <p>{user.user_role}</p>
                            <p><i className="fas fa-trash" onClick={(e) => deleteUserOnClick(e, user.id_users!)}></i></p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeUser;