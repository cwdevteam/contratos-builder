'use client'

import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import useQuestion3 from '../../store/useQuestion3'

const ContractBuilder3 = () => {
  const { push } = useRouter()
  const updateContributorCount = useQuestion3((state) => state.updateContributorCount);
  const [pageCount, setPageCount] = useState<number | null>(null)

  const searchParams = useSearchParams()
  const song = searchParams.get('song')!

  const handleContributorsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const contributors = Number(event.target.value)
    setPageCount(contributors)!
    updateContributorCount(contributors)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pageCount && pageCount > 0) {
      push(`/master_recording/1?pageCount=${pageCount}`)
    }

  }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <button
            onClick={() => push('/question1')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            What type of splits contract would you like to create?
          </button>
          <button
            onClick={() => push('/master_recording/question2')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
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

const WrappedContractBuilder3 = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ContractBuilder3 />
  </Suspense>
)

export default WrappedContractBuilder3
