'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const VotingInfo = () => {
  const { push } = useRouter()

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col">
      <button 
        onClick={() => push(`/question4`)}
        className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Close
      </button>
      <div className="space-y-4 text-sm sm:text-base">
        <p>
          When multiple people own a piece of intellectual property (IP), such as
          a song, the governance of that IP—meaning how decisions are made and
          actions are taken—depends on the percentage of ownership that each party
          holds. Here`&apos`s a technical breakdown of how this works:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Percentage-Based Ownership: Ownership of IP can be divided among
            different parties based on agreed-upon percentages. These percentages
            represent how much control and financial stake each person or entity
            has in the IP.
          </li>
          <li>
            Governance and Decision-Making: When decisions need to be made
            regarding the IP (e.g., licensing the work, distribution deals,
            marketing strategies), the ownership percentages come into play.
            Typically, decisions are made through voting or consensus among the
            owners, and the weight of each vote is determined by ownership
            percentages.
            <ol className="list-lower-alpha pl-5 mt-2 space-y-1">
              <li>Simple Majority</li>
              <li>Unanimous Agreement</li>
              <li>Supermajority: Defined as a specific percentage higher than 50% which might be 66%, 75%, or another threshold. This rule is often used for high-impact decisions.</li>
              <li>Anyone: A low enough percentage threshold is set for decision making which enables any one rights owner in the work to make a decision legal or business decision on behalf of the group.</li>
            </ol>
          </li>
          <li>
            Financial Considerations: Financial returns from the IP are tied to
            ownership percentages, governance also affects how revenue is shared:
            <ul>
              <li>
                Royalties & Profits: Each owner gets paid based on their
                percentage ownership.
              </li>
              <li>
                Expenses: Owners may agree to share costs (e.g., for marketing,
                legal fees, or production). How expenses are divided is usually
                outlined in a governance agreement.
              </li>
            </ul>
          </li>
          <li>
            Dispute Management: In case of conflicts, the governance agreement
            should detail how disagreements will be resolved. Common methods
            include:
            <ul>
              <li>
                Majority Rule: If one owner disagrees, but the majority agrees,
                the decision is enacted.
              </li>
              <li>
                Veto Rights: Owners with specific percentages might have veto
                power over certain decisions.
              </li>
              <li>
                Third-Party Arbitration: A neutral third party may step in to
                resolve disputes if the owners can`&apos`t agree.
              </li>
            </ul>
          </li>
        </ol>
        <p>
          To avoid disputes, it`&apos`s essential to establish a governance agreement
          that clearly defines how business and administrative decisions will be
          handled and how revenue will be split.
        </p>
      </div>
    </div>
  )
}

export default VotingInfo
