import React from 'react'
import heroImg from '../assets/img/hero-trello.png'
import homepageImg from '../assets/img/img-3.png'
import { NavLink, Link } from 'react-router-dom'

export function HomePage() {
   return (
      <section className='home-page-layout '>
         <div className='home-page-layout full background-hero'>
            <div className='div-hero-section'>
               <div className='div-hero-details'>
                  <h1>
                     Trelux brings all your tasks, teammates, and tools together
                  </h1>
                  <p>
                     Keep everything in the same place—even if your team isn’t.
                  </p>
                  {/* <NavLink to='/signup'>
                  <button className='btn-style-cta'>Sign Up</button>
               </NavLink> */}
                  <Link to={'/workspace'} className='btn-style-cta'>
                     Try Demo
                  </Link>
               </div>
               <div className='div-hero-img'>
                  <img src={heroImg} className='hero-img' alt='Hero' />
               </div>
            </div>
         </div>

         <div className='info-section-homepage'>
            <div>
               <h2>A productivity powerhouse</h2>
               <p>
                  Simple, flexible, and powerful. All it takes are boards,
                  lists, and cards to get a clear view of who’s doing what and
                  what needs to get done.
               </p>
            </div>
            <div>
               <img src={homepageImg} alt='homepage section' />
            </div>
         </div>
      </section>
   )
}
