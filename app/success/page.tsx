'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { jsPDF } from 'jspdf';

import useQuestion1 from '../store/useQuestion1';
import useQuestion2 from '../store/useQuestion2';
import useQuestion3 from '../store/useQuestion3';
import useQuestion4 from '../store/useQuestion4';
import useDynamicPageStore from '../store/use[page]';
import useQuestion5Admin from '../store/useQuestion5Admin';
import useQuestion5Vote from '../store/useQuestion5Vote';

const Success = () => {
  const { push } = useRouter()

  const split = useQuestion1((state) => state.split)
  //const date = useQuestion1((state) => state.date)
  const song = useQuestion2((state) => state.song)
  const contributorCount = useQuestion3((state) => state.contributorCount)
  const voteSelection = useQuestion4((state) => state.voteSelection)
  const pages = useDynamicPageStore((state) => state.pages);
  const adminName = useQuestion5Admin((state) => state.adminName)
  const percent = useQuestion5Vote((state) => state.percent)

  const viewContract = () => {}
  const downloadUnsigned = () => {

    const doc = new jsPDF();

    let y = 10;
    const lineheight = 10;

    doc.text("Unsigned Splits Contract:",(doc.internal.pageSize.getWidth()/2)-12,y)
    y+=lineheight;

    doc.text(`Split: Master Recording`, 10, y); 
    y+=lineheight;
    doc.text(`Date: ${split}`, 10, y); 
    y+=lineheight;
    doc.text(`Song: ${song}`, 10, y); 
    y+=lineheight;
    doc.text(`contributor Count: ${contributorCount}`, 10, y);
    y+=lineheight; 
    doc.text(`vote Selection: ${voteSelection}`, 10, y); 
    y+=lineheight;
    
    //useDynamicPageStore
    Object.keys(pages).forEach((id) => {
      const pageData = pages[Number(id)];
      doc.text(`Contributor ${id}`, 10, y);  // Add contributor number
      y+=lineheight;
      doc.text(`Legal Name: ${pageData.legalName}`, 10, y);  // Add Legal Name
      y+=lineheight;
      doc.text(`Email: ${pageData.email}`, 10, y);  // Add Email
      y+=lineheight;
      doc.text(`Contributor Type: ${pageData.contributorType}`, 10, y);  // Add Contributor Type
      y+=lineheight;
      doc.text(`Split %: ${pageData.split}`, 10, y);  // Add Split
      y+=lineheight;
      
      if (y>280) {
        doc.addPage();
        y=10;
      }
    });
    doc.text(`Admin Name: ${adminName}`, 10, y);
    y+=lineheight; 
    doc.text(`Percent: ${percent}`, 10, y); 

    doc.save('unsignedContract.pdf');
  }
  const sendContract = () => {}

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <div className="mb-4">
            <button
              onClick={() => push('/question1')}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
            >
              What type of splits contract would you like to create?
            </button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Congrats! You&apos;re protecting your art.
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            DRAFT CONTRACT CREATED!
          </h2>
          <div className="flex flex-col gap-4">
            <button 
              onClick={viewContract}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              VIEW CONTRACT
            </button>
            <button 
              onClick={downloadUnsigned}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              DOWNLOAD UNSIGNED VERSION
            </button>
            <button 
              onClick={sendContract}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              SEND DOCUSIGN TO COLLABORATORS
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">Congrats! You&apos;re protecting your art.</p>
          <h4 className="text-base sm:text-lg">
            Don&apos;t forget to review it with your colleagues or with a lawyer,
            customize it if needed and sign it when you are ready!
          </h4>
        </div>
      </main>
    </div>
  )
}

export default Success
