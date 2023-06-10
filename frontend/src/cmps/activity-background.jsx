import { useState } from 'react'

// cmp
import { ActivityColors } from './activity-colors'

export function ActivityBackgroundColor() {
   const [isColorsOpen, setIsColorsOpen] = useState(false)

   return isColorsOpen ? (
      <ActivityColors />
   ) : (
      <section className='activity-background-container curser-pointer'>
         <div
            onClick={() => setIsColorsOpen(true)}
            className='activity-background-section cursor-pointer'
         >
            <div></div>
            <div></div>
         </div>
         <h2 className='activity-text-style'>Colors</h2>
      </section>
   )
}
