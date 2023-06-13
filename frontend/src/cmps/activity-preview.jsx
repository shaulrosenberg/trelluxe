import { useEffect, useState } from 'react'
import moment from 'moment' // moment.js for nice formatting of dates

export function ActivityPreview({ activity }) {
   const [formattedTime, setFormattedTime] = useState('')

   useEffect(() => {
      // Use moment.js to format time
      setFormattedTime(
         moment(activity.createdAt).format('MMMM Do YYYY, h:mm:ss a')
      )
   }, [activity.createdAt])

   return (

      <div className='activity-preview'>
         <div>
            <div className="member-img">
               <img src={activity.byMember?.imgUrl} referrerPolicy="no-referrer" alt="member" />
            </div>
            <span> {activity?.byMember?.fullname} </span> {activity?.txt}{' '}
            {activity?.task?.title ? activity.task.title : null}
         </div>
         <p className='timestamp'>{formattedTime}</p>

      </div>
   )
}
