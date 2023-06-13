import { useState } from 'react'

// cmp
import { ActivityColors } from './activity-colors'

export function ActivityBackgroundColor() {
   const [isColorsOpen, setIsColorsOpen] = useState(false)
   const [isImagesOpen, setIsImageOpen] = useState(false)

   return isColorsOpen ? (
      <ActivityColors />
   ) : (
      <section className='activity-background-container curser-pointer'>
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
               onClick={() => setIsImageOpen(true)}
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
