import React from 'react'
import './styles.css'

export default props =>

    <div className="Card" style={{ borderColor: props.color || '#000' }}>
        <div className="CardConteudo">
            {props.children}
        </div>
        <div className="CardFooter" style={{ backgroundColor: props.color || '#000' }}>
            {props.titulo}
        </div>
    </div>

