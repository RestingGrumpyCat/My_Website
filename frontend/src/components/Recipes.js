import React, { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'

const Recipes = () => {
    let { recipeID } = useParams();
    let { ingredient } = useParams();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [safeToRender, setSafeToRender] = useState();

    const handleOnclick = (id) => {
        recipeID = id
        navigate(recipeID)
    }

    useEffect(() => { 
        const fetchData = async()=> {
            try{
                const response = await fetch('/api/searchRecipeIngredient/?ingredients='+ ingredient );
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
        if (recipes.length > 0) {
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
        };
        
    },[recipes])
    
    
        return(
            <div>
                {  safeToRender === null ? 
                (
                    <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                )
                :  ( safeToRender === true ? (

                    <div className='container'>
                    <h2 className='mt-5' style={{ fontFamily: 'Fuzzy Bubbles'}}>
                        We found some recipes of {ingredient} for you!
                    </h2>
                    <Button href="/" variant='warning'><p className='fuzzy_bubbles'>Take me back!</p></Button>

                    <Row className='row-cols-1 row-cols-md-3 g-5 mt-5 ms-5 me-0'>
                            {recipes?.map(recipe=>(
                                <li key={recipe.id} style={{listStyleType: 'None'}}>
                                <Col>
                                    <Card  style={{ width: '18rem'}} bg="dark" text="light" className="card">
                                        <div className='image_wrapper'>
                                        <Card.Img variant="top" src={recipe.image}  className='card_img' />
                                        </div>
                                        <Card.Body className="d-flex flex-column" >
                                            <Card.Title className='fuzzy_bubbles'>{recipe.title}</Card.Title>
                                            <div style={{ "marginTop": "auto", "textAlgin" : "center"}}>
                                            <center>
                                                <Button variant="outline-light" className='button' onClick={() => handleOnclick(recipe.id)}>
                                                    <p className='fuzzy_bubbles' >Check This Out!</p>
                                                </Button>
                                            </center>
                                            </div>
                                        </Card.Body>
                                        
                                    </Card>
                                </Col>
                                </li>
                            ))}
                    </Row>
                    </div>
                ) :(
                    <div>
                    <h2 className='mt-5' style={{ fontFamily: 'Fuzzy Bubbles', fontColor: 'red'}}>
                       sry ''{ingredient}'' is either not a valid ingredient or there is no recipe using it.  =( 
                    </h2>   
                    <Button href="/" variant='warning'><p className='fuzzy_bubbles'>Take me back!</p></Button>
                    </div>
                )       
                ) 
            }
         </div> 
        )
}

export default Recipes