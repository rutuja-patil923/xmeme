
import { useState } from 'react'
import axios from 'axios'

import {config} from "./Config"
const API_URL=config.url.API_URL;

const AddMeme = () => {

    //states for input data {name,url,caption}
    //giving initial values for states
    const [nameIP, setnameIP] = useState('')
    const [captionIP, setcaptionIP] = useState('')
    const [urlIP, seturlIP] = useState('')
    
    //on submitiing data will post data to server creating new meme in database
    const onSubmit = (e) =>{
        e.preventDefault()

        //if any of the input feild is empty will create alert
        if(!nameIP || !captionIP || !urlIP) {
            alert('Please fill complete data')
            return
        }
        
        //POST request
        axios.post(API_URL,{
            name: nameIP,
            caption:captionIP,
            url:urlIP
        })
        .then(function(response){
            console.log(response)
        })
        .catch(function(error) {
            alert('You have entered duplicate data')
        })
        setnameIP('')
        setcaptionIP('')
        seturlIP('')
    }

    return (
        //getting input from user
        //3 data inputs:{name.url,caption}
        <form className='add-forms'>
            <div className='form-controls'>
                <label>Meme Owner:</label>
                <input type='text' 
                    value={nameIP}
                    onChange={(e)=>setnameIP(e.target.value)}
                    style={{borderRadius:5}}
                />
            </div>
            <div className='form-controls'>
                <label>Caption:</label>
                <input type='text' 
                    value={captionIP}
                    onChange={(e)=>setcaptionIP(e.target.value)}
                    style={{borderRadius:5}}
                />
            </div>
            <div className='form-controls'>
                <label>Image URL:</label>
                <input type='text' 
                    value={urlIP}
                    onChange={(e)=>seturlIP(e.target.value)}
                    style={{borderRadius:5}}
                />
            </div>
            <input type='submit' value='Post Meme' className='button button-block' onClick={onSubmit} />
        </form>
    )
}

export default AddMeme
