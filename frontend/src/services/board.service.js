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
     updateTask
}

_createBoards()

// TODO: add sortBy as 2nd parameter for query and support sorting
function query(filterBy = {}) {
     // TODO : add query params to address
     // return httpService.get(BASE_URL, filterBy)
     return storageService.query(STORAGE_KEY).then((boards) => boards)
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

async function updateTask(taskToUpdate, boardId, groupId) {
     try {
          const board = await getById(boardId)
          const groupIdx = board.groups.findIndex(group => group.id === groupId)
          const taskIdx = board.groups[groupIdx].tasks.findIndex(currTask => currTask.id === taskToUpdate.id)
          // const updatedTask = { ...currTask, ...task }
          board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToUpdate)
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
     return storageService.query(STORAGE_KEY).then((boards) => {
          for (const board of boards) {
               for (const group of board.groups) {
                    const task = group.tasks.find((task) => task.id === taskId)
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
                         backgroundImage: '',
                         color: '',
                         backgroundColor: 'red',
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
                                        id: 'c101',
                                        title: 'Replace logo',
                                        desc: '',
                                   },
                                   {
                                        id: 'c102',
                                        title: 'Add Samples',
                                        desc: '',
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
                                        id: 'c101',
                                        title: 'Replace logo',
                                        desc: '',
                                   },
                                   {
                                        id: 'c102',
                                        title: 'Add Samples',
                                        desc: '',
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
                                        id: 'c101',
                                        title: 'Replace logo',
                                        desc: '',
                                   },
                                   {
                                        id: 'c102',
                                        title: 'Add Samples',
                                        desc: '',
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
                         backgroundImage: '',
                         color: '',
                         backgroundColor: 'blue',
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
                                        id: 'c103',
                                        title: 'Replace logo',
                                        desc: '',
                                   },
                                   {
                                        id: 'c104',
                                        title: 'Add Samples',
                                        desc: '',
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
                    title: 'Board 3',
                    isStarred: false,
                    createdBy: {
                         _id: 'u101',
                         fullname: 'Abi Abambi',
                         imgUrl: 'http://some-img',
                    },
                    style: {
                         backgroundImage: '',
                         color: '',
                         backgroundColor: 'yellow',
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
                                        id: 'c101',
                                        title: 'Replace logo',
                                        desc: '',
                                   },
                                   {
                                        id: 'c102',
                                        title: 'Add Samples',
                                        desc: '',
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
