'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const Success = () => {
  const { push } = useRouter()

  const viewContract = () => {}
  const downloadUnsigned = () => {}
  const sendContract = () => {}

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          {/* Previous question buttons */}
          <div className="mb-4">
            <button
              onClick={() => push('/question1')}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2"
            >
              What type of splits contract would you like to create?
            </button>
            {/* ... other buttons ... */}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Congrats! You're protecting your art.
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            DRAFT CONTRACT CREATED!
          </h2>
          <div className="flex flex-col gap-4">
            <button 
              onClick={viewContract}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              VIEW CONTRACT
            </button>
            <button 
              onClick={downloadUnsigned}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              DOWNLOAD UNSIGNED VERSION
            </button>
            <button 
              onClick={sendContract}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              SEND DOCUSIGN TO COLLABORATORS
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">Congrats! You're protecting your art.</p>
          <h4 className="text-base sm:text-lg">
            Don't forget to review it with your colleagues or with a lawyer,
            customize it if needed and sign it when you are ready!
          </h4>
        </div>
      </main>
    </div>
  )
}

export default Success
