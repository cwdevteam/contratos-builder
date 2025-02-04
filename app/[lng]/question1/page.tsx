"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useQuestion1 from "../store/useQuestion1";
import { useTranslation } from "@/app/i18n/client";
import Popup from "reactjs-popup";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(t("li1"));
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
    if (selectedOption == t("li1")) {
      push("/musical_work/question2");
    } else if (selectedOption == t("li2")) {
      push("master_recording/question2");
    } else if (selectedOption == t("li3")) {
      push("both/question2");
    }
  };

  const date = new Date().toLocaleDateString();

  return (
    <div className="p-4 sm:p-8 flex flex-col justify-between max-h-screen">
      <main className="flex flex-col sm:flex-row sm:gap-8 pt-10">
        <div className="sm:w-1/2 py-4 sm:py-10">
          <p className=" mb-4 font-share text-[1.5rem] w-full">{t("p1")}</p>
          <form className="flex flex-col font-rubik items-start">
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("li1")}
                required
                //defaultChecked
              />
              {t("li1")}
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("li2")}
              />
              {t("li2")}
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("li3")}
              />
              {t("li3")}

              {!isOpen2 && (
                <Popup
                  trigger={
                    <a className="items-center gap-2 underline underline-offset-4 font-share">
                      {t("read-more")}
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
                          {t("1")}
                          <br />
                          {t("2")}
                          <br />
                          {t("3")}
                          <br />
                          <ol className="list-decimal list-inside">
                            <li>
                              {t("4")}
                              <br />
                              <span>{t("5")}</span>
                            </li>
                            <li>
                              {t("6")}
                              <br />
                              <span>{t("7")}</span>
                            </li>
                          </ol>
                          {t("8")}
                          <br />
                          {t("9")}
                          <br />
                          <ul className="list-disc list-inside">
                            <li>
                              {t("10")}
                              <br />
                            </li>
                            <li>
                              {t("11")}
                              <br />
                            </li>
                            <li>
                              {t("12")}
                              <br />
                            </li>
                            <li>
                              {t("13")}
                              <br />
                            </li>
                          </ul>
                          {t("14")}
                          <br />
                          {t("15")}
                          <br />
                          {t("16")}
                          <br />
                          {t("17")}
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
              )}
            </label>
          </form>
        </div>
        <div className="font-roboto_bold">
          <p className="text-[0px] sm:text-[16px] pb-5 text-gray-500 font-roboto_light pt-0">
            {t("p2")}
          </p>
          <p className="p-5 pl-0">
            {t("p3", { selectedOption: selectedOption })}
          </p>
          <p className="font-roboto_thin">
            {t("p4")}{" "}
            <span className="text-[#AC4444] text-lg font-rubik">
              {selectedDate ? selectedDate : " "}
            </span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        {!isOpen && (
          <Popup
            trigger={
              <a className="items-center gap-2 underline underline-offset-4 p-4 sm:mx-0 pb-5">
                {t("if-confused")}
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
              <p className="py-5">{t("popups.1")}</p>
              <ol>
                <li className="py-5">
                  {" "}
                  <b>{t("popups.2")}</b> {t("popups.3")}
                </li>
                <li className="py-5">
                  <b>{t("popups.4")}</b>
                </li>
              </ol>
              <p>{t("popups.5")}</p>
              <p className="pt-5">{t("popups.6")}</p>
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

export default ContractBuilder1;
