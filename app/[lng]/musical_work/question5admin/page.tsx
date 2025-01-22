"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [name, setSelectedOptionName] = useState("");
  const updateAdminName = useQuestion5Admin((state) => state.updateAdminName);
  const { lng } = params;
  const { t } = useTranslation(lng, "musical_work/question5admin");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionName(event.target.value);
  };

  const handleSubmit = () => {
    updateAdminName(name);
    if (name != "") {
      push("/musical_work/success");
    }
  };

  return (
    <div className="sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <h1 className="text-lg sm:text-xl font-share w-3/5">{t("name")}</h1>
          <form className="flex flex-col">
            <label className="text-xs font-share">{t("name-list")}</label>
            <input
              type="text"
              onChange={handleNameChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-4/5 p-2 font-rubik"
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 sm:p-8">
          <p className="text-gray-500 font-roboto_light text-[0px] sm:text-[16px]">
            {t("p1")}
          </p>
          <h4 className="text-base sm:text-lg font-bold font-roboto_bold ">
            {t("4.0")}
          </h4>
          <p className="text-xs sm:text-sm font-roboto_thin w-4/5 pt-5">
            {t("p2")} <span className="text-[#AC4444] font-rubik">{name}</span>
            {t("p3")}
          </p>
        </div>
      </main>
      <a
        className="text-[#3167B4] underline underline-offset-4 text-sm sm:text-base pb-5"
        href="#"
        onClick={() => push("/popups/moreInfoAdmin")}
      >
        {t("confused")}
      </a>
      <footer className="flex flex-col gap-6 row-start-3">
        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20">
          <button
            onClick={() => push("/musical_work/question4")}
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
