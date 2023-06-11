import { ActivityPreview } from "./activity-preview"

export function ActivityList({ activities }) {
    return (
        <div className="activity-list">
            {activities.map(activity => <ActivityPreview key={activity.id} activity={activity} />)}
        </div>
    )
}
