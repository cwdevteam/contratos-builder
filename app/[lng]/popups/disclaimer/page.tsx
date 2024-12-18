"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const Disclaimer = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  const { t } = useTranslation(lng, "popups/disclaimer");
  const { push } = useRouter();

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col gap-6 sm:gap-8">
        <p className="text-sm sm:text-base space-y-4">
          <span className="block">
            {t("1")}
            <br />
            <br />
            {t("2")}
            <br />
            <br />
            {t("3")}
          </span>
        </p>
        <button
          onClick={() => push("/question1")}
          className="w-1/5 bg-[#232323]/[.7] border-[#828282]/[.7]"
        >
          {t("4")}
        </button>
      </main>
    </div>
  );
};

export default Disclaimer;
