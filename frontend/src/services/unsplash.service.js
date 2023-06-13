import axios from 'axios'

const UNSPLASH_API = 'https://api.unsplash.com/'
const ACCESS_KEY = '_FcVEzA8OKhZ9F2U5o-N09t0ZzOw5DY3i_DpN6TVGR4'

const instance = axios.create({
    baseURL: UNSPLASH_API,
    headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
    }
})

export const unsplashService = {
    searchPhotos
}

async function searchPhotos(query = 'background', page = 1, perPage = 10) {
    const cacheKey = `photos_${query}_${page}_${perPage}`

    // try to get data from local storage
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
        return JSON.parse(cachedData)
    }

    try {
        const response = await instance.get(`/search/photos`, {
            params: {
                query,
                page,
                per_page: perPage
            }
        })

        if (response.data && response.data.results) {
            // save data to local storage for next time
            localStorage.setItem(cacheKey, JSON.stringify(response.data.results))
            return response.data.results
        }

        throw new Error('Failed to fetch photos')
    } catch (error) {
        console.error(error)
        throw error
    }
}
