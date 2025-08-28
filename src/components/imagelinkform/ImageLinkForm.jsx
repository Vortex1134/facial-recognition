import React from 'react'
import './imagelinkform.scss'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div id='imagelinkform'>
        <p>
            {`This magic brain will detected faces in your pictures.`}
        </p>
        <div>
            <input type="text" name="" id="" onChange={onInputChange}/>
            <button onClick={onButtonSubmit}>Detect</button>
        </div>
    </div>
  )
}

export default ImageLinkForm