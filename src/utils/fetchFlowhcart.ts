import axios from "axios"

interface Response {
    code: number
    base64url: string
}

export async function fetchFlowchart(fileId: string): Promise<Response | undefined> {
    let data = JSON.stringify({
        "fileId": fileId,
        "uuid": localStorage.getItem('uuid')
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:8000/api/audio/flowchart',
        url: 'https://transcribe-js-back.onrender.com/api/audio/flowchart',
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
