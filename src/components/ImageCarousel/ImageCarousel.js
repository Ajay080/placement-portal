import React from 'react';
import './ImageCarousel.css'; // Import the CSS file for styling
import profile from '../../Img/profile-icon.jpg'
import ajay from '../../Img/ajay.jpg'
import isha from '../../Img/Isha.jpeg.jpg'
import preet from '../../Img/preet.jpg'
import varun from '../../Img/varun.jpg'
import pooja from '../../Img/pooja.jpg'


const ImageCarousel = () => {
  return (
    <div className='image-carousel-container'>
      <div className='image-carousel'>
        <div className='card'>
          <img src={isha} alt="Teammate 1" className="card-image" />
          <div className="card-text">Isha Kondurkar</div>
        </div>
        <div className='card'>
          <img src={ajay} alt="Teammate 2" className="card-image" />
          <div className="card-text">Ajay Singh</div>
        </div>
        <div className='card'>
          <img src={preet} alt="Teammate 3" className="card-image" />
          <div className="card-text">Preet Saran</div>
        </div>
        <div className='card'>
          <img src={varun} alt="Teammate 4" className="card-image" />
          <div className="card-text">Varun Jain</div>
        </div>
        <div className='card'>
          <img src={pooja} alt="Teammate 5" className="card-image" />
          <div className="card-text">Pooja</div>
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
