import axios from "axios"

interface Segment {
    avg_logprob: number
    compression_ratio: number
    end: number
    id: number
    no_speech_prob: number
    seek: number
    start: number
    temperature: number
    text: string
    tokens: number[]
}

interface GroqResponse {
    duration: number
    language: string
    segments: Segment[]
    task: string
    text: string
    x_groq: {
        id: string
    }
}

// interface Response {
//     code: number
//     response: GroqResponse
//     summary: string
//     base64url: string
// }

interface Response {
    code: number
    response: GroqResponse
}

export async function fetchTranscription(fileId: string): Promise<Response | undefined> {
    let data = JSON.stringify({
        "fileId": fileId,
        "uuid": localStorage.getItem('uuid')
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:8000/api/audio/transcribe',
        url: 'https://transcribe-js-back.onrender.com/api/audio/transcribe',
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
