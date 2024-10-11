'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const MoreInfoQ1 = () => {
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
        In music industry, there are two primary types of works: Musical
        Compositions and Sound Recordings These two kinds of works have their
        own copyright.
      </p>
      <ol>
        <li>
          1.{' '}
          <b>
            Copyright in Musical Composition (Publishing Rights or Composition
            Rights):
          </b>{' '}
          Relate to the “song” or underlying composition—the lyrics and melody
          of a song, independent of any particular recording. These rights are
          divided between the songwriter (or composer) and the music publisher.
          The publisher manages the songwriter’s composition by licensing it for
          use, collecting royalties, and ensuring it is properly credited. The
          key components of publishing rights include performance rights,
          mechanical rights, and synchronization rights (for use in films, TV,
          etc.).
        </li>
        <li>
          2. <b>Copyright in Sound Recordings (MASTER Rights):</b> Pertains to
          the ownership of a particular recording of a performance of a song.
          Whoever owns the master rights controls the use, distribution,
          reproduction, and performance of that specific recording. These rights
          typically belong to the record label or the artist who financed the
          production of the recording, though they can be sold or licensed.
        </li>
      </ol>
      <p>
        Both rights are crucial for monetizing and legally protecting music. The
        copyright controls the use of a specific recording, while publishing
        rights control the use of the song`&apos`s composition.
      </p>
    </div>
  )
}

export default MoreInfoQ1
