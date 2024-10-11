'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PopupProps {
  onClose: () => void
}

const Popup = ({ onClose }: PopupProps) => {
  return (
    <div className="popup flex flex-col">
      <p>
        Self-publishing and self-distributing your music means that you, as an
        artist or as a part of a group of creatives, take full control over the
        song writing, production, release, and distribution of your work without
        relying on traditional publishers or music labels. Here's a technical
        breakdown of what that entails:
      </p>
      <ol>
        <li>
          1. Self-Publishing
          <br />
          What is Publishing?
          <br />
          Publishing refers to the rights management of your music. When you
          write or compose a song, you own the copyright to that piece of music.
          Copyright ensures that you are paid when your music is used
          commercially, such as when it is streamed, played on the radio, or
          used in TV or film.
        </li>
        <li>
          2. Self-Distribution
          <br />
          What is Distribution?
          <br />
          Distribution is the process of getting your recorded music onto
          various platforms, both digital (streaming services, downloads)
          physical (CDs, vinyl, etc.), or in NFT format.
        </li>
        <li>
          3. Legal Responsibilities
          <br />
          Contracts & Licensing: As a self-published and self-distributed
          artist, you must be familiar with basic music contracts, licensing
          agreements, and intellectual property laws.
          <br />
          Copyright Registration: Although you automatically own the copyright
          to your music upon creation, registering it with the U.S. Copyright
          Office (or the equivalent in your country) provides additional legal
          protection.
          <br />
        </li>
      </ol>
      Summary
      <br />
      <p>
        By self-publishing and self-distributing, you keep all the creative and
        financial control over your music but take on the added responsibility
        of managing rights, royalties, promotion, distribution logistics and
        financial distribution. You need to be well-organized and either learn
        how to handle these aspects, hire professionals or use online tools to
        assist you.
      </p>
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  return (
    <div className="float-root text-start min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start w-3/5 ">
        <h3>
          Welcome to the <b>MESA</b> music contract builder.
        </h3>
        <p>
          Here are a series of questions to help you build an agreement for your
          music release. Just click the button to get started. To navigate back
          and change a previous answer, click on the previous question above
          (text in gray).
        </p>
        <p>
          For the time being, this contract template is meant only for artists
          who:
        </p>
        <ol>
          <li>Are releasing a song digitally via DSPs</li>
          <li>Are publishing their song independently</li>
          <li>Are distributing thejr master recording independently</li>
        </ol>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <a
          className="items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          onClick={togglePopup}
        >
          If confused, read here
        </a>
        <button onClick={() => router.push('/disclaimer')}>GET STARTED</button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </footer>
    </div>
  )
}
