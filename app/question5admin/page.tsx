'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const ContractBuilder5Admin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))
  const [name, setSelectedOptionName] = useState('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionName(event.target.value)
  }

  const goToPage = (page: number) => {
    router.push(`/${page}`)
  }

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

          <h1 className="p-4 w-4/5 p-7 text-xl">
            What is the name(s) of the designated administrator?
          </h1>
          <form className="flex flex-col p-7">
            <label className="p-2 text-xs">
              Legal Name (First Last) | Separate names by commas
            </label>
            <input
              type="text"
              onChange={handleNameChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-4/5"
            />
          </form>
        </div>
        <div className=" p-8 py-1">
          <p className="text-small text-gray-500 pt-10">
            Your contract has yet to be completed. Continue to fill out the
            decision tree.
          </p>
          <h4 className="pt-6">4.0 Designation of an administrator</h4>
          <p className="text-xs p-4">
            By means of the present contract, the parties recognize, accept, and
            declare that they designate{' '}
            <span className="text-red-500 text-small font-bold">{name}</span> as
            the representative in charge of making the decisions related to the
            commercial exploitation of the musical work. The designated person
            will make their best effort to achieve the greatest commercial
            benefit of the work, which includes but is not limited to: offering
            licenses to the market, working with publishing companies, music
            distributors, record labels or synchronizations. The representative
            is NOT authorized to sell or dispose of the copyright ownership of
            the musical work, they can only offer licenses of use. The sale of
            copyrights is an exclusive faculty of each owner.
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <a
          className="items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          onClick={() => router.push('/moreInfoAdmin')}
        >
          Still not clear about designating an admin? read here.
        </a>
        <button
          onClick={() => router.push('/question4')}
          className="border border-red"
        >
          SUBMIT
        </button>
      </footer>
    </div>
  )
}

export default ContractBuilder5Admin
