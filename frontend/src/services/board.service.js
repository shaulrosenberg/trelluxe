import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'

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
  getTaskMembers,
  getTaskLabels,
  getAppColors,
  getDueDateInfo,
  getDueDateTimeFormat,
  removeTask,
  addActivity,
  getTaskActivities,
}

// _createBoards()

// TODO: add sortBy as 2nd parameter for query and support sorting
function query(filterBy = {}) {
  // TODO : add query params to address
  return httpService.get(BASE_URL, filterBy)
  // return storageService.query(STORAGE_KEY).then(boards => boards)
}
function getById(boardId) {
  return httpService.get(BASE_URL + boardId)
  // return storageService.get(STORAGE_KEY, boardId)
}
function remove(boardId) {
  // return storageService.remove(STORAGE_KEY, boardId)
  return httpService.delete(BASE_URL + boardId)
}

async function save(board) {
  try {
    let updatedBoard
    if (board._id) {
      updatedBoard = await httpService.put(BASE_URL + board._id, board)
    } else {
      updatedBoard = await httpService.post(BASE_URL, board)
    }
    // turn off after users added
    socketService.emit('board-change', updatedBoard)
    return updatedBoard
  } catch (err) {
    console.error('Failed to save board:', err)
    throw err
  }
  // return storageService[method](STORAGE_KEY, board)
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

function getEmptyBoard(title, style) {
  const loggedUser = userService.getLoggedinUser()
  const board = {
    isStarred: false,
    title,
    createdAt: Date.now(),
    createdBy: loggedUser,
    style,
    archive: [],
    labels: [
      // green
      {
        id: 'l101',
        title: '',
        color: '#61bd4f',
      },
      // yellow
      {
        id: 'l102',
        title: '',
        color: '#f2d600',
      },
      // orange
      {
        id: 'l103',
        title: '',
        color: '#ff9f1a',
      },
      // red
      {
        id: 'l104',
        title: '',
        color: '#eb5a46',
      },
      // purple
      {
        id: 'l105',
        title: '',
        color: '#c377e0',
      },
      // blue
      {
        id: 'l106',
        title: '',
        color: '#0079bf',
      },
    ],
    members: [{ ...loggedUser }],
    groups: [],
    activities: [],
  }

  return board
}

async function updateTask(taskToUpdate, boardId, groupId, activityTxt = null) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(
      currTask => currTask.id === taskToUpdate.id
    )
    // const updatedTask = { ...currTask, ...task }
    board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToUpdate)
    if (activityTxt) {
      addActivity(activityTxt, taskToUpdate, board, null, null)
    }
    return save(board)
  } catch (err) {
    console.log('could not update task', err)
  }
}

async function removeTask(taskToRemoveId, groupId, boardId) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(
      currTask => currTask.id === taskToRemoveId
    )

    board.groups[groupIdx].tasks.splice(taskIdx, 1)
    return save(board)
  } catch (err) {
    console.log('could not remove task', err)
  }
}

async function addTask(newTask, boardId, groupId) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    board.groups[groupIdx].tasks.push(newTask)
    addActivity(
      `added ${newTask.title}, to ${board.groups[groupIdx].title}`,
      null,
      board,
      null,
      demoUser()
    )
    return save(board)
  } catch (err) {
    console.log('could not update task', err)
  }
}

