"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useJurisdiction from "../store/useJurisdiction";
import { useTranslation } from "@/app/i18n/client";
import Popup from "reactjs-popup";

function Jurisdiction({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const { lng } = params;
  const { t } = useTranslation(lng, "jurisdiction");
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [jurisdiction, setJurisdiction] = useState('');
  
  useEffect(() => {
    if(lng=="en"){
        document.getElementById("if-usa")!.innerText = t("if-usa");
      }
  }, []);
  

  const updateJurisdiction = useJurisdiction((state) => state.updateJurisdiction);

  const handleJurisdictionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJurisdiction(event.target.id);
    const value = event.target.id;
    console.log(value);
  };

  const handleSubmit = () =>{
    updateJurisdiction(jurisdiction);
    push(`${lng}/question1`)
  }

  return (
    <div className="p-4 flex flex-col justify-between max-h-screen">
      <main className="flex flex-col sm:flex-row sm:gap-8">
        <div className="sm:w-full py-4 ">
          <p className=" mb-4 font-share text-[1.5rem] w-full">{t("jurisdiction")}</p>
          <br/>
          <p className="text-[.7rem] text-gray-500 py-2" id="if-usa"></p>
              <input
                type="text"
                name="type"
                onChange={handleJurisdictionChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full p-2 font-rubik"
                id={t("jurisdiction")}
                required
                //defaultChecked
              />
        </div>
        <div className="font-roboto_bold">
          <p className="text-[0px] sm:text-[16px] pb-5 text-gray-500 font-roboto_light pt-0">
            {t("yet-to-complete")}
          </p>
          <h1 className="p-5 pl-0">
            {t("dispute")}
          </h1>
          <p className="font-roboto_thin">
            {t("jurisdiction-statement")}{" "}
            <span className="text-[#AC4444] text-lg font-rubik">
              {jurisdiction ? jurisdiction : " "}
            </span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        {!isOpen && (
          <Popup
            trigger={
              <a className="items-center gap-2 underline underline-offset-4 p-4 sm:mx-0 pb-5">
                {t("read-here")}
              </a>
            }
            position="center center"
            modal
            nested
            className="popup"
            closeOnDocumentClick
          >
            <div
              className="modal border-2 border-white"
              style={{
                height: "80vh",
                width: "90vw",
                maxWidth: "600px",
                overflowY: "scroll",
              }}
            >
              <p className="pt-20">{t("more-info")}</p>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setTimeout(() => {
                    setIsOpen(false);
                  }, 200);
                }}
                className="popup_button text-white hover:text-gray-300"
              >
                &times;
              </button>
            </div>
          </Popup>
        )}

        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5 pt-[20%] sm:pt-[10%]">
          <button
            onClick={() => push("/")}
            className=" w-[15%]  bg-[#AC444475] flex-1 sm:flex-none"
          >
            {t("back")}
          </button>
          <button
            onClick={handleSubmit}
            className=" w-[15%]  bg-[#AC444475] flex-1 sm:flex-none"
          >
            {t("submit")}
          </button>
        </div>
      </footer>
      
    </div>
  );
}

export default Jurisdiction;
