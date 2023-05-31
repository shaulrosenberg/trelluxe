
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
    getDefaultFilter
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
    const method = (board._id) ? 'put' : 'post'
    // return httpService[method](BASE_URL, board)
    return storageService[method](BASE_URL, board)
}


function getEmptyBoard() {
    return {
        name: '',
        price: '',
        inStock: true,
        labels: []
    }
}

function getDefaultFilter() {
    return { txt: '', labels: [], sortBy: '', sortOrder: '' }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Talking Oshri',
                price: 200,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'Talking Hemos',
                price: 199,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Talking Puki',
                price: 90,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't105',
                name: 'Talking Muki',
                price: 150,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            }
        ]

        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}



