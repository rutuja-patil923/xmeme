//adding bootstrap to react application
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import {config} from "./Config"
const API_URL=config.url.API_URL;

const Meme = ({ name, caption, url ,id }) => {

    //show state for modal to be appeared after clicking for edit meme
    const [show, setShow] = useState(false);
    const [captionIP, setcaptionIP] = useState('')
    const [urlIP, seturlIP] = useState('')

    //function to handle state of show
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const updateData = (e) =>{
        //if any input field is empty will create alert
        if(!captionIP || !urlIP) {
            alert('Please fill complete data')
            return
        }
        //PATCH request
        axios.patch(`${API_URL}${id}`,{
            caption:captionIP,
            url:urlIP
        })
        .then(function(response){
            console.log(response)
        })
        .catch(function(error) {
            alert('Something went wrong')
        })
        setShow(false)
        return
    }

    return (
        <div className='meme'>
            <img src={url} onError={(e) => { e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAElBMVEXy8vL////6+vr19fX4+Pj8/Px/aeudAAACoklEQVR4nO3c227bMBBF0cgk//+XGwu6kRxeRnFaVGevt8a2AG3QQ0kN8vUFAAAAAAAAAAAAAAAAAAAAAACAv2j5Ba9/fVK/hVgOxHL4Prf0+qD08FgfPbfw8Fjpk8cjlgOxHIjlQCwHYjlIxgoh3DqeXqyQbl+Ky8VK551L9B5PLFb40X2eWKyf3RVrxUpFrMU36KVihbKV88pCKtarfjzlWlpSsepWvh1RPZbr3JVi1SPLObSUYlkri1g7ZpZDGau6zGI3PJWxjKHV+3gqv6NSsXxX8KkqoxWrXFq98R7rkaYVq6jVaxWMpScWK6vVPW9rqKnF2r5e71e6G6G5+vRifZ9zjHFwyZDM9acYayx7PHEOeWIZ4pI5ViGxatW16/UFYlUfsy/HiFUx7iC3oxCrZDx73oc8sQrRarUNeWLlrKepx5AnVqbZaq0lHytmd3/tVu8jqccK2VuMjfA65NVjLdf3mBvhKYjHStuaWTU2wkst6Vj71+64MBiTjXV+7cL2dmK1XJdS+W9i5bI2qfoJsYpXy1rDEa8aq7ymitYPibWqr6nWIT+spRjL+sJNbYmCsexR3n5FOpYdYmZL1IvVmkxrif6WKBerPcXHW6JarN7SGW6JYrH6Q2m0JYrF6rYabolasQatRluiVKzJG5rmXFOKNXhyvOpuiUKxJh4rLP0tUSfW3JPj7ddm1GNNtuptiTKxxsN9194SVWLNDPesifUBkVhzw33X2hI1Ys0O911jS9SI5WzVukuUiDU/3A/vj1XrUSHWjVb2/44JxPJshEWYl/GzJzpieYf7ztgSHx/rbitrS3x8rDsDa7MeJ+0UYn2K9i+zOT09Fn8ueNbCH6Ked3+utxGLWMQCAAAAAAAAAAAAAAAAAAAAAAD4//0BUyATTom0AxcAAAAASUVORK5CYII=" }} alt='new' width='100%' height='250px' style={{ textAlign: "center" }} />
            <br />
            <br/>
            <h2 style={{fontSize: 20}}>{caption}</h2>
            <p style={{marginBottom:'0.5rem'}}>{name}</p>
            <div className='updation' style={{ textAlign: 'center' }}>
                <br />

                {/* bootstrap modal class  */}
                <Button variant="primary" onClick={handleShow}>
                    Edit
      </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{textAlign:'center'}}>Edit Meme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><form className='add-forms'>

                        <div className='form-controls'>
                            <label>Caption:</label>
                            <input type='text'
                                value={captionIP}
                                onChange={(e) => setcaptionIP(e.target.value)}
                                style={{ borderRadius: 5 }}
                            />
                        </div>
                        <div className='form-controls'>
                            <label>Image URL:</label>
                            <input type='text'
                                value={urlIP}
                                onChange={(e) => seturlIP(e.target.value)}
                                style={{ borderRadius: 5 }}
                            />
                        </div>

                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={updateData}>
                            Submit
          </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}


export default Meme
