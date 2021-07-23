import React , { useState , useEffect, FormEvent } from "react";
import Genre from "../../models/genre";
import GenreService from "../../services/Genre"
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import { useFlashbag } from "../../context/contexts";

const BackofficeGenreForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [genre, setGenre] = useState<Genre>(new Genre());

    const { setFlashbag } = useFlashbag();

    const history = useHistory();

    useEffect(() => {
        if(id !== "null") {
            GenreService.getGenre(Number(id))
            .then(genre => {
                setGenre(genre)
            })
        }
    }, [id]);

    function handleOnChange(e: any) {
        
        setGenre({...genre, [e.target.name] : e.target.value});
    }

    function submitForm(e: FormEvent) {

        e.preventDefault();

        try {
            GenreService.postGenre(genre)
            .then(res => {
                if(res !== undefined) {
                    setFlashbag({"flashbagBody": `${genre.id_genre ? "Updated" : "Created"} successfully!` ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    history.push("/backoffice/genre");
                } else {
                    setFlashbag({"flashbagBody": "Couldn't create genre." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
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
                    <input type="text" name="name" id="name" className="input" autoComplete="off" value={genre?.name ? genre?.name : ""} placeholder="Name..." onChange={handleOnChange} required></input>
                </div>
                <div className="formFooter">
                    <Link to="/backoffice/genre">Go Back</Link>
                    <button className="button">{genre.id_genre ? "Edit Genre" : "Create New Genre"}</button>
                </div>
                </form>
        </>
    )
}

export default BackofficeGenreForm;