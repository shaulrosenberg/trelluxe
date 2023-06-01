import { useState } from 'react'


//components imports
import { GroupPreview } from './group-preview.jsx'

export function GroupList(groups) {
    <section className="group-list-container">
        {groups.map((group) => {
            return (<GroupPreview key={group.id}


            />)
        })}
    </section>
}