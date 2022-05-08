import React from 'react'
import authLogo from '../../assets/authLogo.png';
import '../../styles/stylesLogo.scss';
export const Logo = () => {
  return (
    <div id='gf-logo-container'>
        <img src={authLogo} alt="logo" className='gf-logo-img' />
        <h1 className='gf-logo-title'>Golden Feather</h1>
        <p className='gf-logo-subtitle'>Sistema de reservas</p>
    </div>
  )
}
