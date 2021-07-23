import React, {useState, useEffect} from "react";
import CastWithRole from "../../models/castWithRole";
import CastService from "../../services/Cast";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeCast: React.FC = () => {
    
    const [cast, setCast] = useState<CastWithRole[]>([]);

    const { setFlashbag } = useFlashbag();
    
    const history = useHistory();

    useEffect(() => {
        CastService.getAllCast()
        .then(cast => {
            setCast(cast)
        })
    },[]);

    function deleteCastOnClick(e: any, id: number) {
        
        e.preventDefault();

        CastService.deleteCast(id)
            .then(res => {                
                if(res !== undefined) {
                    let newCast = cast.filter(cast => cast.id_cast !== id);
                    setCast(newCast);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                } else {
                    setFlashbag({"flashbagBody": "Can't delete this cast member as it is associated with a movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
    }

    return (
        <>
            <div className="listControls">
                <button className="button" onClick={() => history.push('/backoffice/cast/null')}>Create New Cast</button>
            </div>
            <div className="listHeader">
                <p>Name</p>
                <p>Role</p>
                <p></p>
            </div>
            <ul className="listBody">
                {cast.map((cast, key) => (
                    
                    <li key={key}>
                        <Link to={`/backoffice/cast/${cast.id_cast}`}>
                            <p>{cast.name}</p>
                            <p>{cast.role_name}</p>
                            <p><i className="fas fa-trash" onClick={(e) => deleteCastOnClick(e, cast.id_cast!)}></i></p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeCast;