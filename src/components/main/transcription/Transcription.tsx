import { useTranscribeContext } from "../../../context/TranscribeContext"
import ShortUniqueId from "short-unique-id"
import '../style.css'
import { useState } from "react"

export default function Transcription() {
    const context = useTranscribeContext()
    const uid = new ShortUniqueId({ length: 8 })
    const [showSegments, setShowSegments] = useState(true)

    return (
        <div className="flex flex-col items-start h-full justify-start">
            {context && context?.uploadLoader &&
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <img src="/assets/load.gif" alt="loader" className="w-[30%] h-auto object-cover" />
                    <p className="text-gray-400 md:text-sm mb-10">Extracting audio...</p>
                </div>}
            
            {context && context?.transcribeLoader &&
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <img src="/assets/load.gif" alt="loader" className="w-[30%] h-auto object-cover" />
                    <p className="text-gray-400 md:text-sm mb-10">Transcribing audio...</p>
                </div>}

            {context && context?.transcribedResponse &&
                <div className="w-full h-full flex flex-col items-start justify-start gap-2">
                    <div className="w-full md:text-sm shadow-lg z-10 py-2 px-5 flex items-center justify-start gap-5">
                        <button onClick={() => setShowSegments(true)} className={`${showSegments ? 'border-red-700 shadow-red-600/30' : 'border-transparent'} shadow-md border-[1px] hover:border-red-700 hover:shadow-red-600/30 transition-all duration-200 rounded-lg px-4 py-2`}>Segments</button>
                        <button onClick={() => setShowSegments(false)} className={`${!showSegments ? 'border-red-700 shadow-red-600/30' : 'border-transparent'} shadow-md border-[1px] hover:border-red-700 hover:shadow-red-600/30 transition-all duration-200 rounded-lg px-4 py-2`}>Combined</button>
                    </div>

                    <div className="w-full h-full overflow-y-auto flex flex-col items-start justify-start gap-4">
                        {showSegments && context?.transcribedResponse.segments.map((section) => {
                            return (
                                <div onClick={() => {
                                    context?.setStartTime(Math.floor(section.start))
                                    context?.setAutoplay(1)
                                }} key={uid.rnd()} className="hover:border-red-700 hover:cursor-pointer hover:shadow-red-700/30 shadow-lg transition-all duration-250 border-[1px] border-[#1b1b1b] w-full p-3 bg-[#1b1b1b] rounded-lg md:text-sm flex flex-col items-start justify-end gap-4">
                                    <div className="w-full opacity-70 flex items-start justify-start gap-3 md:text-xs">
                                        <p>start: <span className="text-red-500 font-medium">{section.start}s</span></p>
                                        <p>end: <span className="text-red-500 font-medium">{section.end}s</span></p>
                                    </div>
                                    <p className="font-light md:text-sm">{section.text}</p>
                                </div>
                            )
                        })}

                        {!showSegments && <div className="w-full h-full p-3 md:text-sm text-gray-300">
                            <p>{context.transcribedResponse.text}</p>
                            <p className="mt-10">Duration: <span className="text-red-500">{context.transcribedResponse.duration}s</span></p>
                            </div>}
                    </div>
                </div>}
        </div>
    )
}
