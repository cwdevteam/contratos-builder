"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useQuestion4 from "../../store/useQuestion4";
import { useTranslation } from "@/app/i18n/client";

interface PopupProps {
  onClose: () => void;
  params: {
    lng: string;
  };
}

const Popup = ({ onClose, params }: PopupProps) => {
  const { push } = useRouter();
  const { lng } = params;
  const { t } = useTranslation(lng, "master/question4");
  return (
    <div className="popup flex-col">
      <p>{t("popups.1")}</p>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4"
        onClick={() => push("/popups/moreInfoVoting")}
      >
        {t("popups.2")}
      </a>
      <a
        className="items-center gap-2 hover:underline hover:underline-offset-4"
        onClick={() => push("/popups/moreInfoAdmin")}
      >
        {t("popups.3")}
      </a>
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  );
};

const ContractBuilder4 = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const searchParams = useSearchParams();
  const pageCount = Number(searchParams.get("pageCount"));
  const [selectedOption, setSelectedOption] = useState("");
  const updateVoteSelection = useQuestion4(
    (state) => state.updateVoteSelection
  );
  const { lng } = params;
  const { t } = useTranslation(lng, "master/question4");

  const goToPage = (page: number) => {
    push(`/master_recording/${page}?pageCount=${pageCount}`);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const findNextPage = () => {
    updateVoteSelection(selectedOption);
    if (selectedOption == "VOTE") {
      push("/master_recording/question5vote");
    } else if (selectedOption == "ADMIN") {
      push("/master_recording/question5admin");
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <button
            onClick={() => push("/question1")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none p-0 font-share"
          >
            {t("back1")}
          </button>
          <button
            onClick={() => push("/master_recording/question2")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-4 border-none p-0 font-share"
          >
            {t("back2")}
          </button>
          <button
            onClick={() => push("/master_recording/question3")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-4 border-none p-0 font-share"
          >
            {t("back3")}
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none p-0 font-share"
            >
              {t("contributor")} {i + 1}
            </button>
          ))}

          <h4 className="mb-4 pt-5 font-share text-[1.5rem]">
            {t("question")}
          </h4>
          <form className="flex flex-col gap-2">
            <label className="flex items-center font-rubik">
              <input
                type="radio"
                name="type"
                className="radio mr-2"
                value="VOTE"
                onChange={handleRadioChange}
                required
              />
              <span className="text-sm sm:text-base">{t("vote")}</span>
            </label>
            <label className="flex items-center font-rubik">
              <input
                type="radio"
                name="type"
                className="radio mr-2"
                value="ADMIN"
                onChange={handleRadioChange}
                required
              />
              <span className="text-sm sm:text-base">{t("admin")}</span>
            </label>
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-gray-500 mb-4 font-share pt-20">{t("p1")}</p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-[#3167B4] underline underline-offset-4 text-sm sm:text-base "
          href="#"
          onClick={togglePopup}
        >
          {t("confused")}
        </a>
        <button
          onClick={findNextPage}
          className="text-white py-2 px-4 rounded  transition-colors w-fit"
        >
          {t("submit")}
        </button>
        {showPopup && (
          <Popup onClose={() => setShowPopup(false)} params={{ lng: lng }} />
        )}
      </footer>
    </div>
  );
};

const WrappedContractBuilder4 = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContractBuilder4 params={{ lng: lng }} />
    </Suspense>
  );
};

export default WrappedContractBuilder4;
