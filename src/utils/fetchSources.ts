import axios from "axios"

interface WebImage {
    height: number
    image: string
    source: number
    thumbnail: string
    title: string
    url: string
    width: number
}

interface WebText {
    body: string
    href: string
    title: string
}

interface Item {
    id: {
        kind: string
        videoId: string
    }
    snippet: {
        thumbnails: {
            default: {
                url: string
            }
        }
    }
}


interface Response {
    web_images: WebImage[]
    web_text: WebText[]
    suggestedVids: Item[]
}

export async function fetchSources(videoId: string = localStorage.getItem('prevVideoId')!): Promise<Response | undefined> {
    let data = JSON.stringify({
        "id": videoId
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'http://localhost:5000/api/sources',
        url: 'https://transcribe-py-back.onrender.com/api/sources',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }

    const optionsSuggestedVideos = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          relatedToVideoId: videoId,
          part: 'id, snippet',
          type: 'video',
          maxResults: '5'
        },
        headers: {
          'x-rapidapi-key': '7264c0698emsh8e04d51884fb66ep1a08f0jsnd21ad7509f71',
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(config)
        const suggestedVids = await axios.request(optionsSuggestedVideos)
        // console.log(suggestedVids.data.items)
        return { ...response.data, suggestedVids: suggestedVids.data.items }
    } catch (error) {
        console.log(error)
    }
}