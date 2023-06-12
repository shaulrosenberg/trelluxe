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
                  Trelluxe brings all your tasks, teammates, and tools together
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
         <div className='main-second-homepage-info-container'>
            <div className='info-section-homepage'>
               <div>
                  <h2>A productivity powerhouse</h2>
                  <p>
                     Simple, flexible, and powerful. All it takes are boards,
                     lists, and cards to get a clear view of who’s doing what
                     and what needs to get done.
                  </p>
               </div>
            </div>
            <div className='homepage-inner-info'>
               <div className='homepage-info-container'>
                  <div>
                     <h2>Boards</h2>
                     <p>
                     Trelluxe boards keep tasks organized and work moving
                        forward. In a glance, see everything from “things to do”
                        to “aww yeah, we did it!”
                     </p>
                  </div>
                  <div>
                     <h2>Lists</h2>
                     <p>
                        The different stages of a task. Start as simple as To
                        Do, Doing or Done—or build a workflow custom fit to your
                        team’s needs. There’s no wrong way to Trelluxe.
                     </p>
                  </div>
                  <div>
                     <h2>Cards</h2>
                     <p>
                        Cards represent tasks and ideas and hold all the
                        information to get the job done. As you make progress,
                        move cards across lists to show their status.
                     </p>
                  </div>
               </div>
               <div>
                  <img src={homepageImg} alt='homepage section' />
               </div>
            </div>
         </div>
      </section>
   )
}
