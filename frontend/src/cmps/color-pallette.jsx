import { useState } from 'react'
import { boardService } from '../services/board.service'
export function ColorPalette({ selectedLabel, setSelectedLabel }) {
   const colorsArr = boardService.getAppColors()
   const [chosenColor, setChosenColor] = useState(selectedLabel.color)

   return (
      <div className='color-palette'>
         <div className='color-grid'>
            {colorsArr.map((colorObj, index) => {
               const colorKey = Object.keys(colorObj)[0]
               const { style } = colorObj[colorKey]

               const colorHex = style.backgroundColor

               return (
                  <div
                     className={`color-cell ${
                        chosenColor === colorHex ? 'chosen-color' : ''
                     }`}
                     key={colorHex}
                     onClick={() => {
                        setChosenColor(colorHex)
                        setSelectedLabel({ ...selectedLabel, color: colorHex })
                     }}
                     title={colorKey.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  >
                     <div className='color-box' style={style}></div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
