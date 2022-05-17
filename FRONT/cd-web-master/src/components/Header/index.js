import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import iconUser from '../../public/images/iconUser.png';
import signo from '../../public/images/signo-transparente-branco.png';
import './styles.css';


export default class Header extends Component {

    render() {
        return (
            <Nav id='header' className='navbar pb-1 pt-1'>

                <NavItem className='col-2 mt-3'>
                    <a href='/'>
                        <img className='imgLogo' src={signo} alt='' width='25%' />
                    </a>
                </NavItem>

                <NavItem className='col-8 mt-3 pr-5'>
                    <form className="input-group">
                        <input className="form-control col-7" id='searchNav' type="text" placeholder='Search'></input>
                    </form>
                </NavItem>

                <NavItem id='areaUserNav' className='col-1 pt-2'>
                    <p className='optionsNavUser'>
                        <span className=''> Clarim </span>
                        <a href='facebook.com'> Settings </a>
                        <a href='/logout'> Logout </a>
                    </p>
                </NavItem>

                <NavItem className='col-1'>
                    <img className='mt-2' id='imageUser' src={iconUser} alt='' width='85%' />
                </NavItem>

            </Nav>
        );
    }
}


