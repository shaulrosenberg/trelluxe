import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { filterBoard } from '../../store/board.actions'
import { SET_SELECTED_BOARD, SAVE_UNFILTER_BOARD } from '../../store/board.reducer'
import { useDispatch } from 'react-redux'


export function FilterContent() {
   const dispatch = useDispatch()
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )
   const beforeFilterBoard = useSelector((storeState) => storeState.boardModule.boardBeforeFilter)
   const [selectedLabels, setSelectedLabels] = useState([])
   const [selectedMembers, setSelectedMembers] = useState([])
   const [copyBoard, setCopyBoard] = useState(null)

   const originalBoard = useRef(null)

   useEffect(() => {
      originalBoard.current = board
      setCopyBoard(originalBoard.current)
   }, [])

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
         setSelectedMembers(selectedMembers.filter((id) => id !== memberId))
      } else {
         setSelectedMembers([...selectedMembers, memberId])
      }
   }

   function resetFilter() {
      setSelectedLabels([])
      setSelectedMembers([])
      // filterBoard(copyBoard)
      console.log('beforeFilterBoard', beforeFilterBoard)
      filterBoard(beforeFilterBoard)
   }

   function handleFilter() {
      const filteredBoard = {
         ...board,
         groups: board.groups.map((group) => ({
            ...group,
            tasks: group.tasks.filter((task) => {
               const hasLabels = selectedLabels.length
                  ? task.labelIds
                     ? task.labelIds.some((labelId) =>
                        selectedLabels.includes(labelId)
                     )
                     : false
                  : true

               const hasMembers = selectedMembers.length
                  ? task.memberIds
                     ? task.memberIds.some((memberId) =>
                        selectedMembers.includes(memberId)
                     )
                     : false
                  : true

               return hasLabels && hasMembers
            }),
         })),
      }
      console.log('originalBoard.current', originalBoard.current)
      dispatch({type: SAVE_UNFILTER_BOARD, board: originalBoard.current} )
      dispatch({ type: SET_SELECTED_BOARD, board: filteredBoard })
   }

   return (
      <div className='main-filter-container'>

         <div className='filter-labels-container'>
            <h4 className='filter-text-style'>Labels</h4>
            <div className='filter-labels filter-align'>
               {labels.map((label,index ) => (
                  <div key={label.id || index} className='filter-content'>
                     <div>
                        <input
                           type='checkbox'
                           className='filter-checkbox'
                           checked={selectedLabels.includes(label.id)}
                           onChange={() => handleLabelChange(label.id)}
                        />
                     </div>
                     <div
                        className='labels-filter-area'
                        style={{ backgroundColor: label.color }}

                     >
                        <label>{label.title}</label>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className='filter-members-container'>
            <h4 className='filter-text-style'>Members</h4>
            <div className='filter-members filter-align'>
               {members.map((member, index) => (
                  <div className='members-filter-area' key={member._id || index}>
                     <label>
                        <input
                           type='checkbox'
                           checked={selectedMembers.includes(member._id)}
                           onChange={() => handleMemberChange(member._id)}
                        />
                        {member.fullname}
                     </label>
                  </div>
               ))}
            </div>
         </div>

         <div className='filter-btns-container'>
            <button onClick={handleFilter}>Apply Filter</button>
            <button onClick={resetFilter}>Reset Filter</button>
         </div>
      </div>
   )
}
