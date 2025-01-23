"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import docusignImage from "../../public/images/docusign.png";

const DocusignChoice = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter();

  const { lng } = params;
  const { t } = useTranslation(lng, "musical_work/docusign_choice");

  return (
    <div className="flex flex-col">
      <main className="flex flex-col">
        <div>
          <p className="text-center font-share text-xs pt-10 pb-0">
            {t("3")}
            <br />
          </p>
          <Image
            src={docusignImage}
            width={190}
            height={60}
            alt="DocuSign"
            className="relative mx-auto pt-0"
          ></Image>
          <p className="font-share w-[90%] sm:w-2/5 mx-auto">{t("1")}</p>
        </div>
        <div className="flex flex-row pt-10 justify-center gap-10">
          <div className="">
            <p className="font-rubik">{t("2")}</p>
            <hr className="w-full" />
            <p className="font-share">1x {t("4")}</p>
          </div>
          <div className="">
            <p className="font-rubik">Summary</p>
            <hr className="w-full" />
            <p className="font-share">
              Subtotal $<span className="font-rubik">2.00</span>
            </p>
            <p className="font-share text-right">
              Tax $<span className="font-rubik">0.14</span>
            </p>
            <hr className="w-full" />
            <p className="font-share text-right">
              $<span className="font-rubik text-right">2.14</span>
            </p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-6 pt-10">
        <div className="relative bottom-0 mx-auto text-center">
          <button
            onClick={() => push("/musical_work/success")}
            className=" w-fit"
          >
            {t("5")}
          </button>
          <br />
          <a
            onClick={() => push("/musical_work/success")}
            className="underline mx-auto"
          >
            {t("7")}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default DocusignChoice;
