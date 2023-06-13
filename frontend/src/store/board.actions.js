import { boardService } from '../services/board.service.js'
// import { boardService } from "../services/board.service.js";
import { userService } from '../services/user.service.js'
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
  ADD_BOARD,
  REMOVE_BOARD,
  SET_BOARDS,
  SET_SELECTED_BOARD,
  UNDO_REMOVE_BOARD,
  UPDATE_BOARD,
  TOGGLE_LABEL,
} from './board.reducer.js'
import { SET_SCORE } from './user.reducer.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  }
}

export function getActionAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  }
}
export function getActionUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  }
}

export async function loadBoards() {
  try {
    const boards = await boardService.query()
    console.log('Boards from DB:', boards)
    store.dispatch({
      type: SET_BOARDS,
      boards,
    })
  } catch (err) {
    console.log('Cannot load boards', err)
    throw err
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId)
    store.dispatch(getActionRemoveBoard(boardId))
  } catch (err) {
    console.log('Cannot remove board', err)
    throw err
  }
}

export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    console.log('Added Board', savedBoard)
    store.dispatch(getActionAddBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log('Cannot add board', err)
    throw err
  }
}
//groups
export async function addGroup(groupTitle, boardId) {
  try {
    const updatedBoard = await boardService.addGroup(groupTitle, boardId)
    store.dispatch(getActionUpdateBoard(updatedBoard))
    store.dispatch({ type: SET_SELECTED_BOARD, board: updatedBoard })
  } catch (err) {
    console.log('failed to add group', err)
    throw err
  }
}

//tasks
export async function updateTask(task, boardId, groupId, activityTxt) {
  try {
    console.log(task)
    const updatedBoard = await boardService.updateTask(
      task,
      boardId,
      groupId,
      activityTxt
    )
    store.dispatch(getActionUpdateBoard(updatedBoard))
    store.dispatch({ type: SET_SELECTED_BOARD, board: updatedBoard })
    // TODO: add broadcast('board-update') ->  emit(change-board) client side -> server side listens to board-changes,
    // and emits board-update to all connections except for the one who already has the updated version of the board(broadcast)
    return updatedBoard
  } catch (err) {
    console.log('failed to update task', err)
    throw new Error(err)
  }
}

export function toggleLabels() {
  store.dispatch({ type: TOGGLE_LABEL })
}

export async function addTask(task, boardId, groupId) {
  try {
    const updatedBoard = await boardService.addTask(task, boardId, groupId)
    store.dispatch(getActionUpdateBoard(updatedBoard))
    store.dispatch({ type: SET_SELECTED_BOARD, board: updatedBoard })
    return updatedBoard
  } catch (err) {
    console.log('failed to add task', err)
    throw err
  }
}

export async function removeTask(taskId, groupId, boardId) {
  try {
    let savedBoard = await boardService.removeTask(taskId, groupId, boardId)
    await updateBoard(savedBoard)
    return taskId
  } catch (err) {
    console.log('Cannot remove task', err)
    throw err
  }
}

// TODO: make a filtering function that will not save the filtered board and overwrite the original board
// it should only effec the selectedBoard global state.
export function updateBoard(board, activityTxt) {
  boardService.addActivity(activityTxt, null, board, null, null)
  return boardService
    .save(board)
    .then(savedBoard => {
      console.log('Updated Board:', savedBoard)
      store.dispatch(getActionUpdateBoard(savedBoard))
      store.dispatch({ type: SET_SELECTED_BOARD, board: savedBoard })
      return savedBoard
    })
    .catch(err => {
      console.log('Cannot save board', err)
      throw err
    })
}

export function filterBoard(board) {
  // write this
  store.dispatch({ type: SET_SELECTED_BOARD, board: board })
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
  store.dispatch({
    type: REMOVE_BOARD,
    boardId,
  })
  showSuccessMsg('Board removed')

  boardService
    .remove(boardId)
    .then(() => {
      console.log('Server Reported - Deleted Successfully')
    })
    .catch(err => {
      showErrorMsg('Cannot remove board')
      console.log('Cannot load boards', err)
      store.dispatch({
        type: UNDO_REMOVE_BOARD,
      })
    })
}

//selectedBoard
export function setSelectedBoard(board) {
  return store.dispatch({ type: SET_SELECTED_BOARD, board })
}
