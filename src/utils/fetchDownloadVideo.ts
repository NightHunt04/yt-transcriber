import axios from "axios"

interface Response {
    code: number
    msg: string
}

export async function fetchDownloadVideo(videoId: string = localStorage.getItem('prevVideoId')!, fileId: string): Promise<Response | undefined> {
    let data = JSON.stringify({
        "id": videoId,
        "file_id": fileId
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api/downloadVideo',
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