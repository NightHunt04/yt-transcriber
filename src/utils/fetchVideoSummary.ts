import axios from "axios"

interface Response {
    code: number
    msg: string
    summary: string
}

export async function fetchSummaryVideo(fileId: string): Promise<Response | undefined> {
    let data = JSON.stringify({
        "file_id": fileId
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:5000/api/summariseVideo',
        url: 'https://transcribe-py-back.onrender.com/api/summariseVideo',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }

    try {
        const response = await axios.request(config)
        console.log(response.data)
        return { ...response.data }
    } catch (error) {
        console.log(error)
    }
}