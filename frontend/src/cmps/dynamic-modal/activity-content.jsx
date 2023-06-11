import { useState } from 'react'
import { RxActivityLog } from 'react-icons/rx'
import { ActivityBackgroundColor } from '../activity-background'
import { ActivityList } from '../activity-list'
import { useSelector } from 'react-redux'

export function ActivityContent() {
   const [isChangeBackground, setIsChangeBackground] = useState(false)
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )
   const [activities, setActivities] = useState(board.activities)

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
                  <div>
                     <RxActivityLog />
                     <h2 className='activity-text-style'>Activity</h2>
                  </div>
                  <div>
                     <ActivityList activities={activities} />
                  </div>
               </div>
               
            </div>
         )}
      </section>
   )
}
