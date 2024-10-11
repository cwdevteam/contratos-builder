'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const VotingInfo = () => {
  const { push } = useRouter()

  return (
    <div>
      <button onClick={() => push(`/contract-builder`)}>x</button>
      <p>
        When multiple people own a piece of intellectual property (IP), such as
        a song, the governance of that IP—meaning how decisions are made and
        actions are taken—depends on the percentage of ownership that each party
        holds. Here`&apos`s a technical breakdown of how this works:
      </p>
      <ol>
        <li>
          1. Percentage-Based Ownership Ownership of IP can be divided among
          different parties based on agreed-upon percentages. These percentages
          represent how much control and financial stake each person or entity
          has in the IP.
        </li>
        <li>
          2. Governance and Decision-Making When decisions need to be made
          regarding the IP (e.g., licensing the work, distribution deals,
          marketing strategies), the ownership percentages come into play.
          Typically, decisions are made through voting or consensus among the
          owners, and the weight of each vote is determined by ownership
          percentages.
          <ol>
            <li>a. Simple Majority</li>
            <li>b. Unanimous Agreement</li>
            <li>
              c. Supermajority Defined as a specific percentage higher than 50%
              which might be 66%, 75%, or another threshold. This rule is often
              used for high-impact decisions.
            </li>
            <li>
              d. Anyone - A low enough percentage threshold is set for decision
              making which enables any one rights owner in the work to make a
              decision legal or business decision on behalf of the group.
            </li>
          </ol>
        </li>
        <li>
          3. Financial Considerations Financial returns from the IP are tied to
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
          4. Dispute Management In case of conflicts, the governance agreement
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
        To avoid disputes, it`&apos`s essential to establish a governance
        agreement that clearly defines how business and administrative decisions
        will be handled and how revenue will be split.
      </p>
    </div>
  )
}

export default VotingInfo
