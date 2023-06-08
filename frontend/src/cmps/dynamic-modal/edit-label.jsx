import { useEffect } from 'react'
import { updateTask } from '../../store/board.actions'
import { useParams } from 'react-router-dom'

export function EditLabel({ task }) {
     const { taskId, boardId, groupId } = useParams()
     const bgColor = task.style?.backgroundColor || ''
     const imgBackground = task.style?.backgroundImage || ''

     const colors = [
          '#4BCE97',
          '#E2B203',
          '#FAA53D',
          '#F87462',
          '#9F8FEF',
          '#579DFF',
          '#60C6D2',
          '#94C748',
          '#E774BB',
          '#8590A2',
     ]

     useEffect(() => {
          console.log('from cover content', task)
          console.log('bgcolor', bgColor)
     }, [])

     async function onColorClick(color) {
          const updatedTask = {
               ...task,
               style: { ...task.style, backgroundColor: color },
          }
          await updateTask(updatedTask, boardId, groupId)
     }

     async function onRemoveCover() {
          const updatedTask = {
               ...task,
               style: null
          }
          await updateTask(updatedTask, boardId, groupId)
     }

     async function onHalfCoverClick() {
          console.log('half click')
     }

     // while clicked the style preview card change to full
     async function onFullCoverClick() {
          console.log('full click')
          // need to add key in style that determinate if is fullyCover of not 
          // if fully cover is true so the card preview style change accordingly
          const updatedTask = {
               ...task,
               style: { ...task.style, isFullyCover: true }
          }
          await updateTask(updatedTask, boardId, groupId)
     }

     // while clicked the card preview style change to half cover
     async function onHalfCoverClick() {
          console.log('full click')

          const updatedTask = {
               ...task,
               style: { ...task.style, isFullyCover: false }
          }
          await updateTask(updatedTask, boardId, groupId)
     }

     return (
          <div className='task-cover-section'>
               <h5>Hello</h5>

               <div className='cover-options'>
                    <div className='half-cover' onClick={() => onHalfCoverClick()}>
                         <div
                              className='upper-cover'
                              style={{ backgroundColor: bgColor }}
                         ></div>
                         <div className='bottom-cover'>
                              <div className='bottom-line-1'></div>
                              <div className='bottom-line-2'></div>
                              <div className='bottom-btn-1'></div>
                              <div className='bottom-btn-2'></div>
                              <div className='bottom-circle'></div>
                         </div>
                    </div>
                    <div className='full-cover' onClick={() => onFullCoverClick()}>
                         <div
                              className='full'
                              style={{ backgroundColor: bgColor }}
                         >
                              <div className='full-line-1'></div>
                              <div className='full-line-2'></div>
                         </div>
                    </div>
               </div>

               <div className='remove-cover-section'>
                    <button onClick={() => onRemoveCover()}>Remove Cover</button>
               </div>
               <h5>Colors</h5>
               <div className='colors-container'>
                    {colors.map((color, index) => (
                         <div
                              className='cover-colors-section'
                              key={index}
                              style={{ backgroundColor: color }}
                              onClick={() => onColorClick(color)}
                         ></div>
                    ))}
               </div>
          </div>
     )
}
