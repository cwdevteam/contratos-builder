"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n/client";
import Popup from "reactjs-popup";

export default function Home({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  let { lng } = params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { push } = useRouter();
  const { t } = useTranslation(lng);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="flex flex-col items-center md:items-start pl-10 pt-20  p-2 w-full sm:w-3/5">
      <section className="w-full flex flex-col gap-5">
        <p className="md:text-[32px] text-[20px] font-share tracking-[-0.05rem] text-start">
          {t("h3-1")}
          <span className="font-rubik">{t("mesa")}</span>
          {t("h3-2")}
        </p>
        <p className="md:text-[24px] text-[16px] text-2xl font-share tracking-[-0.05rem] text-start">
          {t("intro")}
          <br />
          {t("li-title")}
        </p>
        <ol className="list-disc pl-6 text-sm sm:text-base text-start md:text-[24px] text-[16px] font-share tracking-[-0.05rem] pt-4">
          <li className="pb-2">{t("li1")}</li>
          <li className="pb-2"> {t("li2")}</li>
          <li className="pb-2">{t("li3")}</li>
        </ol>
      </section>
      <footer className="mt-8 flex flex-col gap-4 text-start pt-4">
        <p className="font-rubik text-black text-outline-red text-center text-[35px] sm:text-[0px]">
          Controla tu
        </p>
        <span className="text-white font-rubik text-center text-[35px] sm:text-[0px]">
          musica
        </span>
        {!isOpen2 && (
          <Popup
            trigger={<button>{t("get-started")}</button>}
            position="right center"
            modal
            nested
            className="popup"
            closeOnDocumentClick
          >
            <div
              className="modal border-2 border-white"
              style={{ height: "60vh", overflowY: "scroll" }}
            >
              <div className=" p-4 sm:p-8 flex flex-col justify-between">
                <main className="flex flex-col gap-6 sm:gap-8">
                  <button
                    onClick={() => {
                      setIsOpen2(true);
                      setTimeout(() => {
                        setIsOpen2(false);
                      }, 200);
                    }}
                    className="popup_button text-white hover:text-gray-300"
                  >
                    &times;
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
                    <button
                      onClick={() => push(`/${lng}/question1`)}
                      className=""
                    >
                      {t("get-started")}
                    </button>
                  </p>
                </main>
              </div>
            </div>
          </Popup>
        )}
        {!isOpen && (
          <Popup
            trigger={
              <a className="font-share text-2xl text-link underline text-center text-[15px]">
                {t("confused")}
              </a>
            }
            position="right center"
            modal
            nested
            className="popup"
            closeOnDocumentClick
          >
            <div
              className="modal border-2 border-white"
              style={{ height: "60vh", overflowY: "scroll" }}
            >
              <p>{t("popups.1")}</p>
              <ul>
                <li>
                  {t("popups.2")}
                  <br />
                  {t("popups.3")}
                  <br />
                  {t("popups.4")}
                </li>
                <br />
                <li>
                  {t("popups.5")}
                  <br />
                  {t("popups.6")}
                  <br />
                  {t("popups.7")}
                </li>
                <br />
                <li>
                  {t("popups.8")}
                  <br />
                  <ol className="list-disc pl-5">
                    <li>{t("popups.9")}</li>
                    <br />
                    <li>{t("popups.10")}</li>
                  </ol>
                  <br />
                </li>
              </ul>
              {t("popups.11")}
              <br />
              <p>{t("popups.12")}</p>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setTimeout(() => {
                    setIsOpen(false);
                  }, 200);
                }}
                className="popup_button text-white hover:text-gray-300"
              >
                &times;
              </button>
            </div>
          </Popup>
        )}
      </footer>
    </div>
  );
}
