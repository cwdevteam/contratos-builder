"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useQuestion1 from "../store/useQuestion1";
import { useTranslation } from "@/app/i18n/client";
// import Popup from "reactjs-popup";

function ContractBuilder1({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const { lng } = params;
  const { t } = useTranslation(lng, "question1");
  const { push } = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState("");

  const updateSplit = useQuestion1((state) => state.updateSplit);
  const updateDate = useQuestion1((state) => state.updateDate);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
    setSelectedDate(date);
    const value = event.target.id;
    console.log(value);
    console.log(selectedDate);
  };

  const handleSubmit = () => {
    updateSplit(selectedOption);
    updateDate(selectedDate);
    if (selectedOption == t("option_songwriting")) {
      push("/musical_work/question2");
    } else if (selectedOption == t("option_master_recording")) {
      push("master_recording/question2");
    } else if (selectedOption == t("option_both")) {
      push("both/question2");
    }
  };

  const date = new Date().toLocaleDateString();

  return (
    <div className="p-4 sm:p-8 flex flex-col justify-between max-h-screen">
      <main className="flex flex-col sm:flex-row sm:gap-8 pt-10">
        <div className="sm:w-1/2 py-4 sm:py-10">
          <p className=" mb-4 font-share text-[1.5rem] w-full">{t("question_prompt")}</p>
          <form className="flex flex-col font-rubik items-start">
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("option_songwriting")}
                required
                //defaultChecked
              />
              {t("option_songwriting")}
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("option_master_recording")}
              />
              {t("option_master_recording")}
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("option_both")}
              />
              {t("option_both")}

              {/* {!isOpen2 && (
                <Popup
                  trigger={
                    <a className="items-center gap-2 underline underline-offset-4 font-share">
                      {t("read_more")}
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
                    <div className=" p-4 sm:p-8 flex flex-col justify-between">
                      <main className="flex flex-col gap-6 sm:gap-8">
                        <p className="text-sm sm:text-base space-y-4 font-roboto">
                          {t("disclaimer_both")}
                          <br />
                          {t("important_notice")}
                          <br />
                          {t("both_track_intro")}
                          <br />
                          <ol className="list-decimal list-inside">
                            <li>
                              {t("ownership_structures")}
                              <br />
                              <span>{t("ownership_details")}</span>
                            </li>
                            <li>
                              {t("participants")}
                              <br />
                              <span>{t("participants_details")}</span>
                            </li>
                          </ol>
                          {t("why_important")}
                          <br />
                          {t("metadata_details")}
                          <br />
                          <ul className="list-disc list-inside">
                            <li>
                              {t("ownership_percentages")}
                              <br />
                            </li>
                            <li>
                              {t("participant_roles")}
                              <br />
                            </li>
                            <li>
                              {t("copyright_registrations")}
                              <br />
                            </li>
                            <li>
                              {t("licenses_royalties")}
                              <br />
                            </li>
                          </ul>
                          {t("both_track_summary")}
                          <br />
                          {t("warning")}
                          <br />
                          {t("consult_legal")}
                          <br />
                          {t("acknowledgement")}
                          <br />
                        </p>
                        <button
                          onClick={() => {
                            setIsOpen2(true);
                            setTimeout(() => {
                              setIsOpen2(false);
                            }, 200);
                          }}
                          className="popup_button text-white hover:text-gray-300"
                        >
                          &times;
                        </button>
                      </main>
                    </div>
                  </div>
                </Popup>
              )} */}
            </label>
          </form>
        </div>
        <div className="font-roboto_bold">
          <p className="text-[0px] sm:text-[16px] pb-5 text-gray-500 font-roboto_light pt-0">
            {t("incomplete_contract_notice")}
          </p>
          <p className="p-5 pl-0">
            {t("copyright_agreement", { selectedOption: selectedOption })}
          </p>
          <p className="font-roboto_thin">
            {t("agreement_date")}{" "}
            <span className="text-[#AC4444] text-lg font-rubik">
              {selectedDate ? selectedDate : " "}
            </span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        {/* {!isOpen && (
          <Popup
            trigger={
              <a className="items-center gap-2 underline underline-offset-4 p-4 sm:mx-0 pb-5">
                {t("confusion_help")}
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
              <p className="py-5">{t("popups.popup_intro")}</p>
              <ol>
                <li className="py-5">
                  {" "}
                  <b>{t("popups.popup_composition_rights")}</b> {t("popups.popup_composition_details")}
                </li>
                <li className="py-5">
                  <b>{t("popups.popup_master_rights")}</b> {t("popups.popup_master_details")}
                </li>
              </ol>
              <p>{t("popups.popup_summary")}</p>
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
        )} */}

        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5 ">
          <button
            onClick={() => push("/")}
            className=" w-[15%]  bg-[#AC444475] flex-1 sm:flex-none"
          >
            {t("back_button")}
          </button>
          <button
            onClick={handleSubmit}
            className=" w-[15%]  bg-[#AC444475] flex-1 sm:flex-none"
          >
            {t("submit_button")}
          </button>
        </div>
      </footer>
      
    </div>
  );
}

export default ContractBuilder1;