function getDefaultFilter() {
  return { txt: '', labels: [], sortBy: '', sortOrder: '' }
}
// demo user to display in header
function demoUser() {
  const user = {
    _id: 'u101',
    fullname: 'Guest user',
    username: 'abi@ababmi.com',
    password: 'aBambi123',
    imgUrl:
      'https://res.cloudinary.com/dp2xkwxbk/image/upload/v1686565215/trelux/Brad_Pitt_2019_by_Glenn_Francis_gfskaw.jpg',
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

async function findTaskById(taskId) {
  return await query().then(boards => {
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

function getTaskMembers(boardMembers, memberIds) {
  // This is a service for the front so understand it is only updated as long as the front is updated which we should insure by always working through the store which updates the back

  if (!memberIds?.length) return null

  return memberIds.reduce((result, taskId) => {
    const matchingMember = boardMembers.find(member => member._id === taskId)
    if (matchingMember) {
      result.push(matchingMember)
    }
    return result
  }, [])
}

function getTaskLabels(boardLabels, labelIds) {
  // This is a service for the front so understand it is only updated as long as the front is updated which we should insure by always working through the store which updates the back

  if (!labelIds?.length) return null

  return labelIds.reduce((result, taskId) => {
    const matchingLabel = boardLabels.find(label => label.id === taskId)
    if (matchingLabel) {
      result.push(matchingLabel)
    }
    return result
  }, [])
}

// labels
function getAppColors() {
  return [
    {
      subtleGreen: {
        style: {
          backgroundColor: '#BAF3DB',
        },
      },
    },
    {
      subtleYellow: {
        style: {
          backgroundColor: '#F8E6A1',
        },
      },
    },
    {
      subtleOrange: {
        style: {
          backgroundColor: '#FFE2BE',
        },
      },
    },
    {
      subtleRed: {
        style: {
          backgroundColor: '#FFD2CC',
        },
      },
    },
    {
      subtlePurple: {
        style: {
          backgroundColor: '#DFD8FD',
        },
      },
    },
    {
      green: {
        style: {
          backgroundColor: '#4BCE97',
        },
      },
    },
    {
      yellow: {
        style: {
          backgroundColor: '#E2B204',
        },
      },
    },
    {
      orange: {
        style: {
          backgroundColor: '#FAA53D',
        },
      },
    },
    {
      red: {
        style: {
          backgroundColor: '#F87462',
        },
      },
    },
    {
      purple: {
        style: {
          backgroundColor: '#A08FEF',
        },
      },
    },
    {
      boldGreen: {
        style: {
          backgroundColor: '#20845A',
        },
      },
    },
    {
      boldYellow: {
        style: {
          backgroundColor: '#956F00',
        },
      },
    },
    {
      boldOrange: {
        style: {
          backgroundColor: '#B75C01',
        },
      },
    },
    {
      boldPurple: {
        style: {
          backgroundColor: '#CA3520',
        },
      },
    },
    {
      subtleBlue: {
        style: {
          backgroundColor: '#6D5DC6',
        },
      },
    },
    {
      subtleBlue: {
        style: {
          backgroundColor: '#CCE0FF',
        },
      },
    },
    {
      subtleSky: {
        style: {
          backgroundColor: '#C1F0F5',
        },
      },
    },
    {
      subtleLime: {
        style: {
          backgroundColor: '#D3F1A7',
        },
      },
    },
    {
      subtlePink: {
        style: {
          backgroundColor: '#FDD0EC',
        },
      },
    },
    {
      subtleBlack: {
        style: {
          backgroundColor: '#DCDFE4',
        },
      },
    },
    {
      blue: {
        style: {
          backgroundColor: '#579EFF',
        },
      },
    },
    {
      sky: {
        style: {
          backgroundColor: '#60C6D2',
        },
      },
    },
    {
      lime: {
        style: {
          backgroundColor: '#94C749',
        },
      },
    },
    {
      pink: {
        style: {
          backgroundColor: '#E774BB',
        },
      },
    },
    {
      black: {
        style: {
          backgroundColor: '#8590A3',
        },
      },
    },
    {
      boldBlue: {
        style: {
          backgroundColor: '#0D66E4',
        },
      },
    },
    {
      boldSky: {
        style: {
          backgroundColor: '#1E7F8C',
        },
      },
    },
    {
      boldLime: {
        style: {
          backgroundColor: '#5B7F24',
        },
      },
    },
    {
      boldPink: {
        style: {
          backgroundColor: '#AE4787',
        },
      },
    },
    {
      boldBlack: {
        style: {
          backgroundColor: '#626F86',
        },
      },
    },
  ]
}

// filter function
function onFilterOptions() {}

// dueDate and date

function getDueDateTimeFormat(dueDate) {
  const currYear = new Date().getFullYear()
  const dueYear = new Date(dueDate).getFullYear()
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', {
    month: 'short',
  })} at `
  if (dueYear !== currYear) {
    strDate += `${dueYear} `
  }
  strDate += `${new Date(dueDate)
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLocaleUpperCase()}`
  return strDate
}

function getDueDateInfo(task) {
  if (!task) return null
  const twentyFourHoursMs = 24 * 60 * 60 * 1000

  if (task.isDone) {
    return {
      class: 'task-done',
      title: 'This card is complete',
      status: 'complete',
    }
  } else if (Date.now() > task.dueDate) {
    return {
      class: 'task-overdue',
      title: 'This card is past due',
      status: 'overdue',
    }
  } else if (task.dueDate - Date.now() < twentyFourHoursMs) {
    return {
      class: 'due-soon',
      title: 'This card is due in less than twenty-four hours.',
      status: 'due soon',
    }
  } else {
    return {
      class: 'due-later',
      title: 'This card is due later',
      status: '',
    }
  }
}

// activities

function addActivity(txt, task, board, comment, user) {
  const miniUser = user || userService.getLoggedinUser()
  console.log('miniUser', miniUser)
  const miniTask = task ? { id: task.id, title: task.title } : null

  const activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: miniUser,
    task: miniTask,
  }

  if (comment) activity.comment = comment

  if (board.activities) board.activities.unshift(activity)
  else board.activities = [activity]

  return board
}

function getTaskActivities(board, taskId) {
  if (!board.activities || !board.activities.length) return null
  return board.activities.filter(activity => {
    return activity.task?.id === taskId
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
            'https://res.cloudinary.com/dp2xkwxbk/image/upload/v1686462277/trelux/luke-chesser-pJadQetzTkI-unsplash_n53kai.jpg',
          color: '',
          backgroundColor: '#322674',
        },
        members: [
          {
            _id: 'u101',
            fullname: 'Adam Gertzkin',
            imgUrl:
              'https://res.cloudinary.com/dp2xkwxbk/image/upload/v1686456867/trelux/adam_nxymb1.jpg',
          },
          {
            _id: 'u102',
            fullname: 'Shaul Rosenberg',
            imgUrl:
              'https://res.cloudinary.com/dp2xkwxbk/image/upload/v1686458436/trelux/shaul_kkex5s.jpg',
          },
          {
            _id: 'u103',
            fullname: 'Dor Cohen',
            imgUrl:
              'https://res.cloudinary.com/dp2xkwxbk/image/upload/v1686458417/trelux/dor_invx37.jpg',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Backlog-client',
            tasks: [
              {
                id: 't101',
                title: 'Create backend services',
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
                  isFullyCover: true,
                },
                attachments: [],
                description: 'life is good',
                comments: ['bla', 'no'],
              },
              {
                id: 't103',
                title: 'Routing Directory',
                attachments: [],
                style: {
                  backgroundImage:
                    'https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                },
              },
              {
                id: 't104',
                title: 'Data model approval',
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
              },
              {
                id: 't302',
                title: 'Client meetings',
                attachments: [],
                dueDate: new Date() - 1,
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
                labelIds: ['l108', 'l10ffdsfsaf432'],
                description: 'life is good',
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
                labelIds: ['l101', 'l3423453fdsd102', 'l103'],
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
            color: '#4BCE97',
          },
          {
            id: 'l1jfsdfsd02',
            title: 'Progress',
            color: '#F8E6A1',
          },
          {
            id: 'l103',
            title: 'High Priority',
            color: '#FAA53D',
          },
          {
            id: 'l104',
            title: 'Low Priority',
            color: '#DFD8FD',
          },
          {
            id: 'l105',
            title: 'Review Needed',
            color: '#579DFF',
          },
          {
            id: 'l106',
            title: 'Bug',
            color: '#E774BB',
          },
          {
            id: 'l107',
            title: 'Improvement',
            color: '#9F8FEF',
          },
          {
            id: 'l108',
            title: 'New Feature',
            color: '#94C748',
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
                id: 't103333',
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
                labelIds: ['l108', 'l1444402'],
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
