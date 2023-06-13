import axios from 'axios'



export const aiService = {
   useAi,
   aiImage,
}
const options = {
   method: 'POST',
   url: 'https://openai80.p.rapidapi.com/chat/completions',
   headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '1ba2dda3d9mshb138274d9e5f186p1e8353jsn729d16319591',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
   },
   data: {
      model: 'gpt-3.5-turbo',
      messages: [
         {
            role: 'user',
            content: 'Hello!',
         },
      ],
   },
}

async function useAi() {
   try {
      const response = await axios.request(options)
      console.log(response)
      console.log(response.data)
   } catch (error) {
      console.error(error)
   }
}

// ai image
const optionsImage = {
   method: 'POST',
   url: 'https://openai80.p.rapidapi.com/images/generations',
   headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '1ba2dda3d9mshb138274d9e5f186p1e8353jsn729d16319591',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
   },
   data: {
      prompt: 'A cute baby sea otter',
      n: 2,
      size: '1024x1024',
   },
}

async function aiImage() {
   try {
      const response = await axios.request(optionsImage)
      console.log(response.data)
   } catch (error) {
      console.error(error)
   }
}
