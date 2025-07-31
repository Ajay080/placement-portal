import React from 'react'
import LogoCrop from '../../Img/LogoCrop.png'
import './BrandName.css'
const BrandName = () => {
  return (
    <div className="BrandName">
        <img className="BrandLogo" src={LogoCrop}/>
        <p className="BrandName">PlacementPortal</p>
    </div>
  )
}

export default BrandName