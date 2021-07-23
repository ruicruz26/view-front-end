import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Media from "../../models/media";
import MediaService from "../../services/Media";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useFlashbag } from "../../context/contexts";

const BackofficeMediaForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [movieMedia , setMovieMedia] = useState<Media[]>([]);

    const { setFlashbag } = useFlashbag();

    useEffect(() => {
        MediaService.getAllMediaByMovie(Number(id))
        .then(media => {
            setMovieMedia(media);
        })
    },[id,movieMedia.length])

    function openFileWindow() {

        let file:HTMLInputElement = document.querySelector("#file")!;

        file.click();
    }

    function addMediaToMovie(e: any) {

        const media = new FormData();
        
        media.append('movies_id', id);
        media.append('file', e.target.files[0]);

        MediaService.postMedia(media)
            .then(res => {
                    if(res !== undefined) {
                        movieMedia.push({
                            "id_media": res,
                            "movies_id": Number(id),
                            "file_location": ""
                        })
    
                        setMovieMedia([...movieMedia]);
                        setFlashbag({"flashbagBody": "Added successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't add media to movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }
        })
    }

    function removeMediaFromMovie(id: number) {
        
        MediaService.deleteMedia(id)
            .then(res => {                
                if(res !== undefined) {
                    let newMovieMedia = movieMedia.filter(media => media.id_media !== id);
                    setMovieMedia(newMovieMedia);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                } else {
                    setFlashbag({"flashbagBody": "Couldn't delete media from movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
    }
    
    function open(e: any) {
        e.target.parentElement.classList.toggle("whiteBox");

    }

    return (
        <>
            <div className="listControls">
                <Link className="listControlBack" to="/backoffice/movies">Go Back</Link>
                <button className="button" onClick={openFileWindow}>Add Media</button>
                <input className="hidden" type="file" name="file" id="file" onChange={addMediaToMovie} accept="image/*" />
            </div>
            <ul className="imageList">
                {movieMedia.map((media, key) => (
                    <li key={key}>
                        <img src={`${process.env.REACT_APP_API_URL}/media/images/${media.file_location}`} alt="Alternate text for movie media" />
                        <i className="fas fa-trash" onClick={() => removeMediaFromMovie(media.id_media!)}></i>
                        <i className="fas fa-hand-point-up" onClick={open}></i>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeMediaForm;