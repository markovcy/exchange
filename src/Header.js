import logo from './logo.png'
import React from 'react'
import './Header.css'


const Header = ({name_USD, rate_USD, name_EUR, rate_EUR}) =>{
    return( 
            <div className='currency-container'>
                        
                        <p className="curr_name">{name_USD} : {rate_USD}</p>
                        <p className="curr_name">{name_EUR} : {rate_EUR}</p>
                        <img src={logo}/> 
    
            </div>
            
    )
}

export default Header;