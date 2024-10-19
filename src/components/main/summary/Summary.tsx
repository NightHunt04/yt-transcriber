import { useTranscribeContext } from "../../../context/TranscribeContext"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Summary() {
    const context = useTranscribeContext()

    return (
      <div className="w-full md:text-sm flex-col items-start justify-start h-full">
        {context?.audioSummary ? 
        <div className={`${context?.audioSummary ? 'flex' : 'hidden'} w-full md:text-sm flex-col items-start justify-start p-3 h-full`}>
            <h3 className="md:text-2xl font-semibold mb-1">Summary from audio</h3>
            <p className="max-w-full">
                <Markdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                        p: ({node, ...props}) => <p className="mt-4 text-gray-300 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                        li: ({node, ...props}) => <li className="mb-2" {...props} />,
                        a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                        blockquote: ({node, ...props}) => (
                          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                        ),
                        code: ({node, ...props}) => (
                            <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm" {...props} />
                          ) ,
                        pre: ({node, ...props}) => <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4" {...props} />,
                        table: ({node, ...props}) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full border border-gray-300" {...props} />
                          </div>
                        ),
                        th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold" {...props} />,
                        td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                        img: ({node, ...props}) => <img className="max-w-full h-auto my-4 rounded" {...props} />,
                        hr: ({node, ...props}) => <hr className="my-6 border-t border-gray-300" {...props} />,
                      }}>
                        {context?.audioSummary}
                </Markdown>
            </p>

            {context?.baseFlowImg === '' && <div className="relative w-full my-10 flex flex-col items-start">
              <div className="h-[40px] absolute rounded-lg w-[18%] bg-[#242424] animate-pulse"></div>
              <div className="h-[430px] mt-14 absolute rounded-lg w-[50%] self-center bg-[#242424] animate-pulse"></div>
            </div>}

            {context?.baseFlowImg !== 'no' && context?.baseFlowImg !== '' && <div className="w-full flex flex-col">
              <h3 className="md:text-2xl font-semibold mt-10 mb-2">Flowchart</h3>
              <div className="w-full flex items-center justify-center pb-5">
                <img src={`data:image/png;base64,${context?.baseFlowImg}`} alt="" className="w-[35%] h-auto object-cover rounded-lg" />
              </div>
            </div>}
        </div>:
        <div className="w-full h-full flex items-start justify-start p-3 flex-col">
          <div className="h-[30px] rounded-lg w-[40%] bg-[#242424] animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-full bg-[#242424] mt-3 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[70%] bg-[#242424] mt-1 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[45%] bg-[#242424] mt-1 animate-pulse"></div>

          <div className="h-[17px] rounded-lg w-full bg-[#242424] mt-10 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[45%] bg-[#242424] mt-1 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[90%] bg-[#242424] mt-1 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[70%] bg-[#242424] mt-1 animate-pulse"></div>

          <div className="h-[17px] rounded-lg w-full bg-[#242424] mt-10 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[90%] bg-[#242424] mt-1 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[70%] bg-[#242424] mt-1 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[45%] bg-[#242424] mt-1 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[95%] bg-[#242424] mt-1 animate-pulse"></div>

          <div className="h-[22px] rounded-lg w-[35%] bg-[#242424] mt-10 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[90%] bg-[#242424] mt-1 ml-10 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[70%] bg-[#242424] mt-1 ml-10 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[45%] bg-[#242424] mt-1 ml-10 animate-pulse"></div>
          <div className="h-[17px] rounded-lg w-[95%] bg-[#242424] mt-1 ml-10 animate-pulse"></div>
        </div>}
        </div>
    )
}
