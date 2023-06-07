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
  findLabelStyleById,
  findGroupById,
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
    description: '',
    dueDate: null,
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

function findLabelStyleById(labelId, board) {
  // const labels = board.labels
  const currLabel = board.labels.find(label => label.id === labelId)
  return currLabel
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

function findGroupById(groupId, board) {
  const currGroup = board.groups.find(group => group.id === groupId)
  const groupTitle = currGroup.title
  return groupTitle
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
            fullname: 'Adam Gertzkin',
            imgUrl: 'https://robohash.org/adam',
          },
          {
            _id: 'u102',
            fullname: 'Shaul Rosenberg',
            imgUrl: 'https://robohash.org/shaul',
          },
          {
            _id: 'u103',
            fullname: 'Dor Cohen',
            imgUrl: 'https://robohash.org/dor',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Product Development',
            tasks: [
              {
                id: 't101',
                title: 'Feature brainstorming',
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
                description: 'life is good',
                comments: ['bla', 'no'],
                attachments: [],
                checklists: [
                  {
                    id: 'YEhmF',
                    title: 'Checklist',
                    todos: [
                      {
                        id: '212jX',
                        title: 'To Do 1',
                        isDone: true,
                      },
                    ],
                  },
                ],
                memberIds: ['u101'],
              },
              {
                id: 't102',
                title: 'Market analysis',
                style: {
                  backgroundColor: '#9370DB',
                },
                attachments: [],
                description: 'life is good',
                comments: ['bla', 'no'],
                attachments: [{ bla: 'an attachment' }],
              },
              {
                id: 't103',
                title: 'Prototyping',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
              },
              {
                id: 't104',
                title: 'User testing',
                attachments: [],
                style: {
                  backgroundColor: '#6A5ACD',
                },
              },
            ],
          },
          {
            id: 'g102',
            title: 'Marketing',
            tasks: [
              {
                id: 't201',
                title: 'Social media planning',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1496284427489-f59461d8a8e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
              },
              {
                id: 't202',
                title: 'Brand strategy',
                attachments: [],
                style: {
                  backgroundColor: '#FFD700',
                },

                labelIds: ['l105', 'l107'],
                description: 'life is good',
                comments: ['bla', 'no'],
                attachments: [{ bla: 'an attachment' }],
              },
              {
                id: 't203',
                title: 'Press release creation',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
                },
              },
            ],
          },
          {
            id: 'g103',
            title: 'Sales',
            tasks: [
              {
                id: 't301',
                title: 'Prospecting',
                attachments: [],
                style: {
                  backgroundColor: '#FF4500',
                },
                description: 'life is good',
                comments: ['bla', 'no'],
                attachments: [{ bla: 'an attachment' }],
              },
              {
                id: 't302',
                title: 'Client meetings',
                attachments: [],
                dueDate: null,
                checklists: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
              },
              {
                id: 't303',
                title: 'Sales strategy planning',
                attachments: [],
                style: {
                  backgroundColor: '#DC143C',
                },
                labelIds: ['l108', 'l102'],
                description: 'life is good',

                attachments: [{ bla: 'an attachment' }],
              },
            ],
          },
          {
            id: 'g104',
            title: 'Human Resources',
            tasks: [
              {
                id: 't401',
                title: 'Interview coordination',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
                },
              },
              {
                id: 't402',
                title: 'Employee onboarding',
                attachments: [],
                style: {
                  backgroundColor: '#228B22',
                },
                labelIds: ['l107', 'l105', 'l103'],
                description: 'life is good',
                comments: ['bla', 'no'],
                attachments: [{ bla: 'an attachment' }, { fsdaf: 'bibibib' }],
              },
              {
                id: 't403',
                title: 'Team building activities',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg',
                },
                labelIds: ['l104', 'l106'],
              },
              {
                id: 't404',
                title: 'Policy updates',
                attachments: [],
                style: {
                  backgroundColor: '#7B68EE',
                },
              },
            ],
          },

          {
            id: 'g105',
            title: 'Operations',
            tasks: [
              {
                id: 't501',
                title: 'Inventory check',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
                },
                labelIds: ['l101', 'l102', 'l103'],
              },
              {
                id: 't502',
                title: 'Maintenance scheduling',
                attachments: [],
                style: {
                  backgroundColor: '#8B4513',
                },
              },
              {
                id: 't503',
                title: 'Vendor negotiation',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
                labelIds: ['l105', 'l107', 'l108'],
              },
            ],
          },
        ],
        activities: [
          {
            id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
              _id: 'u101',
              fullname: 'Abi Abambi',
              imgUrl: 'http://some-img',
            },
            task: {
              id: 'c101',
              title: 'Replace Logo',
            },
          },
        ],

        labels: [
          {
            id: 'l101',
            title: 'Done',
            color: '#FFB6C1',
          },
          {
            id: 'l102',
            title: 'Progress',
            color: '#579DFF',
          },
          {
            id: 'l103',
            title: 'High Priority',
            color: '#AE4787',
          },
          {
            id: 'l104',
            title: 'Low Priority',
            color: '#F87462',
          },
          {
            id: 'l105',
            title: 'Review Needed',
            color: '#9F8FEF',
          },
          {
            id: 'l106',
            title: 'Bug',
            color: '#0C66E4',
          },
          {
            id: 'l107',
            title: 'Improvement',
            color: '#E2B203',
          },
          {
            id: 'l108',
            title: 'New Feature',
            color: '#4BCE97',
          },
        ],
      },
      {
        _id: 't102',
        title: 'Board Leader',
        isStarred: false,
        createdBy: {
          _id: 'u104',
          fullname: 'John Doe',
          imgUrl: 'http://another-img-url',
        },
        style: {
          backgroundImage:
            'https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
          color: '',
          backgroundColor: '#ADFF2F',
        },
        members: [
          {
            _id: 'u104',
            attachments: [],
            fullname: 'Steve',
            imgUrl: 'http://https://robohash.org/steve',
          },
          {
            _id: 'u105',
            fullname: 'Jennifer',
            imgUrl: 'http://https://robohash.org/jennifer',
          },
          {
            _id: 'u106',
            fullname: 'David',
            imgUrl: 'http://https://robohash.org/david',
          },
        ],
        groups: [
          {
            id: 'g201',
            title: 'Product Planning',
            tasks: [
              {
                id: 't101',
                title: 'Product Ideation',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
                description: 'brainstorm new product ideas',
                comments: ['I think...', 'Perhaps we could...'],
                attachments: [
                  {
                    name: 'Brainstorming Notes',
                    link: 'http://some-link-to-document',
                  },
                ],
              },
              {
                id: 't102',
                title: 'Market Research',
                attachments: [],
                style: {
                  backgroundColor: '#9370DB',
                },
              },
              {
                id: 't103',
                title: 'Prototyping',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
                description: 'brainstorm new product ideas',
                comments: ['I think...', 'Perhaps we could...'],
                attachments: [
                  {
                    name: 'Brainstorming Notes',
                  },
                ],
              },
              {
                id: 't104',
                title: 'User testing',
                attachments: [],
                attachments: [],
                style: {
                  backgroundColor: '#6A5ACD',
                },
                description: 'brainstorm new product ideas',
                comments: ['I think...', 'Perhaps we could...'],
              },
            ],
          },
          {
            id: 'g202',
            title: 'Marketing Strategy',
            tasks: [
              {
                id: 't201',
                title: 'Product Launch Planning',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1496284427489-f59461d8a8e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
              },
              {
                id: 't202',
                title: 'Brand Development',
                attachments: [],
                style: {
                  backgroundColor: '#FFD700',
                },
                labelIds: ['l105', 'l107'],
              },
              {
                id: 't203',
                title: 'Advertisement Design',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
                },
              },
            ],
          },
          {
            id: 'g203',
            title: 'Sales Department',
            tasks: [
              {
                id: 't301',
                title: 'Sales Training',
                attachments: [],
                style: {
                  backgroundColor: '#FF4500',
                },
              },
              {
                id: 't302',
                title: 'Lead Generation',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
              },
              {
                id: 't303',
                title: 'Customer Relations',
                attachments: [],
                style: {
                  backgroundColor: '#DC143C',
                },
                labelIds: ['l108', 'l102'],
              },
            ],
          },
          {
            id: 'g204',
            title: 'Customer Support',
            tasks: [
              {
                id: 't401',
                title: 'Technical Support',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
                },
              },
              {
                id: 't402',
                title: 'Customer Service Training',
                attachments: [],
                style: {
                  backgroundColor: '#228B22',
                },
                labelIds: ['l107', 'l105', 'l103'],
              },
              {
                id: 't403',
                title: 'Customer Satisfaction Survey',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg',
                },
                labelIds: ['l104', 'l106'],
              },
              {
                id: 't404',
                title: 'FAQs Update',
                style: {
                  backgroundColor: '#7B68EE',
                },
              },
            ],
          },
        ],
        activities: [
          {
            id: 'a201',
            txt: 'Changed Background',
            createdAt: 158210,
            byMember: {
              _id: 'u104',
              fullname: 'John Doe',
              imgUrl: 'http://another-img-url',
            },
            task: {
              id: 'c102',
              title: 'Update Product Design',
            },
          },
        ],
        labels: [
          {
            id: 'l201',
            title: 'Started',
            color: '#8FBC8F',
          },
          {
            id: 'l202',
            title: 'In Progress',
            color: '#CD5C5C',
          },
          {
            id: 'l203',
            title: 'Stalled',
            color: '#8B4513',
          },
          {
            id: 'l204',
            title: 'Completed',
            color: '#2E8B57',
          },
        ],
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, boards)
  }
}
