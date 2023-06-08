import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { filterBoard } from '../../store/board.actions'

export function FilterContent() {
     const [selectedLabels, setSelectedLabels] = useState([])
     const [selectedMembers, setSelectedMembers] = useState([])
     const [originalBoard, setOriginalBoard] = useState()
     const [filteredBoard, setFilteredBoard] = useState()

     const board = useSelector(
          (storeState) => storeState.boardModule.selectedBoard
     )

     useEffect(() => {
          setOriginalBoard(board)
          setFilteredBoard(board)
     }, [board])

     const members = filteredBoard?.members || []
     const labels = filteredBoard?.labels || []

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

     function resetFilter() {
          console.log('original board:',originalBoard)
          setSelectedLabels([])
          setSelectedMembers([])
          filterBoard(originalBoard)
          setFilteredBoard(originalBoard)
     }

     function handleFilter() {
          const newFilteredBoard = {
               ...originalBoard,
               groups: originalBoard.groups.map((group) => ({
                    ...group,
                    tasks: group.tasks.filter((task) => {
                         const hasLabels = selectedLabels.length
                              ? task.labelIds
                                   ? task.labelIds.some((labelId) => selectedLabels.includes(labelId))
                                   : false
                              : true
                         const hasMembers = selectedMembers.length
                              ? task.memberIds
                                   ? task.memberIds.some((memberId) => selectedMembers.includes(memberId))
                                   : false
                              : true
                         return hasLabels && hasMembers
                    }),
               })),
          }

          console.log('Filtered Board:', newFilteredBoard)
          filterBoard(newFilteredBoard)
          setFilteredBoard(newFilteredBoard)
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
               <button onClick={resetFilter}>Reset Filter</button>
          </div>
     )
}
