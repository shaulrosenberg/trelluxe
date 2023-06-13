import { useState } from 'react'

// cmp
import { ActivityColors } from './activity-colors'
import { ActivityImages } from './activity-images'

export function ActivityBackgroundColor() {
   const [isColorsOpen, setIsColorsOpen] = useState(false)
   const [isImagesOpen, setIsImagesOpen] = useState(false)

   return isColorsOpen ? (
      <ActivityColors />
   ) : isImagesOpen ? (
      <ActivityImages /> // Render the different component here
   ) : (
      <section className='activity-background-container cursor-pointer'>
         <div className='activity-style-container'>
            <div
               onClick={() => setIsColorsOpen(true)}
               className='activity-background-section cursor-pointer'
            >
               <div></div>
               <div></div>
            </div>
            {/* <h2 className='activity-text-style'>Colors</h2> */}

            <div
               onClick={() => setIsImagesOpen(true)}
               className='activity-background-images cursor-pointer'
            >
               <img src='https://cdn.pixabay.com/photo/2023/05/27/12/20/eastern-spinebill-8021395_1280.jpg' />
            </div>
            {/* <h2 className='activity-text-style'>Images</h2> */}
         </div>
         <div className='activity-style-info'>
            <h2 className='activity-text-style'>Colors</h2>
            <h2 className='activity-text-style'>Images</h2>
         </div>
      </section>
   )
}
