import { useState } from 'react'
import { RxActivityLog } from 'react-icons/rx'
import { ActivityBackgroundColor } from '../activity-background'

export function ActivityContent() {
   const [isChangeBackground, setIsChangeBackground] = useState(false)

   return (
      <section>
         {isChangeBackground ? (
            <ActivityBackgroundColor />
         ) : (
            <div>
               <div className='activity-actions-container activity-hover-effect curser-pointer'>
                  <div className='background-img'></div>
                  <h2
                     className='activity-text-style'
                     onClick={() => setIsChangeBackground(true)}
                  >
                     Change background
                  </h2>
               </div>
               <div className='activity-container activity-hover-effect curser-pointer'>
                  <RxActivityLog />
                  <h2 className='activity-text-style'>Activity</h2>
               </div>
            </div>
         )}
      </section>
   )
}
