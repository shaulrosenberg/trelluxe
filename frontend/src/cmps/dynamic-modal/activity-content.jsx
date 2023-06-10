import { RxActivityLog } from 'react-icons/rx'

export function ActivityContent() {
   return (
      <section>
         <div>
            <div className='activity-actions-container activity-hover-effect curser-pointer'>
               <div className='background-img'></div>
               <h2 className='activity-text-style '>Change background</h2>
            </div>
            <div className='activity-container activity-hover-effect curser-pointer'>
               <RxActivityLog />
               <h2 className='activity-text-style'>Activity</h2>
            </div>
         </div>
      </section>
   )
}
