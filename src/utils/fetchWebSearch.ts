import axios from "axios"


export async function fetchSources(videoId: string = localStorage.getItem('prevVideoId')!): Promise<string | undefined> {
    let data = JSON.stringify({
        "id": videoId
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:5000/api/search',
        url: 'https://transcribe-py-back.onrender.com/api/search',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }

    try {
        const response = await axios.request(config)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}