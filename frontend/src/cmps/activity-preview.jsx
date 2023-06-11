import { useEffect, useState } from "react"
import moment from 'moment' // moment.js for nice formatting of dates

export function ActivityPreview({ activity }) {
    const [formattedTime, setFormattedTime] = useState('')

    useEffect(() => {
        // Use moment.js to format time
        setFormattedTime(moment(activity.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
    }, [activity.createdAt])

    return (
        <div className="activity-preview">
            <div>{activity.byMember.fullname} {activity.txt} {activity.task.title}</div>
            <div className="timestamp">{formattedTime}</div>
        </div>
    )
}
