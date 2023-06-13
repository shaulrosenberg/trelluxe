import { useEffect, useState } from 'react'
import moment from 'moment' // moment.js for nice formatting of dates

export function ActivityPreview({ activity, isInControls }) {
   const [formattedTime, setFormattedTime] = useState('')

   useEffect(() => {
      // Use moment.js to format time
      setFormattedTime(
         moment(activity.createdAt).format('MMMM Do YYYY, h:mm:ss a')
      )
   }, [activity.createdAt])
   console.log('activity.byMember?.imgUrl', activity.byMember?.imgUrl)
   console.log('activity', activity)

   const isControl = isInControls === 'true' ? 'inTaskDetails' : ''
   console.log('isInControls', isInControls)
   return (
      <div className='activity-preview'>
         <div>
            <div className='member-img'>
               <img
                  src={activity.byMember?.imgUrl}
                  referrerPolicy='no-referrer'
                  alt='member'
               />
            </div>
            <p>
            <span> {activity?.byMember?.fullname} </span>{' '}
               {activity?.txt}{' '}
               {activity?.task?.title ? activity.task.title : null}
            </p>
         </div>
         <div className='activity-timestamp-container'>
            <p className={`timestamp ${isControl}`}>{formattedTime}</p>
         </div>
      </div>
   )
}
