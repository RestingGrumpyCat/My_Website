import React,{ useRef,useState }  from 'react'
import Images from './Images';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeHomePage = () => {
    const navigate = useNavigate();
    const stringRegex = /[a-zA-Z],\s*[a-zA-Z]/g;

    const [formData, setFormData] = useState();
    const form = useRef(null);
    const pictures = useRef(null);
   

    const scrollToSection = (elemRef) =>{
        windows.scrollTo({
            top: elemRef.current.offsetTop,
            behavior: "smooth",
        });
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (formData){

            //if more than one ingredient is passed
            if (stringRegex.test(formData)){
                navigate('recipes/' + formData)
                // console.log(formData)
            }
            else{
                navigate('recipes/' + formData)
            }                
        }
        else{
            console.log('ok')
            toast.warn('Wanna add some ingredients so we can look for recipes for you?', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark",
                });
        }      
        
    };

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setFormData(value);
    };

    return(
        <div style={{ backgroundColor: '#FFDF00'}}>
            <ul>
                <li onClick={() => scrollToSection(form)} className='link'>
                </li>
                <li onClick={() => scrollToSection(pictures)} className='link'>
                </li>
            </ul>
            <div >
                <div className='center-screen'>
                <div ref={form} >
                        <h2 className='fuzzy_bubbles'>What is in my fridge?</h2>
                        <form onSubmit={handleSubmit}>
                            <input type = "text" name = "ingredients" placeholder="Search..." className = "text-center" onChange={handleChange} />{' '}  
                            <Button  variant="dark" type="submit" size="sm" >
                                <p className='fuzzy_bubbles' style={{fontSize:14}}>
                                    SEARCH MEAL
                                </p>
                            </Button>
                            <ToastContainer />
                        </form> 
                </div> 
                </div> 
                <div ref={pictures} className='center-screen'>
                    <h2 className='fuzzy_bubbles'>Today's Recommended Ingredients:</h2>
                    <Images />
                </div>
            </div>    
                  
        </div>          
    )
}

export default RecipeHomePage