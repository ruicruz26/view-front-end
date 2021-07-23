import React, {useState, useEffect} from "react";
import Genre from "../../models/genre";
import GenreService from "../../services/Genre";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeGenre: React.FC = () => {
    
    const [genre, setGenre] = useState<Genre[]>([]);

    const { setFlashbag } = useFlashbag();
    
    const history = useHistory();

    useEffect(() => {
        GenreService.getAllGenres()
        .then(genre => {
            setGenre(genre)
        })
    },[]);



    function deleteGenreOnClick(e: any, id: number) {
        
        e.preventDefault();

        GenreService.deleteGenre(id)
            .then(res => {
                if(res !== undefined) {
                    let newGenres = genre.filter(genre => genre.id_genre !== id);
                    setGenre(newGenres);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                } else {
                    setFlashbag({"flashbagBody": "Can't delete this genre as it is associated with a movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
    }

    return (
        <>
            <div className="listControls">
                <button className="button" onClick={() => history.push('/backoffice/genre/null')}>Create New Genre</button>
            </div>
            <div className="listHeader">
                <p>Name</p>
                <p></p>
            </div>
            <ul className="listBody">
                {genre.map((genre, key) => (
                    
                    <li key={key}>
                        <Link to={`/backoffice/genre/${genre.id_genre}`}>
                            <p>{genre.name}</p>
                            <p><i className="fas fa-trash" onClick={(e) => deleteGenreOnClick(e, genre.id_genre!)}></i></p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeGenre;