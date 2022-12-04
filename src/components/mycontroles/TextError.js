import React from 'react'


function TextError( props ) {
    
    return (
      <div style={{color:'red',fontSize:'10px',marginTop:'1px'}} >
        {props.children}
      </div>
    )
}

export default TextError