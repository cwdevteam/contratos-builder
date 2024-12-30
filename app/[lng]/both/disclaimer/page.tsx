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
  const { t } = useTranslation(lng, "both/disclaimer");
  const { push } = useRouter();

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col gap-6 sm:gap-8">
        <p className="text-sm sm:text-base space-y-4 font-roboto">
          {t("1")}
          <br />
          {t("2")}
          <br />
          {t("3")}
          <br />
          <ol>
            <li>
              {t("4")}
              <span>{t("5")}</span>
            </li>
          </ol>
        </p>
        <button
          onClick={() => push("/both/question2")}
          className="w-fit bg-[#232323]/[.7] border-[#828282]/[.7]"
        >
          {t("4")}
        </button>
      </main>
    </div>
  );
};

export default Disclaimer;
