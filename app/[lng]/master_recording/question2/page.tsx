"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useQuestion2 from "../../store/useQuestion2";
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
  const updateRecording = useQuestion2((state) => state.updateRecording);
  const [song, setSelectedOptionSong] = useState("");
  const [recording, setRecording] = useState("");
  const { lng } = params;
  const { t } = useTranslation(lng, "master/question2");

  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionSong(event.target.value);
  };

  const handleRecordingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecording(event.target.value);
  };

  const handleSubmit = () => {
    updateSong(song);
    updateRecording(recording);
    if (song != "" && recording != "") {
      push(`/master_recording/question3?${query}`);
    }
  };

  const query = new URLSearchParams({
    song,
    recording,
  }).toString();

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10 border-none">
          <p className="text-[1.5rem] mb-4 font-share">{t("songNameQuestion")}</p>
          <form className="flex flex-col">
            <label className="text-xs text-gray-500 w-full text-left mb-4 border-none py-0">
              {t("compositionLabel")}
            </label>
            <input
              type="text"
              name="type"
              onChange={handleSongChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2 font-rubik p-2"
              required
            />
            <label className="text-xs text-gray-500 w-full text-left mb-4 border-none py-0 pt-5 ">
              {t("masterLabel")}
            </label>
            <input
              type="text"
              name="type"
              onChange={handleRecordingChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2 font-rubik p-2"
              required
            />
          </form>
        </div>

        <div className="w-full sm:w-1/2">
          <p className="text-[0px] sm:text-sm text-gray-500 mb-4 font-roboto_light">
            {t("incompleteContractMessage")}
          </p>

          <h3 className="text-base font-bold mb-2 font-roboto_bold">
            {t("musicWorkIdentificationHeader")}
          </h3>
          <p className="text-sm sm:text-base font-roboto">
            {t("musicWorkIdentificationText")}
            {": "}
            <span className="text-[#AC4444] font-rubik">
              {song ? song : " "}
            </span>
            .
          </p>
          <br />
          <h3 className="text-base font-bold mb-2 font-roboto_bold">
            {t("masterRecordingIdentificationHeader")}
          </h3>
          <p className="text-sm sm:text-base font-roboto">
            {t("masterRecordingIdentificationText")}
            {""}
            <span className="text-[#AC4444] font-rubik">
              {recording ? recording : " "}
            </span>
            {t("masterRecordingClauseText")}
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3 mb-2">
        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5 pt-[10%] sm:pt-[15%]">
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
