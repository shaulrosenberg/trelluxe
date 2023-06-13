import { updateBoard } from "../../store/board.actions"
import { gpt4Service } from "../../services/gpt.service"
import { addGroup } from "../../store/board.actions"
import { speechToTextService } from "../../services/stt.service"


export function AiContent({ boardId }) {

    async function addGroupFromVoiceCommand() {
        try {
            // Convert the voice command to text
            const commandText = await speechToTextService.transcribe()

            // Process the text command using GPT-4
            const command = await gpt4Service.processCommand(commandText)
            

            // Check if the command is to create a list
            if (command.action.includes('createList')) {
                const groupTitle = command.parameters.listName

                // Create the new list
                await addGroup({title: groupTitle, boardId})
            }
        } catch (err) {
            console.log('Failed to process voice command', err)
            throw err
        }
    }

    return (
      <div>
        <button onClick={addGroupFromVoiceCommand}>Add Group with Voice Command</button>
      </div>
    )
}


