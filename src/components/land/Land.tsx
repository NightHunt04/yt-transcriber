import { useNavigate } from "react-router-dom"
import { useTranscribeContext } from "../../context/TranscribeContext"


export default function Land() {
    const navigate = useNavigate()
    const context = useTranscribeContext()

    const handleRedirectToMain = () => {
        let startingIndexOfID, ID = ''

        if(context?.url && context?.url.search('.com') !== -1) {
            startingIndexOfID = context.url.search("/watch")
            startingIndexOfID += 9
            for(let i = 0; i < 11; i++)
                ID += context.url[startingIndexOfID + i]
        }
        else if(context?.url && context?.url.search('.be') !== -1) {
            startingIndexOfID = context.url.search(".be") + 4
            for(let i = 0; i < 11; i++) 
                ID += context.url[startingIndexOfID + i]
        }

        context?.setVideoId(ID)
        context?.setExtractedAudio(false)
        context?.setAudioSummary('')
        localStorage.setItem('prevUrl', context!.url)
        localStorage.setItem('prevVideoId', ID)
        context?.setTranscribedResponse(null)
        context?.setBaseFlowImg('')

        navigate(`/transcribe/2894hlnafla/${ID}`)
    }   

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <h1 className="font-kannit font-semibold md:text-4xl"><span className="text-red-600">TubeQuery </span>: AI Youtube Transcriber</h1>
            <p className="text-gray-400 font-light md:text-sm">Provides features like transcribe, summarise, ask questions related to video, web search, flowcharts regarding the youtube video</p>

            <div className="p-1.5 w-[45%] flex items-center justify-center rounded-3xl shadow-lg bg-[#212121] hover:bg-[#292929] mt-10 animate-shadow-pulse">
                <div className="p-1 w-full border-[1px] flex items-center justify-center border-red-800 rounded-3xl">
                    <input 
                        type="text" 
                        placeholder="Paste Youtube URL here 🔗"
                        value={context?.url}
                        onChange={e => context?.setUrl(e.target.value)}
                        className="w-full font-light px-5 py-3 rounded-3xl outline-none bg-transparent" />
                    <button onClick={handleRedirectToMain} className="px-5 py-3 hover:text-red-600 transition-all duration-150 rounded-full flex items-center justify-center"><i className="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )
}
