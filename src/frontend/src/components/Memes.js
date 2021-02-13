import axios from "axios"
import { useEffect, useState } from 'react' 
import Meme from './Meme'
import {config} from "./Config"
const API_URL=config.url.API_URL;
const Memes = () => {
    
    const [memes, setmemes] = useState([])

    //autoupdate whenever there is change in state of memes after posting new data
    useEffect(() => {
        axios.get(API_URL)
        .then(response =>setmemes(response.data))
    }, [memes])

    return (
        <div className='flex-containers'>
               {memes.map(({name,caption,url,id},i) =>(
                   <Meme name={name} caption={caption} url={url} id={id}/>
               ))} 
        </div>
    )
}

export default Memes
