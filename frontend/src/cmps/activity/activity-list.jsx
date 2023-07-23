import { ActivityPreview } from "./activity-preview"

export function ActivityList({ activities, isInControls }) {
    return (
        <div className="activity-list">
            {activities.map(activity => <ActivityPreview isInControls={isInControls} key={activity.id} activity={activity} />)}
        </div>
    )
}
