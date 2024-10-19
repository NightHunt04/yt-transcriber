import axios from "axios"

interface Response {
    code: number
    summary: string
}

export async function fetchSummary(): Promise<Response | undefined> {
    let data = JSON.stringify({
        "uuid": localStorage.getItem('uuid')
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:8000/api/audio/summarise',
        url: 'https://transcribe-js-back.onrender.com/api/audio/summarise',
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
