import React from "react"
import {useNavigate} from 'react-router-dom';


const Image = ({image_src, id, style}) =>{
    const navigate = useNavigate();

    const getRecipe = () => {
        navigate("/recipes/" + id )
    }


    return (
        <div>
            <img  
                src={image_src}  onClick={getRecipe} className={style}/>
        </div>
    )


}

export default Image