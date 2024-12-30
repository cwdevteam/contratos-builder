"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const AdminInfo = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { back } = useRouter();
  const { lng } = params;
  const { t } = useTranslation(lng, "popups/moreInfoAdmin");

  return (
    <div className=" p-4 sm:p-8 flex flex-col font-roboto">
      <button
        onClick={() => back()}
        className="self-end  text-white py-2 px-4 rounded  transition-colors mb-4"
      >
        x
      </button>
      <div className="space-y-4 text-sm sm:text-base">
        <p>{t("1")}</p>
        <br />
        <p>{t("1.5")}</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>{t("2")}</li>
          <li>{t("3")}</li>
          <li>{t("4")}</li>
          <li>{t("5")}</li>
          <li>{t("6")}</li>
          <li>{t("7")}</li>
        </ol>
        <p>{t("8")}</p>
      </div>
    </div>
  );
};

export default AdminInfo;
