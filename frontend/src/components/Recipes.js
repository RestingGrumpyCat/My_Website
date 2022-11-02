import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const YellowTypography = withStyles({
    root: {
      color: "#ffc108",
      fontFamily: 'Fuzzy Bubbles'
    }
  })(Typography);

const BlackTypography = withStyles({
root: {
    color: "black",
    fontFamily: 'Fuzzy Bubbles'
}
})(Typography);

const Recipes = () => {
    let { ingredient } = useParams();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [safeToRender, setSafeToRender] = useState();

    const handleOnclick = (id) => {
        navigate('/recipe/'+id)
    }

    useEffect(() => { 
        const fetchData = async()=> {
            try{
                const response = await fetch('/api/searchRecipeIngredient/?ingredients=' + ingredient);
                if (!response.ok){
                    setSafeToRender(false)
                    throw new Error("Status code error :" + response.status);
                }
                else{
                    const data = await response.json();
                    setRecipes(data); 
                    setSafeToRender(true);
                }
            }catch(err){
                console.log(err)
            }         
        }
        fetchData();
    }, [])
  
    useEffect( () => { 
        const ingredientOption = {
            'ingredient': ingredient
        }
        const requestBody = [...recipes, ingredientOption]
        const requestOptions ={
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
        };
        const sendRequest = async() => {
            await fetch('/api/searchRecipeIngredient/?ingredients='+ ingredient, requestOptions);
        }
        sendRequest();
        
    },[recipes])
    
    
        return(
            <div>
                {  safeToRender === null ? 
                (
                    <div class="loader">
                    <div class="circles">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                    </div>
                    <div class="pacman">
                        <span class="top"></span>
                        <span class="bottom"></span>
                        <span class="left"></span>
                        <div class="eye"></div>
                    </div>
                    </div>
                )
                :  ( safeToRender === true ? (

                    <div className='container'>
                    <BlackTypography variant='h4' className='mt-5'>
                        We found some recipes of {ingredient} for you!
                    </BlackTypography>
                    <Button href="/" variant='warning'><p className='fuzzy_bubbles'>Take me back!</p></Button>

                    <Row className='row-cols-1 row-cols-md-3 g-5 mt-5 ms-5 me-0'>
                            {recipes?.map(recipe=>(
                                <li key={recipe.id} style={{listStyleType: 'None'}}>
                                <Col>
                                    <div className='image_wrapper'>
                                    <img  src={recipe.image}  className='recipe_img' style={{cursor: 'pointer'}} onClick={() => handleOnclick(recipe.id)}/>
                                    </div>
                                    <BlackTypography className='fuzzy_bubbles'>
                                        {recipe.title}
                                    </BlackTypography>
                                    <div style={{ "marginTop": "auto", "textAlgin" : "center"}}>
                                    </div>
                                                                              
                                </Col>
                                </li>
                            ))}
                    </Row>
                    </div>
                ) :(
                    <div>
                    <BlackTypography className='mt-5' >
                       Sorry ''{ingredient}'' is either not a valid ingredient or there is no recipe using it.  =( 
                    </BlackTypography>   
                    <Button href="/" variant='warning'><p className='fuzzy_bubbles'>Take me back!</p></Button>
                    </div>
                )       
                ) 
            }
         </div> 
        )
}

export default Recipes