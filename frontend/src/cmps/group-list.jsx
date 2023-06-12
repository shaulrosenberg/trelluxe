import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addGroup, updateBoard } from '../store/board.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { utilService } from '../services/util.service.js'
import { GroupPreview } from './group-preview.jsx'

//icons
import { GrClose } from 'react-icons/gr'
import { FaPlus } from "react-icons/fa"


export function GroupList({ board, groups, boardId }) {
    const [isAddGroupOpen, setIsGroupOpen] = useState(false)
    const [groupTitle, setGroupTitle] = useState('')

    const dispatch = useDispatch()

    const handleDragEnd = (result) => {

        if (!result.destination) {
            return // Item was dropped outside a valid droppable area
        }
        if (result.type === 'GROUP') {
            handleDragGroup(result)
        }
        if (result.type === 'TASK') {
            handleDragTask(result)
        }
    }

    const handleDragTask = (result) => {
        const sourceGroupId = result.source.droppableId
        const destinationGroupId = result.destination.droppableId
        const sourceGroup = { ...toGroup(sourceGroupId) }

        if (sourceGroupId !== destinationGroupId) {
            const destinationGroup = { ...toGroup(destinationGroupId) }

            handleMoveDifferentTaskList(
                sourceGroup,
                destinationGroup,
                result.source.index,
                result.destination.index
            )
            return
        }
        handleMoveSameTaskList(
            sourceGroup,
            result.source.index,
            result.destination.index
        )
    }

    const handleDragGroup = async (result) => {
        const { source, destination } = result
        // Check if board.groups is an array
        if (!Array.isArray(board.groups)) {
            return // Handle the error or return early
        }

        // Reorder the groups based on the drag and drop result
        const updatedGroups = [...board.groups]
        utilService.reorder(updatedGroups, source.index, destination.index)

        // Create an updated board object with the reordered groups


        const updatedBoard = {
            ...board,
            groups: updatedGroups,
        }

        // optimistic rendering
        dispatch({type: 'UPDATE_BOARD', board: updatedBoard})
        dispatch({ type: 'SET_SELECTED_BOARD', board: updatedBoard })

        // Dispatch the UpdateBoard action to update the state in Redux
        await updateBoard(updatedBoard)
    }

    const toGroup = (groupId) => {
        const group = board.groups.find((group) => group.id === groupId)
        return group
    }

    const handleMoveSameTaskList = async (group, sourceIndex, destinationIndex) => {
        utilService.reorder(group.tasks, sourceIndex, destinationIndex)
        const updatedGroups = board.groups.map((g) => {
            if (g.id === group.id) {
                return group
            }
            return g
        })

        const updatedBoard = {
            ...board,
            groups: updatedGroups,
        }

        await updateBoard(updatedBoard)
    }

    const handleMoveDifferentTaskList = async (
        sourceGroup,
        destinationGroup,
        sourceIndex,
        destinationIndex
    ) => {
        const [removed] = sourceGroup.tasks.splice(sourceIndex, 1)
        destinationGroup.tasks.splice(destinationIndex, 0, removed)
        // current Group id, current index remove, add to destination group
        const updatedGroups = board.groups.map((g) => {
            if (g.id === sourceGroup.id) {
                return sourceGroup
            }
            if (g.id === destinationGroup.id) {
                return destinationGroup
            }
            return g
        })
        const updatedBoard = {
            ...board,
            groups: updatedGroups,
        }

        await updateBoard(updatedBoard)
        return
    }


    async function onAddGroup(ev) {
        ev.preventDefault()
        if (!groupTitle) return
        try {
            const newGroup = await addGroup(groupTitle, boardId)
            setGroupTitle('')
            showSuccessMsg(`Task added (id: ${newGroup.id})`)
        } catch (err) {
            showErrorMsg('Cannot add group')
        }
    }
    return (
        <section className="group-list-container">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="groups" direction="horizontal" type="GROUP">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ display: "flex" }} // so the groups aren't stacked
                        >
                            {groups.map((group, index) =>
                                <Draggable key={group.id} draggableId={group.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <GroupPreview board={board} group={group} />
                                        </div>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </DragDropContext>
            {isAddGroupOpen ? (
                <div className='add-group'>
                    <input
                        autoFocus
                        placeholder="Enter list title..."
                        onChange={ev => setGroupTitle(ev.target.value)}
                        value={groupTitle}
                    ></input>
                    <div className="add-new-list flex align-center">
                        <button onClick={onAddGroup}>
                            Add list
                        </button>
                        <button
                            onClick={() => {
                                setIsGroupOpen(false)
                            }}
                        >
                            <GrClose />
                        </button>
                    </div>
                </div>
            ) : (
                <div className='add-group-btn' onClick={() => { setIsGroupOpen(true) }}>
                    <FaPlus className="icon-add-group" />
                    <p>Add another list</p>
                </div>
            )
            }
        </section>
    )
}