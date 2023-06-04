import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'boardDB'
const BASE_URL = 'board/'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getDefaultFilter,
  demoUser,
  findTaskById,
  updateTask,
  getEmptyTask,
  addTask,
  addGroup,
}

_createBoards()

// TODO: add sortBy as 2nd parameter for query and support sorting
function query(filterBy = {}) {
  // TODO : add query params to address
  // return httpService.get(BASE_URL, filterBy)
  return storageService.query(STORAGE_KEY).then(boards => boards)
}
function getById(boardId) {
  console.log('entered get by id')
  // return httpService.get(BASE_URL + boardId)
  return storageService.get(STORAGE_KEY, boardId)
}
function remove(boardId) {
  return storageService.remove(STORAGE_KEY, boardId)
  // return httpService.delete(BASE_URL + boardId)
}
function save(board) {
  const method = board._id ? 'put' : 'post'
  // return httpService[method](BASE_URL, board)
  return storageService[method](STORAGE_KEY, board)
}

//groups
async function addGroup(title, boardId) {
  const newGroup = {
    id: utilService.makeId(),
    title,
    tasks: [],
  }
  try {
    const board = await getById(boardId)
    board.groups.push(newGroup)
    return save(board)
  } catch (err) {
    console.log('could not add group', err)
  }
}
//tasks
function getEmptyTask() {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    title: '',
    style: {
      backgroundColor: null,
      backgroundImage: {
        title: null,
        url: null,
      },
    },
    description: '',
    dueDate: null,
    isDone: false,
    archiveAt: null,
    byMember: {
      _id: 'u101',
      fullname: 'demo user',
      username: 'abi@ababmi.com',
      password: 'aBambi123',
      imgUrl: 'http://some-img.jpg',
    },
    checklists: [],
    labelIds: [],
    members: [],
    attachments: [],
    comments: [],
  }
}

async function updateTask(taskToUpdate, boardId, groupId) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(
      currTask => currTask.id === taskToUpdate.id
    )
    // const updatedTask = { ...currTask, ...task }
    board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToUpdate)
    return save(board)
  } catch (err) {
    console.log('could not update task', err)
  }
}

async function addTask(newTask, boardId, groupId) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    board.groups[groupIdx].tasks.push(newTask)
    return save(board)
  } catch (err) {
    console.log('could not update task', err)
  }
}

function getEmptyBoard() {
  return {
    name: '',
    price: '',
    inStock: true,
    labels: [],
  }
}

function getDefaultFilter() {
  return { txt: '', labels: [], sortBy: '', sortOrder: '' }
}
// demo user to display in header
function demoUser() {
  const user = {
    _id: 'u101',
    fullname: 'Abi Abambi',
    username: 'abi@ababmi.com',
    password: 'aBambi123',
    imgUrl: 'http://some-img.jpg',
  }

  const name = user.fullname
  const initials = name.substring(0, 2).toUpperCase()

  return initials
}

function findTaskById(taskId) {
  return storageService.query(STORAGE_KEY).then(boards => {
    for (const board of boards) {
      for (const group of board.groups) {
        const task = group.tasks.find(task => task.id === taskId)
        if (task) {
          return task
        }
      }
    }
    return null // Task not found
  })
}

