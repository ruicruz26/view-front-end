import React , { useEffect , useCallback } from "react";
import { useFlashbag } from "../../context/contexts";

const Flashbag: React.FC = () => {
    
    const { flashbag , setFlashbag } = useFlashbag();

    const deleteFlashbag = useCallback(() => {
        setFlashbag({"flashbagHeader": undefined,"flashbagBody": undefined,"flashbagStatus": undefined})
    }, [setFlashbag])

    useEffect(() => {
        if(flashbag.flashbagStatus !== undefined) {
            setTimeout(() => {deleteFlashbag()},3000);
        }
    },[flashbag.flashbagStatus,deleteFlashbag])

    return (
        <>
        {flashbag.flashbagStatus !== undefined ? 
        <div className={`flashbag ${flashbag.flashbagStatus}`} onClick={deleteFlashbag}>
            <p className="flashBagHeader">{flashbag.flashbagHeader}</p>
            <p className="flashBagBody">{flashbag.flashbagBody}</p>
        </div>
        :
        ""}
        </>
    )
}

export default Flashbag