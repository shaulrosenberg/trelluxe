import React from 'react'
import heroImg from '../assets/img/hero-trello.png'
import { Link } from 'react-router-dom'


export function HomePage() {
     return (
          <section className='home-page-layout background-hero'>
               <div className='div-hero-section'>
                    <div className='div-hero-details'>
                         <h1>
                              Trelux brings all your tasks, teammates, and tools
                              together
                         </h1>
                         <p>
                              Keep everything in the same place—even if your
                              team isn’t.
                         </p>
                         <button className='btn-style-cta'>Sign Up</button>
                         <Link to={'/workspace'} className='btn-style-cta'>Try Demo</Link>
                    </div>
                    <div className='div-hero-img'>
                         <img src={heroImg} className='hero-img' alt='Hero' />
                    </div>
               </div>
          </section>
     )
}
