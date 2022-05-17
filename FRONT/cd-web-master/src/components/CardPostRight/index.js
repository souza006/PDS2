import React from 'react';
import { Button } from 'reactstrap';
import iconUser from '../../public/images/iconUser.png';
import './styles.css'



function CardPostRight(props) {

    return (
        <div className='cardRight'>
            <div className='cardRightIconUser'>
                <a href='https:facebook.com' > <img className='iconUser' src={iconUser} alt='iconUser' width='15%' /> </a>
            </div>
            <div className=''>
                <h5 className='titleCardRight'> {props.type} </h5>
                <p className='dataHourCardRight'> {props.time} </p>
                <div>
                    <p className='contentCardRight'> {props.text} </p>
                </div>
                <div className=''>
                    <Button color="" className='button col-5' type='submit'> Acessar </Button>
                </div>
            </div>
        </div>
    );
}

export default CardPostRight;