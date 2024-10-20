// import { useEffect } from "react"
import { useEffect } from "react"
import { useTranscribeContext } from "../../context/TranscribeContext"
import { useNavigate } from "react-router-dom"
import { fetchDownloadAudio } from "../../utils/fetchDownloadAudio"
import ShortUniqueId from "short-unique-id"
import Transcription from "./transcription/Transcription"
import { fetchTranscription } from "../../utils/fetchTranscription"
import Sources from "./sources/Sources"
import Summary from "./summary/Summary"
import { fetchSummary } from "../../utils/fetchSummary"
// import { fetchFlowchart } from "../../utils/fetchFlowhcart"
import { fetchDownloadVideo } from "../../utils/fetchDownloadVideo"
import { fetchSummaryVideo } from "../../utils/fetchVideoSummary"

// interface SegmentObj {
//     id: number
//     start: number
//     end: number
//     text: string
// }

export default function Main() {
    const uid = new ShortUniqueId({ length: 12 })
    const context = useTranscribeContext()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchDownload (url: string, fileId: string) {
            context?.setUploadLoader(true)
            // const res = await Promise.allSettled([
            //     fetchDownloadAudio(url, fileId),
            //     fetchDownloadVideo(localStorage.getItem('prevVideoId')!, fileId)
            // ])
            // res.forEach((res, ind) => {
            //     if (res.status === 'fulfilled') {
            //         const val = res.value
            //         console.log(val)
            //     } else console.error(`Promise ${ind} failed:`, res.reason)
            // })
            
            fetchDownloadVideo(localStorage.getItem('prevVideoId')!, fileId)
                .then(async () => {
                    const videoSummary = await fetchSummaryVideo(fileId)
                    console.log(videoSummary)

                    if (videoSummary)
                        context?.setVideoSummary(videoSummary?.summary!)
                    else context?.setVideoSummary('no')
                })
            await fetchDownloadAudio(url, fileId)
            context?.setUploadLoader(false)

            context?.setTranscribeLoader(true)
            const response = await fetchTranscription(fileId)
            const transcribeObj = {
                text: response!.response.text,
                segments: [],
                duration: response!.response.duration
            }
            // @ts-ignore
            response!.response.segments.map(seg => transcribeObj.segments.push({ id: seg.id, start: seg.start, end: seg.end, text: seg.text }))
            context?.setTranscribedResponse(transcribeObj)
            // context?.setAudioSummary(response?.summary!)
            // context?.setBaseFlowImg(response?.base64url!)
            context?.setTranscribeLoader(false)

            const summary = await fetchSummary()
            if (summary?.code)
                context?.setAudioSummary(summary?.summary!)
            else context?.setAudioSummary("An error occured while summarising youtube video's audio")

            // const flowchart = await fetchFlowchart(fileId)
            // if (flowchart?.code)
            //     context?.setBaseFlowImg(flowchart.base64url)
            // else context?.setBaseFlowImg('no')

        }
        
        if (context && !context?.extractedAudio) {
            const fileId = uid.rnd()
            context?.setFileId(fileId)

            fetchDownload(localStorage.getItem('prevUrl')!, fileId)

            context?.setExtractedAudio(true)
        }
    }, [context])

    return (
        <div className="w-full flex items-start justify-start h-screen px-5 py-6 relative gap-3"> 
            <div className="mb-2 text-xs absolute left-1 top-1">
                <button onClick={() => navigate('/')} className="hover:bg-black hover:text-red-700 hover:font-bold transition-all flex items-center justify-center p-2 rounded-full bg-[#121212] border-[1px] border-red-700"><i className="fa-solid fa-angles-left"></i></button>
            </div>
            
            <div className="w-[30%] h-full flex flex-col items-start justify-between p-3"> 
                <iframe 
                    src={`https://www.youtube.com/embed/${localStorage.getItem('prevVideoId')!}?start=${context?.startTime}&autoplay=${String(context?.autoplay)}`} 
                    width="100%"
                    height="500"
                    className="rounded-lg shadow-lg animate-shadow-pulse"
                    frameBorder="0" />
                
                <div className="flex mt-5 rounded-lg p-3 bg-[#121212] shadow-lg flex-col items-start justify-start w-full h-[90%] overflow-y-auto">
                    <Transcription />
                </div>
            </div>

            <div className="w-[50%] flex flex-col bg-[#121212] shadow-lg rounded-lg items-start justify-between h-full overflow-y-auto p-3">
                <Summary />
            </div>

            <div className="w-[20%] h-full flex flex-col bg-[#121212] shadow-lg animate-left-shadow-pulse rounded-lg items-start justify-between p-3">
                <Sources />
            </div>
        </div>
    )
}
