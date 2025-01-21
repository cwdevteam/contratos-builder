import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import mesaImage from "./public/images/mesa_logo.png";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
//import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "../i18n";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Mesa contract builder",
  description: "create music splits contracts",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const { lng } = await params; // eslint-disable-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng); // eslint-disable-line react-hooks/rules-of-hooks

  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <header className="flex items-center justify-between h-20 sm:mb-0">
          <div className="flex items-left space-x-2 flex-col sm:flex-row">
            <Image src={mesaImage} width={190} height={60} alt="M"></Image>
            <p className="text-[32px]"></p>
          </div>
          <div className="">{/* <LanguageSwitcher /> */}</div>
          <div className="text-right sm:text-right text-xs sm:w-[17rem] px-4">
            <p className="text-[16px] font-black font-rubik">MUSIC SPLITS</p>
            <div className="font-share">{t("contract-builder")}</div>
          </div>
        </header>
        <hr className="w-full p-0" />
        <div className="pt-5">{children}</div>
        <SpeedInsights />
        <Analytics />
        <Image
          src={mesaImage}
          width={95}
          height={30}
          alt="M"
          className="mx-auto mt-10"
        ></Image>
      </body>
    </html>
  );
}
