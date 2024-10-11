'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const ContractBuilder3 = () => {
  const router = useRouter()
  const [pageCount, setPageCount] = useState<number | null>(null)

  const searchParams = useSearchParams()
  let song = searchParams.get('song')!

  const handleContributorsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const contributors = Number(event.target.value)
    setPageCount(contributors)!
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pageCount && pageCount > 0) {
      router.push(`/1?pageCount=${pageCount}`)
    }
  }

  return (
    <div className="float-root text-start min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="grid grid-cols-2 p-7">
        <div className="p-10">
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
          <p>How many collaborators contributed to writing the song?</p>
          <form className="flex flex-col">
            <input
              type="number"
              name="type"
              onChange={handleContributorsChange}
              min="1"
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-1/2"
              required
            />
          </form>
        </div>
        <div className=" p-8 py-1">
          <p className="text-xs text-gray-500">
            Your contract has yet to be completed. Continue to fill out the
            decision tree.
          </p>
          <h3>1.0 Music Work Identification</h3>
          <p>
            The contracting parties have collaborated in the authorship and
            composition of the musical work titled{' '}
            <span className="text-red-500">{song}</span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <button onClick={handleSubmit} className="border border-red">
          SUBMIT
        </button>
      </footer>
    </div>
  )
}

export default ContractBuilder3