function _createBoards() {
  let boards = utilService.loadFromStorage(STORAGE_KEY)
  if (!boards || !boards.length) {
    boards = [
      {
        _id: 't101',
        title: 'Boardman',
        isStarred: false,
        createdBy: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        style: {
          backgroundImage:
            'https://images.unsplash.com/photo-1682685795557-976f03aca7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
          color: '',
          backgroundColor: '#FFB6C1',
        },
        members: [
          {
            _id: 'u101',
            fullname: 'Adam',
            imgUrl: 'http://https://robohash.org/adam',
          },
          {
            _id: 'u102',
            fullname: 'Shaul',
            imgUrl: 'http://https://robohash.org/shaul',
          },
          {
            _id: 'u103',
            fullname: 'Dor',
            imgUrl: 'http://https://robohash.org/dor',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Group 1',
            archivedAt: 1589983468418,
            tasks: [
              {
                id: 'c341341101',
                title: 'Replace logo',
                desc: '',
                imgAttachment: '',
              },
              {
                id: 'c1151502',
                title: 'Add Samples',
                desc: '',
                imgAttachment: '',
              },
            ],

            style: {
              backgroundColor: 'yellow',
            },
          },
          {
            id: 'g102',
            title: 'Group 2',
            archivedAt: 1589983468418,
            tasks: [
              {
                id: 'c1678401',
                title: 'Replace logo',
                desc: '',
                imgAttachment: '',
              },
              {
                id: 'c102274572',
                title: 'Add Samples',
                desc: '',
                imgAttachment: '',
              },
            ],

            style: {
              backgroundColor: 'yellow',
            },
          },
          {
            id: 'g103',
            title: 'Group 3',
            archivedAt: 1589983468418,
            tasks: [
              {
                id: 'c1346301',
                title: 'Replace logo',
                desc: '',
                imgAttachment: '',
              },
              {
                id: 'c12341502',
                title: 'Add Samples',
                desc: '',
                imgAttachment: '',
              },
            ],

            style: {
              backgroundColor: 'yellow',
            },
          },
        ],

        labels: [
          {
            id: 'l101',
            title: 'Done',
            color: '#61bd4f',
          },
          {
            id: 'l102',
            title: 'Progress',
            color: '#61bd33',
          },
        ],
      },
      {
        _id: 't102',
        title: 'Board 2',
        isStarred: true,
        createdBy: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        style: {
          backgroundImage:
            'https://images.unsplash.com/photo-1680287327539-9467451a8b81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          color: '',
          backgroundColor: '#ADD8E6',
        },
        members: [
          {
            _id: 'u101',
            fullname: 'Adam',
            imgUrl: 'http://https://robohash.org/adam',
          },
          {
            _id: 'u102',
            fullname: 'Shaul',
            imgUrl: 'http://https://robohash.org/shaul',
          },
          {
            _id: 'u103',
            fullname: 'Dor',
            imgUrl: 'http://https://robohash.org/dor',
          },
        ],
        groups: [
          {
            id: 'g104',
            title: 'Group 1',
            archivedAt: 1589983468418,
            tasks: [
              {
                id: 'c1032135',
                title: 'Replace logo',
                desc: '',
                imgAttachment: '',
              },
              {
                id: 'c1141404',
                title: 'Add Samples',
                desc: '',
                imgAttachment: '',
              },
            ],
            style: {
              backgroundColor: 'lightgray',
            },
          },
        ],

        labels: [
          {
            id: 'l101',
            title: 'Done',
            color: '#61bd4f',
          },
          {
            id: 'l102',
            title: 'Progress',
            color: '#61bd33',
          },
        ],
      },
      {
        _id: 't103',
        title: 'Board to mess with',
        isStarred: false,
        createdBy: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        style: {
          backgroundImage: '',
          color: '',
          backgroundColor: '#E0BBE4',
        },
        members: [
          {
            _id: 'u101',
            fullname: 'Adam',
            imgUrl: 'http://https://robohash.org/adam',
          },
          {
            _id: 'u102',
            fullname: 'Shaul',
            imgUrl: 'http://https://robohash.org/shaul',
          },
          {
            _id: 'u103',
            fullname: 'Dor',
            imgUrl: 'http://https://robohash.org/dor',
          },
        ],
        groups: [
          {
            id: 'g105',
            title: 'Group 1',
            archivedAt: 1589983468418,
            tasks: [
              {
                id: 'c1015125',
                title: 'Replace logo',
                desc: '',
                imgAttachment: '',
              },
              {
                id: 'c102863',
                title: 'Add Samples',
                desc: '',
                imgAttachment: '',
              },
            ],
            style: {
              backgroundColor: 'red',
            },
          },
        ],

        labels: [
          {
            id: 'l101',
            title: 'Done',
            color: '#61bd4f',
          },
          {
            id: 'l102',
            title: 'Progress',
            color: '#61bd33',
          },
        ],
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, boards)
  }
}
