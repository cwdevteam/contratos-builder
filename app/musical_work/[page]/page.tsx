'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import useDynamicPageStore from '../../store/use[page]'

const DynamicPage = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const pageNumber = Number(params.page)
  const pageCount = Number(searchParams.get('pageCount'))
  const lastSplit = Number(searchParams.get('split'))

  // Get page data from the Zustand store
  const pageData = useDynamicPageStore((state) => state.pages[pageNumber] || {});

  // Local state for input fields
  const [legalName, setLegalName] = useState(pageData.legalName || '');
  const [email, setEmail] = useState(pageData.email || '');
  const [contributorType, setContributorType] = useState(pageData.contributorType || '');
  const [split, setSplit] = useState<number>(pageData.split || 0);
  
  const [splitTotal, setSplitTotal] = useState<number>(lastSplit || 0);

  // Update Zustand store only if inputs change
  useEffect(() => {
    const data = {
      legalName,
      email,
      contributorType,
      split,
    };
    useDynamicPageStore.setState((state) => ({
      pages: {
        ...state.pages,
        [pageNumber]: { ...state.pages[pageNumber], ...data },
      },
    }));
  }, [legalName, email, contributorType, split, pageNumber]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLegalName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleContributorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setContributorType(event.target.value);
  };

  const handleSplitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if ((value < 101 && value > 0) && value != null) {
      setSplit(value);
      setSplitTotal(value + lastSplit);
    }
  };

  const handleNextPage = () => {
    if (pageNumber >= pageCount && splitTotal !== 100) {
      document.getElementById('wrongSplits')!.innerHTML =
        'Splits need to add to 100% to be valid';
    } else {
      if(legalName !='' && email != '' && contributorType != '' && split != 0){
        const nextPage = pageNumber + 1;
        router.push(pageNumber >= pageCount ? `/musical_work/question4` : `/musical_work/${nextPage}?pageCount=${pageCount}&split=${splitTotal}`);
      }
      }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          {/* Previous question buttons */}
          <div className="mb-4">
            <button
              onClick={() => router.push('/question1')}
              className="text-xs text-gray-500 w-full border-0 relative text-start border-none"
            >
              What type of splits contract would you like to create?
            </button>
            <button
              onClick={() => router.push('/musical_work/question2')}
              className="text-xs text-gray-500 w-full border-0 relative text-start border-none"
            >
              What is the name of the song?
            </button>
            <button
              onClick={() => router.push('/musical_work/question3')}
              className="text-xs text-gray-500 w-full border-0 relative text-start border-none"
            >
              How many collaborators contributed to writing the song?
            </button>

            {Array.from({ length: pageNumber - 1 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => router.push(`/musical_work/${i + 1}?pageCount=${pageCount}`)}
                className="text-xs text-gray-500 w-full border-0 relative text-start border-none"
              >
                Contributor {i + 1}
              </button>
            ))}
          </div>
          <h2 className="text-lg sm:text-xl mb-4">Contributor {pageNumber}</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="text-xs sm:text-sm mb-2 block">Legal Name (First Last)</label>
              <input
                type="text"
                value={legalName}
                onChange={handleNameChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm mb-2 block">Email (example@mesawallet.io)</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm mb-2 block">Type of contributor</label>
              <select
                name="type"
                id="cont"
                value={contributorType}
                className="bg-black w-full sm:w-1/2"
                onChange={handleContributorChange}
                required
              >
                <option value="blank"></option>
                <option value="LYRIC">Lyrics</option>
                <option value="MUSIC">Music</option>
                <option value="BOTH">BOTH</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm mb-2 block">Split (%)</label>
              <input
                type="number"
                max="100"
                onChange={handleSplitChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2"
                required
              />
            </div>
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Your contract has yet to be completed. Continue to fill out the decision tree.
          </p>
          <h3 className="text-base sm:text-lg font-bold mb-2">1.0 Music Work Identification</h3>
          <p className="text-sm sm:text-base mb-4">
            The parties acknowledge and accept their contribution to the
            authorship or composition of the musical work and agree to the
            distribution of copyright ownership as follows:
          </p>
          <h3 className="text-base sm:text-lg font-bold mb-2">Collaborator {pageNumber}:</h3>
          <p className="text-sm sm:text-base">
            Legal Name: <span className="text-red-500">{legalName}</span>
          </p>
          <p className="text-sm sm:text-base">
            Email Address: <span className="text-red-500">{email}</span>
          </p>
          <p className="text-sm sm:text-base">
            Contribution: <span className="text-red-500">{contributorType}</span>
          </p>
          <p className="text-sm sm:text-base">
            Split (%): <span className="text-red-500">{split}</span>
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <p id="wrongSplits" className="text-red-500 text-sm sm:text-base"></p>
        <button 
          onClick={handleNextPage}
          className=" text-white py-2 px-4 rounded-lg w-full"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default DynamicPage;
