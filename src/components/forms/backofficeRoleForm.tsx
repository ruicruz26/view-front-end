import React , { useState , useEffect, FormEvent } from "react";
import Role from "../../models/role";
import RoleService from "../../services/Role"
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeRoleForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [role, setRole] = useState<Role>(new Role());

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        if(id !== "null") {
            RoleService.getRole(Number(id))
            .then(role => {
                setRole(role)
            })
        }
    }, [id]);

    function handleOnChange(e: any) {
        
        setRole({...role, [e.target.name] : e.target.value});
    }

    function submitForm(e: FormEvent) {

        e.preventDefault();

        try {
            RoleService.postRole(role)
            .then(res => {
                if(res !== undefined) {
                    setFlashbag({"flashbagBody": `${role.id_roles ? "Updated" : "Created"} successfully!` ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    history.push("/backoffice/roles");
                } else {
                    setFlashbag({"flashbagBody": "Couldn't create role." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })

        } catch(err) {
            alert(err);
        }
    }

    return (
        <>
        <form onSubmit={submitForm}>
                <div className={`inputBox secondary`}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="name" id="name" className="input" autoComplete="off" value={role?.name ? role?.name : ""} placeholder="Name..." onChange={handleOnChange} required></input>
                </div>
                <div className="formFooter">
                    <Link to="/backoffice/roles">Go Back</Link>
                    <button className="button">{role.id_roles ? "Edit Role" : "Create New Role"}</button>
                </div>
                </form>
        </>
    )
}

export default BackofficeRoleForm;