
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Recipe = () => {
    let { recipeID } = useParams();
    
    const fetchRecipeByID = async() => {
        try{
            const response = await fetch('/api/searchOneRecipeByID/?id='+recipeID);
            if (!response.ok){
                throw new Error("Status code error :" + response.status);
            }
            else{
                const data = await response.json();
            }
        }catch(err){
            console.log(err)
        }
    }

    return( 
        <div>
            <h2>{recipeID}</h2>
        </div>    
        )   

}

export default Recipe