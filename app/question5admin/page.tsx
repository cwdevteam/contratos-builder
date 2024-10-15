'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const ContractBuilder5Admin = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))
  const [name, setSelectedOptionName] = useState('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionName(event.target.value)
  }

  const goToPage = (page: number) => {
    push(`/${page}`)
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <button
            onClick={() => push('/question1')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2"
          >
            What type of splits contract would you like to create?
          </button>
          <button
            onClick={() => push('/question2')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2"
          >
            What is the name of the song?
          </button>
          <button
            onClick={() => push('/question3')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2"
          >
            How many collaborators contributed to writing the song?
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2"
            >
              Contributor {i + 1}
            </button>
          ))}

          <button
            onClick={() => push('/question4')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2"
          >
            Vote or designate admin?
          </button>

          <h1 className="text-lg sm:text-xl mb-4">
            What is the name(s) of the designated administrator?
          </h1>
          <form className="flex flex-col">
            <label className="text-xs sm:text-sm mb-2">
              Legal Name (First Last) | Separate names by commas
            </label>
            <input
              type="text"
              onChange={handleNameChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-4/5"
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Your contract has yet to be completed. Continue to fill out the decision tree.
          </p>
          <h4 className="text-base sm:text-lg font-bold mb-2">4.0 Designation of an administrator</h4>
          <p className="text-xs sm:text-sm">
            By means of the present contract, the parties recognize, accept, and declare that they designate{' '}
            <span className="text-red-500 font-bold">{name}</span> as the representative in charge of making the decisions related to the commercial exploitation of the musical work. The designated person will make their best effort to achieve the greatest commercial benefit of the work, which includes but is not limited to: offering licenses to the market, working with publishing companies, music distributors, record labels or synchronizations. The representative is NOT authorized to sell or dispose of the copyright ownership of the musical work, they can only offer licenses of use. The sale of copyrights is an exclusive faculty of each owner.
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-blue-500 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="#"
          onClick={() => push('/moreInfoAdmin')}
        >
          Still not clear about designating an admin? read here.
        </a>
        <button
          onClick={() => push('/question4')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          SUBMIT
        </button>
      </footer>
    </div>
  )
}

export default ContractBuilder5Admin