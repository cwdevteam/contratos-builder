"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n/client";

interface PopupProps {
  onClose: () => void;
  params: {
    lng: string;
  };
}

const Popup = ({ onClose, params }: PopupProps) => {
  const { lng } = params;
  const { t } = useTranslation(lng);
  return (
    <div className="popup flex flex-col p-4 sm:p-8 text-sm sm:text-base">
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
        onClick={onClose}
        className="popup_button text-white hover:text-gray-300"
      >
        &times;
      </button>
    </div>
  );
};

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
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { t } = useTranslation(lng);

  useEffect(() => {
    if (lng == "es") {
      document.getElementById("li4")!.innerHTML = "<li>" + t("li4") + "</li>";
    }
  }, []);

  return (
    <div className="flex flex-col items-center md:items-start pl-10 pt-20  p-2 w-3/5">
      <section className="w-full flex flex-col gap-5">
        <p className="md:text-[32px] text-[20px] font-share tracking-[-0.05rem] text-start">
          {t("h3-1")}
          <span className="font-rubik">{t("mesa")}</span>
          {t("h3-2")}
        </p>
        <p className="md:text-[24px] text-2xl font-share tracking-[-0.05rem] text-start">
          {t("intro")}
          <br />
          {t("li-title")}
        </p>
        <ol className="list-disc pl-6 text-sm sm:text-base text-start md:text-[24px] text-[18px] font-share tracking-[-0.05rem] pt-4">
          <li className="pb-2">{t("li1")}</li>
          <li className="pb-2"> {t("li2")}</li>
          <li className="pb-2">{t("li3")}</li>
          <span id="li4"></span>
        </ol>
      </section>
      <footer className="mt-8 flex flex-col gap-4 text-start pt-4">
        <a
          className="font-share text-2xl text-link max-w-fit underline text-start"
          href="#"
          onClick={togglePopup}
        >
          {t("confused")}
        </a>
        <button onClick={() => push(`/${lng}/popups/disclaimer`)}>
          {t("get-started")}
        </button>
        {showPopup && (
          <Popup onClose={() => setShowPopup(false)} params={{ lng: lng }} />
        )}
      </footer>
    </div>
  );
}
