'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const AdminInfo = () => {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push(`/question4`)}>x</button>
      <p>
        In the context of music intellectual property (IP), an administrator is
        responsible for managing the rights and revenues associated with a
        songwriter's or composer's music. This role typically involves
        overseeing various aspects of licensing, royalty collection, and
        ensuring proper copyright protection. Administrators often work with
        music publishers, but independent songwriters and artists can also hire
        them directly to handle the business side of their music. Here’s a
        breakdown of what a music IP administrator typically does:
      </p>
      <ol>
        <li>
          Copyright Registration: They ensure that the song or composition is
          properly registered with the relevant copyright offices and performing
          rights organizations (PROs) to protect the intellectual property.
        </li>
        <li>
          Licensing: Administrators negotiate and manage licenses for the use of
          the music. This can include synchronization licenses (for film, TV,
          and commercials), mechanical licenses (for physical or digital
          distribution), and public performance licenses (for radio, live
          performances, etc.).
        </li>
        <li>
          Royalty Collection: They monitor and collect royalties from various
          sources, including streaming services, radio, live performances, and
          sales, both domestically and internationally. Distributing
        </li>
        <li>
          Payments: Administrators distribute royalties to the songwriters,
          composers, and any other rights holders, ensuring that all parties
          receive their fair share.
        </li>
        <li>
          Rights Enforcement: They monitor the use of the music to make sure
          it’s not being used without permission, and they may take legal action
          in cases of infringement or unauthorized use.
        </li>
        <li>
          Reporting and Auditing: Administrators provide detailed reports on
          royalties and earnings and may also audit music users or platforms to
          ensure accurate payment.
        </li>
      </ol>
      <p>
        Overall, the administrator acts as a key business manager for the
        intellectual property of music, ensuring that the creators are
        compensated and their rights are protected.
      </p>
    </div>
  )
}

export default AdminInfo
