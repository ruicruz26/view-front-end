import React, {useState, useEffect} from "react";
import Role from "../../models/role";
import RoleService from "../../services/Role";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeRole: React.FC = () => {
    
    const [roles, setRoles] = useState<Role[]>([]);

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        RoleService.getAllRoles()
        .then(role => {
            setRoles(role)
        })
    },[]);

    function deleteRoleOnClick(e: any, id: number) {
        
        e.preventDefault();

        RoleService.deleteRole(id)
            .then(res => {
                if(res !== undefined) {
                    let newRoles = roles.filter(role => role.id_roles !== id);
                    setRoles(newRoles);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                } else {
                    setFlashbag({"flashbagBody": "Can't delete this role as it is associated with a cast member." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
    }

    return (
        <>
            <div className="listControls">
                <button className="button" onClick={() => history.push('/backoffice/roles/null')}>Create New Role</button>
            </div>
            <div className="listHeader">
                <p>Name</p>
                <p></p>
            </div>
            <ul className="listBody">
                {roles.map((role, key) => (
                    
                    <li key={key}>
                        <Link to={`/backoffice/roles/${role.id_roles}`}>
                            <p>{role.name}</p>
                            <p><i className="fas fa-trash" onClick={(e) => deleteRoleOnClick(e, role.id_roles!)}></i></p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeRole;