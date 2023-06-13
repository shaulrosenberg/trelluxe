


export const speechToTextService = {
    transcribe
}



async function transcribe() {
    return new Promise((resolve, reject) => {
        try {
            const recognition = new window.webkitSpeechRecognition()

            recognition.onstart = function () {
                console.log('Voice recognition started. Try speaking into the microphone.')
            }

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript
                console.log(transcript)
                // Now you have the transcribed text, you can process it further
                resolve(transcript)
            }

            recognition.onerror = function (event) {
                reject(event.error)
            };

            recognition.start()

        } catch (err) {
            console.log('transcribe error:', err)
            reject(err);
        }
    })
}
