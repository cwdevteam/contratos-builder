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
  const [song, setSelectedOptionSong] = useState("");

  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionSong(event.target.value);
  };

  const handleSubmit = () => {
    updateSong(song);
    if (song != "") {
      push(`/musical_work/question3?${query}`);
    }
  };

  const query = new URLSearchParams({
    song,
  }).toString();

  const { lng } = params;
  const { t } = useTranslation(lng, "musical_work/question2");

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10 border-none">
          <p className="text-[1.5rem] mb-4 font-share">{t("p1")}</p>
          <form className="flex flex-col">
            <input
              type="text"
              name="type"
              onChange={handleSongChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2 font-rubik p-2"
              required
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 pt-20">
          <p className="text-gray-500 mb-4 font-roboto_light text-[0px] sm:text-[16px]">
            {t("p2")}
          </p>
          <h3 className="text-base font-bold mb-2 font-roboto_bold">
            {t("h3")}
          </h3>
          <p className="text-sm sm:text-base font-share">
            {t("p3")}{" "}
            <span className="text-[#AC4444] font-rubik">
              {song ? song : " "}
            </span>
            .
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3 mb-2">
        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5 pt-[30%] sm:pt-[20%]">
          <button
            onClick={() => push("/question1")}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("back")}
          </button>
          <button
            onClick={handleSubmit}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("submit")}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ContractBuilder2;
