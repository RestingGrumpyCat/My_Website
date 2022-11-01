
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Recipe = () => {
    let { recipeID } = useParams();
    const [recipe, setRecipe] = useState([]);
    
    useEffect( () => {
        const fetchRecipeByID = async() => {
            try{
                const response = await fetch('/api/searchRecipeByID/?id='+recipeID);
                if (!response.ok){
                    throw new Error("Status code error :" + response.status);
                }
                else{
                    let data = await response.json();
                    if (!Array.isArray(data)){
                        data = [data]
                    }
                    console.log(data)
                    setRecipe(data);
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchRecipeByID();
    }, [])
    
    useEffect( () => {
        let requestBody = recipe
        if (!Array.isArray(recipe)){
            requestBody = [recipe]
        }
        
        const requestOption = {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(requestBody),
        };

        const sendRequest = async() =>{
            await fetch('/api/searchRecipeByID/', requestOption);
        };


        sendRequest();

    }, [recipe])

    return( 
        <div>
            {recipe?.map( elem => (
            <li key={elem.id}>
                <img src={elem.image}></img> 
            </li>))}
        </div>   

        )   

}

export default Recipe