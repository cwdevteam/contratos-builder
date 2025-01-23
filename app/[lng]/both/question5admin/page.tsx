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
  const { t } = useTranslation(lng, "both/question5admin");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionName(event.target.value);
  };

  const handleSubmit = () => {
    updateAdminName(name);
    if (name != "") {
      push("/both/success");
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <h1 className="text-lg sm:text-xl mb-4 font-share py-5">
            {t("name")}
          </h1>
          <form className="flex flex-col">
            <label className="text-xs sm:text-sm mb-2 font-share pb-5">
              {t("name-list")}
            </label>
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
          <p className="text-xs sm:text-sm text-gray-500 mb-4 font-roboto_light pt-20">
            {t("p1")}
          </p>
          <h4 className="text-base sm:text-lg font-roboto_bold mb-2">
            {t("4.0")}
          </h4>
          <p className="font-roboto_thin">
            {t("p2")} <span className="text-[#AC4444] font-rubik">{name}</span>
            {t("p3")}
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <div className="inline-flex gap-20">
          <button
            onClick={() => push("/both/question4")}
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
