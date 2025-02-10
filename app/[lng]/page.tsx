"use client";

import { useState } from "react";
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
  //if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { push } = useRouter();
  const { t } = useTranslation(lng);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [lang, setLang] = useState('');

  const changePopup = () =>{
    setIsOpen2(true);
    setTimeout(() => {
      setIsOpen2(false);    
    }, 200);
    document.getElementById('popup3')?.click()
  }

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    lng = event.target.value;
    setLang(lng);
  };

  return (
    <div className="flex flex-col items-center md:items-start pt-20  p-2 w-full sm:w-3/5 sm:mx-auto">
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
      <footer className="mt-8 flex flex-col text-start pt-4">
        <p className="font-rubik text-black text-outline-red text-center text-[35px] sm:text-[0px] px-0">
          {t("control")}
        </p>
        <span className="text-white font-rubik text-center text-[35px] sm:text-[0px]">
          {t("music")}
        </span>
        {!isOpen2 && (
          <Popup
            trigger={<button>{t("get-started")}</button>}
            position="center center"
            modal
            nested
            className="popup"
            closeOnDocumentClick
          >
            <div
              className="modal border-2 border-white"
              style={{
                height: "80vh",
                width: "90vw",
                maxWidth: "600px",
                overflowY: "scroll",
              }}
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
                    <div className="flex justify-end">
                      <button
                        onClick={changePopup}
                        className="border-none bg-[#82828270]"
                      >
                        {t("proceed")}&rarr;
                      </button>
                    </div>
                  </p>
                </main>
              </div>
            </div>
          </Popup>
        )}


        {!isOpen3&& (
          <Popup
            trigger={<button id="popup3" className="invisible"></button>}
            position="center center"
            modal
            nested
            className="popup"
            closeOnDocumentClick
          >
            <div
              className="modal border-2 border-white"
              style={{
                height: "80vh",
                width: "90vw",
                maxWidth: "600px",
                overflowY: "scroll",
              }}
            >
              <div className=" p-4 sm:p-8 flex flex-col justify-between">
                <main className="flex flex-col gap-6 sm:gap-8 text-center">
                  <button
                    onClick={() => {
                      setIsOpen3(true);
                      setTimeout(() => {
                        setIsOpen3(false);
                      }, 200);
                    }}
                    className="popup_button text-white hover:text-gray-300"
                  >
                    &times;
                  </button>
                  <p className="text-sm sm:text-base space-y-4 font-roboto text-xl">
                    {t("4")}
                  </p>
                  <select
                  name="type"
                  id="cont"
                  value={lang}
                  className="bg-black p-2 size-10 w-[140%] sm:w-full font-rubik"
                  onChange={handleLangChange}
                  required
                >
                  <option value="">Choose Language</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
                  <div className="flex justify-end">
                      <button
                        onClick={() => push(`/${lang}/question1`)}
                        className="border-none bg-[#82828270] absolute right-7 bottom-7"
                      >
                        {t("proceed")}&rarr;
                      </button>
                    </div>
                </main>
              </div>
            </div>
          </Popup>
        )}



        {!isOpen && (
          <Popup
            trigger={
              <a className="font-share text-2xl text-link underline text-center text-[18px] pt-2">
                {t("confused")}
              </a>
            }
            position="center center"
            modal
            nested
            className="popup"
            closeOnDocumentClick
          >
            <div
              className="modal border-2 border-white"
              style={{
                height: "80vh",
                width: "90vw",
                maxWidth: "600px",
                overflowY: "scroll",
              }}
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
