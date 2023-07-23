export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const UPDATE_TASK = 'UPDATE_TASK'
export const SET_SELECTED_BOARD = 'SET_SELECTED_BOARD'
export const TOGGLE_LABEL = 'TOGGLE_LABEL'
export const SAVE_UNFILTER_BOARD = 'SAVE_UNFILTER_BOARD'

const initialState = {
  selectedBoard: null,
  boards: null,
  lastRemovedBoard: null,
  isLabelExpand: false,
  boardBeforeFilter: null,
}

export function boardReducer(state = initialState, action) {
  var newState = state
  var boards

  switch (action.type) {
    case SET_BOARDS:
      newState = { ...state, boards: action.boards }
      break
    case SET_SELECTED_BOARD:
      newState = { ...state, selectedBoard: action.board }
      break
    case REMOVE_BOARD:
      const lastRemovedBoard = state.boards.find(
        board => board._id === action.boardId
      )
      boards = state.boards.filter(board => board._id !== action.boardId)
      newState = { ...state, boards, lastRemovedBoard }
      break
    case ADD_BOARD:
      newState = { ...state, boards: [...state.boards, action.board] }
      break
    case UPDATE_BOARD:
      boards = state.boards?.map(board =>
        board._id === action.board._id ? action.board : board
      )
      newState = { ...state, boards }
      break
    case UNDO_REMOVE_BOARD:
      if (state.lastRemovedBoard) {
        newState = {
          ...state,
          boards: [...state.boards, state.lastRemovedBoard],
          lastRemovedBoard: null,
        }
      }
      break
    case TOGGLE_LABEL:
      newState = { ...state, isLabelExpand: !state.isLabelExpand }
      break
      case SAVE_UNFILTER_BOARD:
        console.log('action.board', action.board)
        newState = {...state, boardBeforeFilter: action.board}
        break
    default:
    
      return state
  }
  return newState
}
