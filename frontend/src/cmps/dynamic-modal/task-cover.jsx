import { useEffect } from 'react'
import { updateTask } from '../../store/board.actions'
import { useParams } from 'react-router-dom'

export function CoverContent({ task }) {
     const { taskId, boardId, groupId } = useParams();
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
     ];

     useEffect(() => {
          console.log('from cover content', task);
     }, []);

     const onColorClick = async (color) => {
          const updatedTask = { ...task, style: { ...task.style, backgroundColor: color } };
          await updateTask(updatedTask, boardId, groupId);
          console.log('updatedTask', updatedTask);
     };

     return (
          <div className='task-cover-section'>
               <h5>Size</h5>
               <div></div>
               <div></div>
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
     );
}