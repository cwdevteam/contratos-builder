'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

interface PopupProps {
  onClose: () => void
}

const Popup = ({ onClose }: PopupProps) => {
  const router = useRouter()
  return (
    <div className="popup flex-col">
      <p>
        Voting ensures that each business decision is consulted with all of the
        copyright owners. Designating an administrator ensures faster decision
        making, but less consultation with copyright owners. However,
        administrators also have responsibilities and a duty to properly
        represent the interests of the copyright owners.
      </p>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4"
        onClick={() => router.push('/moreInfoVoting')}
      >
        Still not clear about voting? read here.
      </a>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4"
        onClick={() => router.push('/moreInfoAdmin')}
      >
        Still not clear about designating an admin? read here.
      </a>
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  )
}

const ContractBuilder4 = () => {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))
  const [selectedOption, setSelectedOption] = useState('')

  const goToPage = (page: number) => {
    router.push(`/${page}`)
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  const findNextPage = () => {
    if (selectedOption == 'VOTE') {
      router.push('/question5vote')
    } else {
      router.push('question5admin')
    }
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

          <h4 className="pt-2 w-4/5 p-7">
            Would you like to vote when making business decisions or designate
            an administrator?
          </h4>
          <form className="flex flex-col p-7">
            <label className="p-2">
              <input
                type="radio"
                name="type"
                className="radio"
                value="VOTE"
                onChange={handleRadioChange}
                required
              />
              VOTE
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                className="radio"
                value="ADMIN"
                onChange={handleRadioChange}
                required
              />
              DESIGNATE ADMIN
            </label>
          </form>
        </div>
        <div className=" p-8 py-1">
          <p className="text-small text-gray-500 pt-10">
            Your contract has yet to be completed. Continue to fill out the
            decision tree.
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <a
          className="items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          onClick={togglePopup}
        >
          Confused with this bit too? read here.
        </a>
        <button onClick={findNextPage} className="border border-red">
          SUBMIT
        </button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </footer>
    </div>
  )
}

export default ContractBuilder4
