import axios from 'axios'

const API_URL = 'https://api.openai.com/v4/gpt-4/'


export const gpt4Service = {
  processCommand,
}

async function processCommand(commandText) {
  // Send a POST request to the GPT-4 API
  const response = await axios.post(`${API_URL}engines/davinci-codex/completions`, {
    prompt: `Translate the following English command to a task: ${commandText}`,
    max_tokens: 60,
    temperature: 0.5,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })

  // Process the response to get the action and parameters
  let action = response.data.choices[0].text.trim().split('\n')[0];

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
