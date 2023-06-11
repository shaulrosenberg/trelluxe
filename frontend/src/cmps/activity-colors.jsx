import { useSelector } from 'react-redux'
import { updateBoard } from '../store/board.actions'

export function ActivityColors() {
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )

   const pastelColors = [
      '#529ADA',
      '#0B52B5',
      '#3C3A79',
      '#AA68C0',
      '#EA6537',
      '#EF7492',
      '#349980',
      '#354664',
      '#672912',
      '#CD5A91',
   ]

   function onColorClick(color) {
      console.log('board', board)
      const updatedBoard = {
         ...board,
         style: { backgroundColor: color, color: color},
      }

      updateBoard(updatedBoard)
   }

   return (
      <section className='activity-colors-main'>
         <h2>Colors</h2>
         <section className='activity-main-colors-container'>
            {pastelColors.map((color) => (
               <div
                  className='activity-colors-container cursor-pointer'
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorClick(color)}
               >
                  <span
                     role='img'
                     aria-label='emoji'
                     style={{ color: 'white' }}
                     className='activity-emoji'
                  >
                     {getEmojiForColor(color)}
                  </span>
               </div>
            ))}
         </section>
      </section>
   )
}

// Function to get an emoji based on color
function getEmojiForColor(color) {
   // Map color to corresponding emoji
   const emojiMap = {
      '#529ADA': '🌊',
      '#0B52B5': '🌙',
      '#3C3A79': '🦉',
      '#AA68C0': '🌸',
      '#EA6537': '🔥',
      '#EF7492': '🎀',
      '#349980': '🍃',
      '#354664': '🐺',
      '#672912': '🌰',
      '#CD5A91': '🌷',
   }

   return emojiMap[color] || '❓'
}
