import axios from "axios"

export async function fetchDownloadAudio(url: string, fileId: string) {
    let data = JSON.stringify({
        "url": url,
        "fileId": fileId
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:8000/api/audio/downloadAudio',
        url: 'https://transcribe-js-back.onrender.com/api/audio/downloadAudio',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }

    try {
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
