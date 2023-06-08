import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import { useSelector } from 'react-redux'

export function FilterContent() {
     const [selectedLabels, setSelectedLabels] = useState([])
     const [selectedMembers, setSelectedMembers] = useState([])

     const board = useSelector(
          (storeState) => storeState.boardModule.selectedBoard
     )
     const members = board?.members || []
     const labels = board?.labels || []

     function handleLabelChange(labelId) {
          const isSelected = selectedLabels.includes(labelId)
          if (isSelected) {
               setSelectedLabels(selectedLabels.filter((id) => id !== labelId))
          } else {
               setSelectedLabels([...selectedLabels, labelId])
          }
     }

     function handleMemberChange(memberId) {
          const isSelected = selectedMembers.includes(memberId)
          if (isSelected) {
               setSelectedMembers(
                    selectedMembers.filter((id) => id !== memberId)
               )
          } else {
               setSelectedMembers([...selectedMembers, memberId])
          }
     }

     function handleFilter() {
          const filter = {
               labels: selectedLabels,
               members: selectedMembers,
          }
          console.log('members', filter)

          const filteredBoard = {
               ...board,
               groups: board.groups.map((group) => ({
                    ...group,
                    tasks: group.tasks.filter((task) => {
                         const hasLabels = task.labelIds
                              ? filter.labels.some((labelId) =>
                                     task.labelIds.includes(labelId)
                                )
                              : true // Include the task if no labels are selected

                         const hasMembers = task.members
                              ? filter.members.some((memberId) =>
                                     task.members.includes(memberId)
                                )
                              : true // Include the task if no members are selected

                         return hasLabels && hasMembers
                    }),
               })),
          }

          console.log('Filtered Board:', filteredBoard)
          // Update the state or perform any necessary actions with the filtered board
          // ...
     }

     return (
          <div>
               <h3>Filter</h3>
               <div>
                    <h4>Labels</h4>
                    {labels.map((label) => (
                         <label key={label.id}>
                              <input
                                   type='checkbox'
                                   checked={selectedLabels.includes(label.id)}
                                   onChange={() => handleLabelChange(label.id)}
                              />
                              {label.title}
                         </label>
                    ))}
               </div>
               <div>
                    <h4>Members</h4>
                    {members.map((member) => (
                         <label key={member._id}>
                              <input
                                   type='checkbox'
                                   checked={selectedMembers.includes(
                                        member._id
                                   )}
                                   onChange={() =>
                                        handleMemberChange(member._id)
                                   }
                              />
                              {member.fullname}
                         </label>
                    ))}
               </div>
               <button onClick={handleFilter}>Apply Filter</button>
          </div>
     )
}
