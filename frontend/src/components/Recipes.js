import React, { useState,useEffect,useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';

const Recipes = () => {
    
    let { ingredient } = useParams();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const safeToRender = useRef(false);

    const handleOnclick = ({title}) => {
        navigate('recipes/'+ title)
    }

    useEffect(() => { 
        const fetchData = async()=> {
            try{
                const response = await fetch('/api/searchRecipeIngredient/?ingredients='+ ingredient );
                if (!response.ok){
                    throw new Error("Status code error :" + response.status);
                }
                else{
                    const data = await response.json();
                    setRecipes(data); 
                    safeToRender.current = true;
                }
            
            }catch(err){
                console.log(err)
            }         
        }
        fetchData();
    }, [])
  
    useEffect( () => {
        if (recipes.length === 10) {
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
                const response = await fetch('/api/searchRecipeIngredient/?ingredients='+ ingredient, requestOptions);
                console.log(response)
            }
            sendRequest();
        };
        
    },[recipes])
    
    if (safeToRender === true) {
        return(
            <div className='container'>
                <h2 className='mt-5' style={{ fontFamily: 'Fuzzy Bubbles'}}>
                    We found some recipes of {ingredient} for you!
                </h2>
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
                                            <Button  variant="outline-light" className='button' onClick={() => handleOnclick(recipe.title)}>
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
        )
    }
    else{
        return(
            <div>
                <h2 className='mt-5' style={{ fontFamily: 'Fuzzy Bubbles', fontColor: 'red'}}>
                    =( sry ''{ingredient}'' is either not a valid ingredient or there is no recipe using it.
                </h2>   
                <Button href="/" variant='warning'><p className='fuzzy_bubbles'>Take me back!</p></Button>
            </div>
                
            
        )
    }

}

export default Recipes