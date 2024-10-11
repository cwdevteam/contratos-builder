'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const MoreInfoQ5 = () => {
  const { push } = useRouter()
  return (
    <div className="popup flex-col">
      <button
        onClick={() => push('/contract-builder')}
        className="popup_button"
      >
        x
      </button>
      <p>
        Voting ensures that each business decision is consulted with all of the
        copyright owners. Designating an administrator ensures faster decision
        making, but less consultation with copyright owners. However,
        administrators also have responsibilities and a duty to properly
        represent the interests of the copyright owners.
      </p>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4 float-left pt-10"
        onClick={() => push('/popups/moreInfoVoting')}
      >
        Still not clear about voting? read here.
      </a>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4 float-right pt-10"
        onClick={() => push('/popups/moreInfoAdmin')}
      >
        Still not clear about designating an admin? read here.
      </a>
    </div>
  )
}

export default MoreInfoQ5
