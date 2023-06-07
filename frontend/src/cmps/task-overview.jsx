import { FiPlus } from 'react-icons/fi'
import { boardService } from '../services/board.service'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
export function TaskOverview({ task, groupId, boardId }) {
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

    const taskMembers = boardService.getTaskMembers(board.members, task.memberIds)



    return (

        <section className="task-overview">
            {/* TODO: finish when user support is implemented */}
            {/* <button className='subscribe-btn'>
                <div className="svg-icon"><AiOutlineEye /></div>
                <div className="btn-txt">Watch</div>
            </button> */}

            {taskMembers &&

                <>
                    <h3>Members</h3>
                    <ul className='clean-list'>
                        {taskMembers.map(taskMember => <li key={taskMember._id}>

                            <img src={taskMember.imgUrl} alt="" />

                        </li>)}

                        <li key="" className='' >
                            <FiPlus />
                        </li>
                    </ul>
                </>


            }


        </section>

    )
}