'use client'

import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import useQuestion4 from '../../store/useQuestion4'

interface PopupProps {
  onClose: () => void
}

const Popup = ({ onClose }: PopupProps) => {
  const {push} = useRouter()
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
        onClick={() => push('/popups/moreInfoVoting')}
      >
        Still not clear about voting? read here.
      </a>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4"
        onClick={() => push('/popups/moreInfoAdmin')}
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
  const {push} = useRouter()

  const [showPopup, setShowPopup] = useState(false)
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))
  const [selectedOption, setSelectedOption] = useState('')

  const updateVoteSelection = useQuestion4((state) => state.updateVoteSelection);

  const goToPage = (page: number) => {
    push(`/${page}`)
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
    
  }

  const findNextPage = () => {
    updateVoteSelection(selectedOption)
    if (selectedOption == 'VOTE') {
      push('/both/question5vote')
    } else {
      push('/both/question5admin')
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
            onClick={() => push('/both/question2')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-4 border-none"
          >
            What is the name of the song?
          </button>
          <button
            onClick={() => push('/both/question3')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-4 border-none"
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

          <h4 className="text-sm sm:text-base mb-4">
            Would you like to vote when making business decisions or designate an administrator?
          </h4>
          <form className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                className="radio mr-2"
                value="VOTE"
                onChange={handleRadioChange}
                required
              />
              <span className="text-sm sm:text-base">VOTE</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                className="radio mr-2"
                value="ADMIN"
                onChange={handleRadioChange}
                required
              />
              <span className="text-sm sm:text-base">DESIGNATE ADMIN</span>
            </label>
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Your contract has yet to be completed. Continue to fill out the decision tree.
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-blue-500 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="#"
          onClick={togglePopup}
        >
          Confused with this bit too? read here.
        </a>
        <button 
          onClick={findNextPage}
          className="text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          SUBMIT
        </button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </footer>
    </div>
  )
}

const WrappedContractBuilder4 = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ContractBuilder4 />
  </Suspense>
)

export default WrappedContractBuilder4
