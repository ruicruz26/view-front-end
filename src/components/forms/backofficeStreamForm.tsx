import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Stream from "../../models/stream";
import StreamService from "../../services/Stream";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useFlashbag } from "../../context/contexts";

const BackofficeStreamForm: React.FC = () => {

    const { id } = useParams<{ id: string}>();

    const [streams , setStreams] = useState<Stream[]>([]);

    const { setFlashbag } = useFlashbag();

    useEffect(() => {
        StreamService.getAllStreamsByMovie(Number(id))
        .then(streams => {
            setStreams(streams);
        })
    },[id,streams.length])

    function openFileWindow() {

        let streamType:HTMLInputElement = document.querySelector("#stream_type")!;

        if(streamType.value === "") {
            alert("Please choose an resolution.");
        } else {
            let file:HTMLInputElement = document.querySelector("#file")!;

            file.click();
        }
    }

    function addStreams(e: any) {

        let streamType:HTMLInputElement = document.querySelector("#stream_type")!;

        const stream = new FormData();

        stream.append('movies_id', id);
        stream.append('stream_type', streamType.value);
        stream.append('file', e.target.files[0]);

        StreamService.postStream(stream)
            .then(res => {
                    if(res !== undefined) {
                        streams.push({
                            "id_stream": res.response,
                            "movies_id": Number(id),
                            "file_location": "",
                            "stream_type": streamType.value
                        })
    
                        setStreams([...streams]);
                        setFlashbag({"flashbagBody": "Added successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                    } else {
                        setFlashbag({"flashbagBody": "Couldn't add stream to movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                    }
        })
    }

    function removeStreams(id: number) {
        
        StreamService.deleteStream(id)
            .then(res => {
                if(res !== undefined) {
                    let newStreams = streams.filter(stream => stream.id_stream !== id);
                    setStreams(newStreams);
                    setFlashbag({"flashbagBody": "Deleted successfully!" ,"flashbagHeader": "Success!" ,"flashbagStatus" : "success"});
                } else {
                    setFlashbag({"flashbagBody": "Couldn't delete stream from movie." ,"flashbagHeader": "Warning" ,"flashbagStatus" : "error"});
                }
            })
    }

    return (
        <>
            <div className="listControls">
                <Link className="listControlBack" to="/backoffice/movies">Go Back</Link>
                <div className={`dropdownPrimary`}>
                    <select name="stream_type" id="stream_type">
                        <option value="">Choose an option...</option>
                        <option value="HD">HD</option>
                        <option value="FHD">FHD</option>
                        <option value="4K">4K</option>
                    </select>
                </div>
                <button className="button" onClick={openFileWindow}>Add Stream</button>
                <input className="hidden" type="file" name="file" id="file" onChange={addStreams} accept="video/mp4,video/mp3" />
            </div>
            <ul className="streamsList">
                {streams.map((stream, key) => (
                    <li key={key}>
                        <video controls>
                            <source src={`${process.env.REACT_APP_API_URL}/api/streaming/${stream.file_location}`} type=""/>
                            <p>Your browser does not support the native video player.</p>
                        </video>
                        <div>
                            <p>This is the {stream.stream_type} resolution.</p>
                            <i className="fas fa-trash" onClick={() => removeStreams(stream.id_stream!)}></i>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BackofficeStreamForm;