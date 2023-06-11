// WORKSPACE
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BoardList } from '../cmps/board-list.jsx'
import { DynamicActionModal } from '../cmps/dynamic-modal/dynamic-action-modal.jsx'
import { AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai'
import { Loader } from '../cmps/loader.jsx'


export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { isLoading } = useSelector(storeState => storeState.systemModule)
    const [modalEvent, setModalEvent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        loadBoards()
    }, [])


    // this function should open the dynamic modal, and dynamic modal
    // will handle the content for adding a board
    function onAddBoard(event) {
        setModalEvent(event)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    async function onUpdateBoard(board) {
        try {
            const savedBoard = await updateBoard(board)
            showSuccessMsg(`Board updated`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }


    // if (!boards) return <Loader />
    return (
        <section className='workspace-container'>
            <main>
                <div className="header-with-icon">
                    <AiOutlineStar className="header-icon star-icon" />
                    <h2>Starred boards</h2>
                </div>

                <BoardList
                    boards={boards.filter(board => board.isStarred)}
                    onUpdateBoard={onUpdateBoard}
                />

                <div className='header-with-icon'>
                    <AiOutlineClockCircle className="header-icon recent-icon" />
                    <h2>Recently viewed</h2>
                </div>

                <BoardList
                    boards={boards}
                    onUpdateBoard={onUpdateBoard}
                    onAddBoard={onAddBoard}
                    includeAdd={true}
                />
            </main>
            {isModalOpen &&
                <DynamicActionModal
                    cmpType='createBoard'
                    modalTitle='Create board'
                    event={modalEvent}
                    isDetails={false}
                    onCloseModal={closeModal}
                    onAddBoard={onAddBoard}
                />}
        </section>
    )
}