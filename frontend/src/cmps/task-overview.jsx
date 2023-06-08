import { FiPlus } from 'react-icons/fi'
import { boardService } from '../services/board.service'
import { useSelector } from 'react-redux'
import { DynamicActionModal } from './dynamic-modal/dynamic-action-modal'
import { useEffect, useRef, useState } from 'react'
export function TaskOverview({ task, groupId, boardId }) {

    const [modalType, setModalType] = useState(null)
    const eventRef = useRef()

    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

    const taskMembers = boardService.getTaskMembers(board.members, task.memberIds)

    const taskLabels = boardService.getTaskLabels(board.labels, task.labelIds)

    function onToggleModal(ev, type) {
        eventRef.current = ev
        switch (type) {
            case 'members':
                setModalType('members')
                break;
            case 'labels':
                setModalType('labels')
                break;

            default:
                break;
        }

    }

    function onCloseModal() {
        setModalType(null)
    }

    return (

        <section className="task-overview">
            {/* TODO: finish when user support is implemented */}
            {/* <button className='subscribe-btn'>
                <div className="svg-icon"><AiOutlineEye /></div>
                <div className="btn-txt">Watch</div>
            </button> */}

            {taskMembers &&

                <>
                    {/* Members overview */}
                    <div className="task-members-container">
                        <h4>Members</h4>
                        <ul className='clean-list task-members-list'>
                            {taskMembers.map(taskMember => <li className='task-member-icon' key={taskMember._id}>

                                <img src={taskMember.imgUrl} alt="" />

                            </li>)}

                            <li key="" className='' >
                                <button className='add-member-btn' onClick={(ev) => onToggleModal(ev, 'members')}><FiPlus /></button>
                            </li>
                        </ul>
                    </div>

                    {/* Labels overview */}
                    {taskLabels && <>

                        <div className="task-labels-container">
                            <h4>Labels</h4>
                            <ul className='clean-list task-labels-list'>
                                {taskLabels.map(taskLabel => <li className='task-label-button' onClick={(ev) => onToggleModal(ev, 'labels')} key={taskLabel.id}
                                    style={{ backgroundColor: taskLabel.color }}
                                >{taskLabel.title}</li>)}
                            </ul>
                        </div>

                    </>}




                    {/* Dynamic modal    */}
                    {modalType && <DynamicActionModal
                        cmpType={modalType}
                        event={eventRef.current}
                        task={task}
                        groupId={groupId}
                        boardId={boardId}
                        onCloseModal={onCloseModal}
                    />}


                </>


            }


        </section>

    )
}