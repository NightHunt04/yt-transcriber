import { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

interface Segment {
    id: number
    start: number
    end: number
    text: string
}

interface TranscribedResponse {
    text: string
    segments: Segment[]
    duration: number
}

interface TranscribeContextInterface {
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>

    videoId: string
    setVideoId: React.Dispatch<React.SetStateAction<string>>

    fileId: string
    setFileId: React.Dispatch<React.SetStateAction<string>>

    uploadLoader: boolean
    setUploadLoader: React.Dispatch<React.SetStateAction<boolean>>

    transcribeLoader: boolean
    setTranscribeLoader: React.Dispatch<React.SetStateAction<boolean>>

    startTime: number
    setStartTime: React.Dispatch<React.SetStateAction<number>>

    autoplay: number
    setAutoplay: React.Dispatch<React.SetStateAction<number>>

    extractedAudio: boolean
    setExtractedAudio: React.Dispatch<React.SetStateAction<boolean>>

    transcribedResponse: TranscribedResponse | null
    setTranscribedResponse: React.Dispatch<React.SetStateAction<TranscribedResponse | null>>

    audioSummary: string
    setAudioSummary: React.Dispatch<React.SetStateAction<string>>

    baseFlowImg: string
    setBaseFlowImg: React.Dispatch<React.SetStateAction<string>>
}

const TranscribeContext = createContext<TranscribeContextInterface | null>(null)

export const TranscribeContextProvider: React.FC<Props> = (props) => {
    const [url, setUrl] = useState('')
    const [videoId, setVideoId] = useState('')
    const [fileId, setFileId] = useState('')
    const [uploadLoader, setUploadLoader] = useState(false)
    const [transcribeLoader, setTranscribeLoader] = useState(false)
    const [extractedAudio, setExtractedAudio] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [autoplay, setAutoplay] = useState(0)
    const [transcribedResponse, setTranscribedResponse] = useState<TranscribedResponse | null>(null)
    const [audioSummary, setAudioSummary] = useState('')
    const [baseFlowImg, setBaseFlowImg] = useState('')

    return (
        <TranscribeContext.Provider value={{ url, setUrl, videoId, setVideoId, fileId, setFileId, transcribedResponse, setTranscribedResponse, uploadLoader, setUploadLoader, extractedAudio, setExtractedAudio, transcribeLoader, setTranscribeLoader, autoplay, setAutoplay, setStartTime, startTime, audioSummary, setAudioSummary, baseFlowImg, setBaseFlowImg }}>
            {props.children}
        </TranscribeContext.Provider>
    )
}

export const useTranscribeContext = () => useContext(TranscribeContext)