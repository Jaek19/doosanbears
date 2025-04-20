import React, { useState, useEffect } from 'react';
import './Home.css';
import ScrollText from '../com/ScrollText';

const Home = () => {
  const images = [
    { src: "1.jpg", comment1: "DOOSAN", comment2: "BEARS" },
    { src: "2.jpg", comment1: "MIRACLE", comment2: "AGAIN" },
    { src: "3.jpg", comment1: "HUSTLE", comment2: "DOOGETHER" },
    { src: "4.jpg", comment1: "YOU GOT", comment2: "THIS" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <div className='home-container'>
        <video
          className='bg-video'
          src={process.env.PUBLIC_URL + '/videos/main_video.mp4'}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className='third-container'>
        {images.map((img, idx) => (
          <div 
            key={idx}
            className={`slide ${current === idx ? 'active' : ''}`}
          >
            <div className="image-wrapper">
              <img 
                src={`${process.env.PUBLIC_URL}/images/${img.src}`} 
                alt={`Slide ${idx + 1}`}
                className="slide-image"
              />
            </div>
            
            <div className="comments-container">
              <div className={`slide-comment-wrapper left ${current === idx ? 'active' : ''}`}>
                <p className="slide-comment">{img.comment1}</p>
              </div>
              <div className={`slide-comment-wrapper right ${current === idx ? 'active' : ''}`}>
                <p className="slide-comment">{img.comment2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;