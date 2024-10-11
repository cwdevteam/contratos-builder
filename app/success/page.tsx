'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const Success = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))

  const goToPage = (page: number) => {
    router.push(`/${page}`)
  }

  const viewContract = () => {}

  const downloadUnsigned = () => {}

  const sendContract = () => {}
  return (
    <div className="float-root text-start min-h-screen pb-20 pt-5">
      <main className="grid grid-cols-2">
        <div className="">
          <button
            onClick={() => router.push('/question1')}
            className="text-xs text-gray-500 w-full border-0 relative text-start"
          >
            What type of splits contract would you like to create?
          </button>
          <button
            onClick={() => router.push('/question2')}
            className="text-xs text-gray-500 w-full border-0 relative text-start"
          >
            What is the name of the song?
          </button>
          <button
            onClick={() => router.push('/question3')}
            className="text-xs text-gray-500 w-full border-0 relative text-start"
          >
            How many collaborators contributed to writing the song?
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className="text-xs text-gray-500 w-full border-0 relative text-start"
            >
              Contributor {i + 1}
            </button>
          ))}

          <button
            onClick={() => router.push('/question4')}
            className="text-xs text-gray-500 w-full border-0 relative text-start"
          >
            Vote or designate admin?
          </button>
          <h1 className="p-4 w-4/5 p-7 text-xl text-center">
            Congrats! You´re protecting your art.
          </h1>
          <h1 className="p-4 w-4/5 p-7 text-2xl font-bold text-center">
            DRAFT CONTRACT CREATED!
          </h1>
          <div className="flex flex-col pt-7">
            <button onClick={viewContract} className="border border-red w-4/5">
              VIEW CONTRACT
            </button>
            <br></br>
            <button
              onClick={downloadUnsigned}
              className="border border-red w-4/5"
            >
              DOWNLOAD UNSIGNED VERSION
            </button>
            <br></br>
            <button onClick={sendContract} className="border border-red w-4/5">
              SEND DOCUSIGN TO COLLABORATORS
            </button>
          </div>
        </div>
        <div className=" p-8 py-1">
          <p className="text-lg pt-20">Congrats! You´re protecting your art.</p>
          <h4 className="pt-40 text-lg w-3/5">
            Don´t forget to review it with your colleagues or with a lawyer,
            customize it if needed and sign it when you are ready!
          </h4>
        </div>
      </main>
    </div>
  )
}

export default Success
