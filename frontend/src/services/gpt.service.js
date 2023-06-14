import { httpService } from './http.service'
const axios = require('axios')


// /api/
const API_URL = 'board/gpt4'

export const gpt4Service = {
	processCommand,
}

async function processCommand(commandText) {
	// Send a POST request to your server-side route
	const response = await httpService.post(API_URL, { commandText: commandText })

	console.log(response)

	// Process the response to get the action and parameters
	let action = response.choices[0].text.trim().split('\n')[0]

	const parameters = extractParameters(action)

	return { action, parameters }
}

function extractParameters(action) {
	// Extract parameters from the action text
	// This will depend on how you've set up your model to return responses
	// Here's a very basic example:
	const parts = action.split(' ')
	// if (parts[0] === 'createList') {
	if (true) {
		const listName = parts.slice(1).join(' ')
		return { listName }
	}

	// Return an empty object if the action is not recognized
	return {}
}
