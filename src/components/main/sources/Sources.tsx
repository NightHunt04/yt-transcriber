import { useEffect, useState } from "react"
import { useTranscribeContext } from "../../../context/TranscribeContext"
import { fetchSources } from "../../../utils/fetchSources"

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

export default function Sources() {
    const context = useTranscribeContext()
    const [response, setResponse] = useState<Response | undefined>()

    useEffect(() => {
        async function fetchSourceFun() {
            const response = await fetchSources()

            if (response)
                setResponse(response)
            // console.log(response)
        }

        if (context && !context?.extractedAudio) {
            fetchSourceFun()
        }  
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-start justify-start">
            <h3 className="font-kannit md:text-2xl">Source</h3>

            <div className="w-full md:text-sm mt-5 flex flex-col overflow-hidden items-start justify-start">
                <p className="mb-1">Images</p>
                {response?.web_images !== undefined ? 
                    <div className="grid grid-cols-2 h-[20vh] overflow-y-auto items-start justify-center gap-1">
                        {response!.web_images.map(d => {
                            return (
                                <a href={d.image} target="_blank" className="hover:opacity-70 transition-all w-full h-full">
                                    <img src={d.image} alt="image" className="w-full h-[9vh] object-cover rounded-lg" />
                                </a>
                            )
                        })}
                    </div>:
                    <div className="grid grid-cols-2 h-[20vh] overflow-y-auto overflow-x-hidden items-center justify-center gap-1">
                        <div className="w-[8.8vw] h-full bg-[#202020] rounded-lg animate-pulse">
                        </div>
                        <div className="w-[8.8vw] h-full bg-[#202020] rounded-lg animate-pulse">
                        </div>
                        <div className="w-[8.8vw] h-full bg-[#202020] rounded-lg animate-pulse">
                        </div>
                        <div className="w-[8.8vw] h-full bg-[#202020] rounded-lg animate-pulse">
                        </div>
                    </div>}

                <p className="mt-10 mb-1">Web search</p>
                {response?.web_text !== undefined ?
                    <div className="md:text-xs grid grid-cols-2 pr-2 h-[15vh] overflow-y-auto items-start justify-center gap-1">
                        {response!.web_text.map(d => {
                            return (
                                <a href={d.href} target="_blank" className="border-[1px] hover:border-red-700 shadow-lg transition-all duration-200 border-[#202020] w-full p-2 bg-[#202020] rounded-lg">
                                    <p className="md:text-sm font-medium">{d.title.slice(0, 16)}...</p>
                                    <p className="mt-1 text-gray-300 font-light md:text-[11px]">{d.body.slice(0, 70)}...</p>
                                    <p className="md:text-[9px] mt-1 break-words text-red-500 w-full">{d.href.slice(0, 23)}...</p>
                                </a>
                            )
                        })}
                    </div>:
                    <div className="md:text-xs grid grid-cols-2 pr-2 h-[15vh] overflow-y-auto items-center justify-center gap-1">
                        <div className="w-[8.6vw] animate-pulse h-full p-2 bg-[#202020] rounded-lg"></div>
                        <div className="w-[8.6vw] animate-pulse h-full p-2 bg-[#202020] rounded-lg"></div>
                    </div>}

                <p className="mt-10 mb-1">Suggested Youtube Videos</p>
                {response?.suggestedVids !== undefined ?
                    <div className="md:text-xs w-full grid grid-cols-2 pr-2 h-[25vh] overflow-y-auto items-center justify-center gap-1">
                        {response!.suggestedVids.map(d => {
                            return (
                                <a href={`https://youtube.com/watch?v=${d.id.videoId}`} target="_blank" className="border-[1px] shadow-lg transition-all duration-200 border-transparent hover:opacity-70 w-full h-full p-2 rounded-lg">
                                    <img src={d.snippet.thumbnails.default.url} alt="thumbnail" className="w-full h-full object-cover rounded-lg" />
                                </a>
                            )
                        })}
                    </div>:
                    <div className="md:text-xs grid grid-cols-2 pr-2 h-[150px] overflow-y-auto items-center justify-center gap-1">
                        <span className="w-[8.6vw] animate-pulse h-full p-2 bg-[#202020] rounded-lg"></span>
                        <div className="w-[8.6vw] animate-pulse h-full p-2 bg-[#202020] rounded-lg"></div>
                    </div>}
            </div>
        </div>
    )
}
