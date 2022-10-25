import React from "react"
import {BrowserRouter as Router, useNavigate} from 'react-router-dom';


const Image = ({style, image_src, id}) =>{
    const navigate = useNavigate();

    const getRecipe = () => {
        navigate("/" )
    }

    // const getRecipe = () => {
        
    //     fetch("/api/searchRecipe/?" + new URLSearchParams({
    //         ingredients: id
    //     }))
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data), 
    //         navigate(
    //         "/api/searchRecipe/" + id)});
    // }

    return (
        <div>
            <img style={style} 
                src={image_src} onClick={getRecipe} />
        </div>
    )


}

export default Image