import axios from 'axios'
import { config } from 'dotenv'
import { boardService } from './board.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { socketService } from '../../services/socket.service.mjs'
import { asyncLocalStorage } from '../../services/als.service.mjs'
config()

// open ai
export async function processCommand(req, res) {
	const commandText = req.body.commandText
	console.log(process.env.OPENAI_API_KEY)
	try {
		const response = await axios.post('https://api.openai.com/v4/engines/davinci-codex/completions',
			{
				prompt: `Translate the following English command to a task: ${commandText}`,
				max_tokens: 60,
				temperature: 0.5,
			},
			{
				headers: {
					'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: 'Error processing command' });
	}
}

export async function getBoards(req, res) {
	try {
		logger.debug('Getting Boards:', req.query)
		const filterBy = {
			// txt: req.query.txt || '',
			// pageIdx: req.query.pageIdx
		}
		const boards = await boardService.query(filterBy)
		res.json(boards)
	} catch (err) {
		logger.error('Failed to get boards', err)
		res.status(400).send({ err: 'Failed to get boards' })
	}
}

export async function getBoardById(req, res) {
	try {
		const boardId = req.params.id
		const board = await boardService.getById(boardId)
		res.json(board)
	} catch (err) {
		logger.error('Failed to get board', err)
		res.status(400).send({ err: 'Failed to get board' })
	}
}

export async function addBoard(req, res) {
	const { loggedinUser } = req

	try {
		const board = req.body
		board.createdBy = loggedinUser
		const addedBoard = await boardService.add(board)
		res.json(addedBoard)
	} catch (err) {
		logger.error('Failed to add board', err)
		res.status(400).send({ err: 'Failed to add board' })
	}
}


export async function updateBoard(req, res) {
	try {
		// when users are available
		// const { loggedinUser } = asyncLocalStorage.getStore()
		const board = req.body
		const updatedBoard = await boardService.update(board)
		// socketService.broadcast({ type: 'board-update', data: updatedBoard, room: board._id, userId: loggedinUser._id})
		res.json(updatedBoard)
	} catch (err) {
		logger.error('Failed to update board', err)
		res.status(400).send({ err: 'Failed to update board' })

	}
}

export async function removeBoard(req, res) {
	try {
		const boardId = req.params.id
		const removedId = await boardService.remove(boardId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove board', err)
		res.status(400).send({ err: 'Failed to remove board' })
	}
}

export async function addBoardMsg(req, res) {
	const { loggedinUser } = req
	try {
		const boardId = req.params.id
		const msg = {
			txt: req.body.txt,
			by: loggedinUser
		}
		const savedMsg = await boardService.addBoardMsg(boardId, msg)
		res.json(savedMsg)
	} catch (err) {
		logger.error('Failed to update board', err)
		res.status(400).send({ err: 'Failed to update board' })

	}
}

export async function removeBoardMsg(req, res) {
	const { loggedinUser } = req
	try {
		const boardId = req.params.id
		const { msgId } = req.params

		const removedId = await boardService.removeBoardMsg(boardId, msgId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove board msg', err)
		res.status(400).send({ err: 'Failed to remove board msg' })

	}
}


