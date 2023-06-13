import axios from 'axios'

const API_URL = 'https://api.openai.com/v4/gpt-4/'

export const gpt4Service = {
  processCommand,
}

async function processCommand(commandText) {
  // Send a POST request to the GPT-4 API
  // The specifics of this request will depend on how you've set up your model.
  // Consult the OpenAI documentation for details.
  const response = await axios.post(API_URL, {
    prompt: commandText,
    // Other parameters depending on your model
  })

  // Process the response to get the action and parameters
  const action = response.data.choices[0].text.trim()
  const parameters = extractParameters(action)

  return { action, parameters }
}

function extractParameters(action) {
  // Extract parameters from the action text
  // This will depend on how you've set up your model to return responses
  // Here's a very basic example:
  const parts = action.split(' ')
  if (parts[0] === 'createList') {
    const listName = parts.slice(1).join(' ')
    return { listName }
  }

  // Return an empty object if the action is not recognized
  return {}
}
