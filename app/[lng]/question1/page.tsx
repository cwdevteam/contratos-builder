"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useQuestion1 from "../store/useQuestion1";
import { useTranslation } from "@/app/i18n/client";

interface PopupProps {
  onClose: () => void;
  params: {
    lng: string;
  };
}

const Popup = ({ onClose, params }: PopupProps) => {
  const { lng } = params;
  const { t } = useTranslation(lng, "question1");
  return (
    <div className="popup flex-col">
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
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  );
};

function ContractBuilder1({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const { push } = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
    if (selectedOption == t("id1")) {
      push("/musical_work/question2");
    } else if (selectedOption == t("id2")) {
      push("master_recording/question2");
    } else if (selectedOption == t("id3")) {
      push("both/question2");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const date = new Date().toLocaleDateString();

  const { lng } = params;
  const { t } = useTranslation(lng, "question1");

  return (
    <div className="sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row sm:gap-8 pt-10">
        <div className="sm:w-1/2 py-4 sm:py-10">
          <p className=" mb-4 font-share text-[1.5rem] w-3/5">{t("p1")}</p>
          <form className="flex flex-col font-rubik items-start">
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("id1")}
                required
              />
              {t("li1")}
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("id2")}
              />
              {t("li2")}
            </label>
            <label className="p-2">
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id={t("id3")}
              />
              {t("li3")}
            </label>
          </form>
        </div>
        <div className=" p-8 font-roboto_bold">
          <p className="text-small pb-5 text-gray-500 font-roboto_light">
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
        <a
          className="items-center gap-2 underline underline-offset-4"
          href="#"
          onClick={togglePopup}
        >
          {t("if-confused")}
        </a>
        <button onClick={handleSubmit} className=" w-fit">
          {t("submit")}
        </button>
        {showPopup && (
          <Popup onClose={() => setShowPopup(false)} params={{ lng: lng }} />
        )}
      </footer>
    </div>
  );
}

export default ContractBuilder1;
