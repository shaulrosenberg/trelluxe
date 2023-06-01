import { useState } from 'react'


//components imports
import { GroupPreview } from './group-preview.jsx'

export function GroupList({ groups }) {
    return (
        <section className="group-list-container">
            {groups.map(group =>
                <GroupPreview key={group.id} group={group}/>
            )}
        </section>
    )
}