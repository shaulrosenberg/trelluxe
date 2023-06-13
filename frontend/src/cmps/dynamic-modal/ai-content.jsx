// import { updateBoard } from "../../store/board.actions";
// export function AiContent({ boardId }) {
//     async function addGroupFromVoiceCommand(voiceCommand) {
//         try {
//             // Convert the voice command to text
//             const commandText = await speechToTextService.transcribe(voiceCommand);

//             // Process the text command using GPT-4
//             const command = await gpt4Service.processCommand(commandText);

//             // Check if the command is to create a list
//             if (command.action === 'createList') {
//                 const groupTitle = command.parameters.listName;

//                 // Assume the user's board ID is stored in the session
//                 const boardId = sessionService.getCurrentUser().boardId;

//                 // Create the new list
//                 await addGroup(groupTitle, boardId);
//             }
//         } catch (err) {
//             console.log('Failed to process voice command', err);
//             throw err;
//         }
//     }

//     const recognition = new window.webkitSpeechRecognition();

//     recognition.onstart = function () {
//         console.log('Voice recognition started. Try speaking into the microphone.');
//     }

//     recognition.onresult = function (event) {
//         const transcript = event.results[0][0].transcript;
//         console.log(transcript);
//         // Now you have the transcribed text, you can process it further
//     }

//     recognition.start();
//     return (<p>hi i'm the assistant</p>)
// }


