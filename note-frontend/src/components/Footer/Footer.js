import React from 'react';
import './Footer.css';
import GitHubImage  from './../../images/GitHub-Mark-32px.png'

const Footer = () => {
    return(
        <div className='footer'>
            <a href='https://github.com/' target='_blank'>
                <img src= {GitHubImage} alt='Github-Link'style={{height:"3rem"}}/>
            </a>
        </div>
    )
}

export default Footer