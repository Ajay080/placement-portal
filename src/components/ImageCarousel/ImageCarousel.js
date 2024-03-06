import React from 'react';
import './ImageCarousel.css'; // Import the CSS file for styling
import profile from '../../Img/profile-icon.jpg'

const ImageCarousel = () => {
  return (
    <div className='image-carousel-container'>
      <div className='image-carousel'>
        <div className='card'>
          <img src={profile} alt="Teammate 1" className="card-image" />
          <div className="card-text">Teammate 1</div>
        </div>
        <div className='card'>
          <img src={profile} alt="Teammate 2" className="card-image" />
          <div className="card-text">Teammate 2</div>
        </div>
        <div className='card'>
          <img src={profile} alt="Teammate 3" className="card-image" />
          <div className="card-text">Teammate 3</div>
        </div>
        <div className='card'>
          <img src={profile} alt="Teammate 4" className="card-image" />
          <div className="card-text">Teammate 4</div>
        </div>
        <div className='card'>
          <img src={profile} alt="Teammate 5" className="card-image" />
          <div className="card-text">Teammate 5</div>
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
