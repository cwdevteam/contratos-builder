"use client";

import React from "react";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import useQuestion5Vote from "../../store/useQuestion5Vote";
import { useTranslation } from "@/app/i18n/client";

const ContractBuilder5Vote = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter();
  const [percent, setPercent] = useState("");
  const updatePercent = useQuestion5Vote((state) => state.updatePercent);
  const { lng } = params;
  const { t } = useTranslation(lng, "master/question5vote");

  const handlePercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPercent(event.target.value);
  };

  const handleSubmit = () => {
    updatePercent(percent);
    if (percent != "") {
      push("/master_recording/success");
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <h1 className="text-lg sm:text-xl mb-4 font-share w-4/5 pt-5">
            {t("percent")}
          </h1>
          <form className="flex flex-col">
            <label className="text-xs sm:text-sm mb-2">(%)</label>
            <input
              type="text"
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white  w-1/5 p-2 font-rubik"
              onChange={handlePercentChange}
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-gray-500 mb-4 pt-20 font-roboto_light">
            {t("p1")}
          </p>
          <h4 className="text-base sm:text-lg font-bold mb-2 pt-5 font-roboto_bold">
            {t("2.0")}
          </h4>
          <p className="text-xs sm:text-sm mb-4 font-roboto_thin">
            {t("p2")}{" "}
            <span className="text-[#AC4444] font-rubik">
              {percent ? percent : " "}%
            </span>
            {t("p3")}
          </p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm">
            <li>{t("li1")}</li>
            <li>{t("li2")}</li>
            <li>{t("li3")}</li>
            <li>{t("li4")}</li>
          </ol>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-[#3167B4] underline underline-offset-4 text-sm sm:text-base"
          href="#"
          onClick={() => push("/popups/moreInfoVoting")}
        >
          {t("confused")}
        </a>
        <div className="inline-flex gap-20">
          <button
            onClick={() => push("/master_recording/question4")}
            className=" w-fit bg-[#AC444475]"
          >
            {t("back")}
          </button>
          <button onClick={handleSubmit} className=" w-fit bg-[#AC444475]">
            {t("submit")}
          </button>
        </div>
      </footer>
    </div>
  );
};

const WrappedContractBuilder5Vote = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContractBuilder5Vote params={{ lng: lng }} />
    </Suspense>
  );
};

export default WrappedContractBuilder5Vote;
