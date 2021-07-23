import React , { useState , useEffect, FormEvent } from "react";
import Cast from "../../models/cast";
import Role from "../../models/role";
import CastService from "../../services/Cast"
import RoleService from "../../services/Role";
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeCastForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [cast, setCast] = useState<Cast>(new Cast());
    
    const [roles, setRoles] = useState<Role[]>();

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        if(id !== "null") {
            CastService.getCast(Number(id))
            .then(resCast => {
                setCast(resCast)
            })
        }
        
        RoleService.getAllRoles()
            .then(roles => {
                setRoles(roles)
            })
    }, [id]);

    function handleOnChange(e: any) {
        
        if(e.target.parentElement.classList.contains("dropdownPrimary")) {
            e.target.parentElement.classList.toggle("opened");
        }

        setCast({...cast, [e.target.name] : e.target.value});
    }

    function submitForm(e: FormEvent) {

        e.preventDefault();

        try {
            CastService.postCast(cast)
            .then(res => {
                if(res !== undefined) {
                    setFlashbag({"flashbagBody": `${cast.id_cast ? "Updated" : "Created"} successfully!` ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    history.push("/backoffice/cast");
                } else {
                    setFlashbag({"flashbagBody": "Couldn't create cast member." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })

        } catch(err) {
            alert(err)
        }
    }


    return (
        <>
        <form onSubmit={submitForm}>
                <div className={`inputBox secondary`}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="name" id="name" className="input" autoComplete="off" value={cast?.name ? cast?.name : ""} placeholder="Name..." onChange={handleOnChange} required></input>
                </div>
                <div className={`dropdownPrimary`}>
                    <label htmlFor="roles_id">Role *</label>
                    <select name="roles_id" id="roles_id" onClick={handleOnChange} defaultValue="" required>
                        <option value="" disabled>Choose an option...</option>
                        {roles?.map((role, key) => (                            
                            <option key={key} selected={cast.roles_id === role.id_roles} value={role.id_roles}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className="formFooter">
                    <Link to="/backoffice/cast">Go Back</Link>
                    <button className="button">{cast.id_cast ? "Edit Cast" : "Create New Cast"}</button>
                </div>
                </form>
        </>
    )
}

export default BackofficeCastForm;