import React from 'react';
import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Recipes = ({ingredient}) => {
    
    const [recipes, setRecipes] = useState([]);
    

    useEffect(() => { 
        fetch('/api/searchRecipe/?ingredients='+ingredient)
        .then((response) => response.json())
        .then((data) => {
            setRecipes(data);
           
        })
    
    }, [])
  
    return(
        <div className='text-center container'>
            <Row className='row-cols-1 row-cols-md-3 g-4'>
                    {recipes?.map(recipe=>(
                        <Col>
                            <Card style={{ width: '18rem'}} bg="dark" text="white" className="h-100 ">
                                <Card.Img variant="top" src={recipe.image_url} />
                                <Card.Body className="h-100 d-flex flex-column">
                                    <Card.Title>{recipe.title}</Card.Title>
                                    <Card.Text>
                                        Man I hate frontend
                                    </Card.Text>
                                    <Button variant="light" className="btn btn-lg mt-auto">Go somewhere</Button>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    )

}

export default Recipes