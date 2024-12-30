"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useQuestion5Admin from "../../store/useQuestion5Admin";
import { useTranslation } from "@/app/i18n/client";

const ContractBuilder5Admin = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Number(searchParams.get("pageCount"));
  const [name, setSelectedOptionName] = useState("");
  const updateAdminName = useQuestion5Admin((state) => state.updateAdminName);
  const { lng } = params;
  const { t } = useTranslation(lng, "musical_work/question5admin");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionName(event.target.value);
  };

  const goToPage = (page: number) => {
    push(`musical_work/${page}`);
  };

  const handleSubmit = () => {
    updateAdminName(name);
    if (name != "") {
      push("/musical_work/success");
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <button
            onClick={() => push("/question1")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none font-share p-0"
          >
            {t("back1")}
          </button>
          <button
            onClick={() => push("/musical_work/question2")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none font-share p-0"
          >
            {t("back2")}
          </button>
          <button
            onClick={() => push("/musical_work/question3")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none font-share p-0"
          >
            {t("back3")}
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none font-share p-0"
            >
              {t("contributor")} {i + 1}
            </button>
          ))}

          <button
            onClick={() => push("/musical_work/question4")}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none font-share p-0"
          >
            {t("back4")}
          </button>

          <h1 className="text-lg sm:text-xl mb-4 font-share w-3/5 py-5">
            {t("name")}
          </h1>
          <form className="flex flex-col">
            <label className="text-xs mb-2 font-share">{t("name-list")}</label>
            <input
              type="text"
              onChange={handleNameChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-4/5 p-2 font-rubik"
            />
          </form>
          <div className="pt-10 w-4/5">
            <a
              className="text-[#3167B4] underline underline-offset-4 text-sm sm:text-base"
              href="#"
              onClick={() => push("/popups/moreInfoAdmin")}
            >
              {t("confused")}
            </a>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-gray-500 mb-4 font-roboto_light pt-20">
            {t("p1")}
          </p>
          <h4 className="text-base sm:text-lg font-bold mb-2 font-roboto_bold">
            {t("4.0")}
          </h4>
          <p className="text-xs sm:text-sm font-roboto_thin w-4/5 pt-5">
            {t("p2")} <span className="text-[#AC4444] font-rubik">{name}</span>
            {t("p3")}
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <div className="inline-flex gap-20">
          <button onClick={handleSubmit} className=" w-fit">
            {t("back")}
          </button>
          <button onClick={handleSubmit} className=" w-fit">
            {t("submit")}
          </button>
        </div>
      </footer>
    </div>
  );
};

const WrappedContractBuilder5Admin = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContractBuilder5Admin params={{ lng: lng }} />
    </Suspense>
  );
};

export default WrappedContractBuilder5Admin;
