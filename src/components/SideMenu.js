import React from 'react';
import notflixlogo from '../assets/images/notflex-logo.png';
import '../css/SideMenu.css';

export default function () {
    return (
        <div className='menu-bar'>
            <div className='main-logo-wrapper'>
                <a href="."><img className='main-logo' src={notflixlogo} /></a>
            </div>
        </div>
    )
}
