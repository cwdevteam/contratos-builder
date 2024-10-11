'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const ContractBuilder5Vote = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))

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
            What percentage of ownership of the songwriting agreement is
            necessary to make business decisions about the song composition?
          </h1>
          <form className="flex flex-col p-7">
            <label className="p-2 text-xs">(%)</label>
            <input
              type="text"
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-1/5"
            />
          </form>
        </div>
        <div className=" p-8 py-1">
          <p className="text-small text-gray-500 pt-10">
            Your contract has yet to be completed. Continue to fill out the
            decision tree.
          </p>
          <h4 className="pt-6">2.0 Rights and Duties of the Parties</h4>
          <p className="text-xs pb-4">
            None of the parties may perform legally relevant acts on the musical
            work without the written authorization of the 51% of the ownership,
            such as but not limited to the following:
          </p>
          <div className="w-4/5 text-start text-xs">
            <ol type="1">
              <li>
                1. Grant exclusive licenses for the use of the Musical Work.
              </li>
              <li>
                2. Edit, alter or modify the musical work, especially the
                contributions of the other parties, in uses or sound recordings
                other than the one produced under this agreement unless
                authorized verbally or in writing by the co-author.
              </li>
              <li>
                3. Exploiting the name of other parties in a manner that
                suggests approval or endorsement of a third-party product or
                service other than the musical work itself.
              </li>
            </ol>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <a
          className="items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          onClick={() => router.push('/moreInfoVoting')}
        >
          Still not clear about voting? read here.
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

export default ContractBuilder5Vote
