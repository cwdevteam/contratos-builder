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
        <button
          onClick={() => push("/question1")}
          className="relative border-none"
        >
          x
        </button>
        <p className="text-sm sm:text-base space-y-4 font-roboto">
          {t("1")}
          <br />
          {t("2")}
          <br />
          {t("3")}
          <br />
          <ol className="list-decimal list-inside">
            <li>
              {t("4")}
              <br />
              <span>{t("5")}</span>
            </li>
            <li>
              {t("6")}
              <br />
              <span>{t("7")}</span>
            </li>
          </ol>
          {t("8")}
          <br />
          {t("9")}
          <br />
          <ul className="list-disc list-inside">
            <li>
              {t("10")}
              <br />
            </li>
            <li>
              {t("11")}
              <br />
            </li>
            <li>
              {t("12")}
              <br />
            </li>
            <li>
              {t("13")}
              <br />
            </li>
          </ul>
          {t("14")}
          <br />
          {t("15")}
          <br />
          {t("16")}
          <br />
          {t("17")}
          <br />
        </p>
        {/* <button
          onClick={() => push("/both/question2")}
          className="w-fit bg-[#232323]/[.7] border-[#828282]/[.7]"
        >
          {t("18")}
        </button> */}
      </main>
    </div>
  );
};

export default Disclaimer;
