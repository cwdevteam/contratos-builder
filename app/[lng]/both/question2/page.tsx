"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useQuestion2 from "../../store/useQuestion2";
import useQuestion3 from "../../store/useQuestion3";
import { useTranslation } from "@/app/i18n/client";

const ContractBuilder2 = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter();
  const updateSong = useQuestion2((state) => state.updateSong);
  //const updateRecording = useQuestion2((state) => state.updateRecording);
  const [song, setSelectedOptionSong] = useState("");
  //const [recording, setRecording] = useState("");
  const { lng } = params;
  const { t } = useTranslation(lng, "both/question2");
  const updateContributorCount = useQuestion3(
    (state) => state.updateContributorCount
  );
  const [pageCount, setPageCount] = useState<number | null>(null);

  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionSong(event.target.value);
  };

  const handleContributorsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const contributors = Number(event.target.value);
    setPageCount(contributors)!;
    updateContributorCount(contributors);
  };

  // const handleRecordingChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRecording(event.target.value);
  // };

  const handleSubmit = () => {
    updateSong(song);
    //updateRecording(recording);
    if (pageCount && pageCount > 0 && song!="") {
      push(`/both/1?pageCount=${pageCount}`);
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10 border-none">
          <p className="text-[1.5rem] mb-4 font-share">{t("songNameQuestion")}</p>
          <form className="flex flex-col">
            <input
              type="text"
              name="type"
              onChange={handleSongChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2 font-rubik p-2"
              required
            />
          </form>
          <div className="text-[#696969] w-full text-left mb-4 border-none font-share text-sm ">
          <p className="text-[#FFFFFF] text-[1.5rem] pt-10">{t("collaboratorsQuestion")}</p>
          <form className="flex flex-col pt-5">
            <input
              type="number"
              name="type"
              onChange={handleContributorsChange}
              min="1"
              className="rounded-lg bg-black border border-white border-[.125rem] text-white focus:outline-none focus:ring-2 focus:ring-white w-[3rem] font-rubik p-1"
              required
            />
          </form>
        </div>
        </div>

        <div className="w-full sm:w-1/2">
          <p className="sm:text-sm text-gray-500 mb-4 font-roboto_light text-[0px]">
            {t("incompleteContractMessage")}
          </p>

          <h3 className="text-base font-bold mb-2 font-roboto_bold">
            {t("musicWorkIdentificationHeader")}
          </h3>
          <p className="text-sm sm:text-base font-roboto">
            {t("musicWorkIdentificationText")}{" "}
            <span className="text-[#AC4444] font-rubik">
              {song ? song : " "}
            </span>
          </p>
          <br />
          <h3 className="text-base font-bold mb-2 font-roboto_bold">
            {t("masterRecordingIdentificationHeader")}
          </h3>
          <p className="text-sm sm:text-base font-roboto">
            {t("masterRecordingIdentificationText")}
            {""}
            <span className="text-[#AC4444] font-rubik">
              {song ? song : " "}
            </span>
            {t("masterRecordingIdentificationContinuation")}
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3 mb-2">
        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5">
          <button
            onClick={() => push("/question1")}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("backButton")}
          </button>
          <button
            onClick={handleSubmit}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("nextButton")}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ContractBuilder2;
