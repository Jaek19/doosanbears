import React from 'react';
import {useState, useEffect} from 'react';
import './ScrollText.css';

const ScrollText = () => {
  const [idx, setIdx] = useState(0);
  const tscroll = () => {
    const scrollY = window.scrollY;
    const height = window.innerHeight;

    if( scrollY < height*0.8) {
      setIdx(0);
    } else if (scrollY < height*1.8) {
      setIdx(1);
    } else {
      setIdx(2);
    }
  }

  useEffect( () => {
    window.addEventListener('scroll', tscroll);
    tscroll();
    return () => window.removeEventListener('scroll', tscroll);
  },[]);

  return (
    <div className='scroll-text'>
      <section className={`scrollt ${ idx === 0 ? 'on' : ''}`}>
        <h1>first page</h1>
      </section>
      <section className={`scrollt ${ idx === 1 ? 'on' : ''}`}>
        <h1>second page</h1>
      </section>
      <section className={`scrolli ${ idx === 2 ? 'on' : ''}`}>
        <img src={ process.env.PUBLIC_URL + '/images/img1.jpg'} alt="img" />
      </section>
    </div>
  )
}

export default ScrollText