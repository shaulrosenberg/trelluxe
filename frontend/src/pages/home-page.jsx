import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import logo from '../assets/img/logo.png'
// import { CHANGE_COUNT } from '../store/user.reducer'
import heroImg from '../assets/img/hero-trello.png';

export function HomePage() {
     return (
          <section className='home-page-layout'>
               <div className='div-hero-section'>
                    <div>
                         <h1>
                              Trello brings all your tasks, teammates, and tools
                              together
                         </h1>
                         <h2>
                              Keep everything in the same place—even if your
                              team isn’t.
                         </h2>
                    </div>
                    <div>
                        <img src={heroImg}/>
                    </div>
               </div>
          </section>
     )
}
