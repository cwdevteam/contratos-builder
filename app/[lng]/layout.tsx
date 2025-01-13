import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import mesaImage from "./public/images/mesa_logo.png";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import LanguageSwitcher from "../components/LanguageSwitcher";
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
        <header className="flex flex-col sm:flex-row items-center justify-between h-20 px-4 sm:mb-0 mb-5">
          <div className="order-2 sm:order-1 flex items-center space-x-2 flex-col sm:flex-row">
            <Image src={mesaImage} width={190} height={60} alt="M"></Image>
            <p className="text-[32px]"></p>
          </div>
          <div className="order-3 sm:order-2">{/* <LanguageSwitcher /> */}</div>
          <div className="order-1 sm:order-3 text-center sm:text-right text-xs w-full sm:w-[17rem]">
            <p className="text-2xl font-black font-rubik">MUSIC SPLITS</p>
            <div className="font-share">{t("contract-builder")}</div>
          </div>
        </header>
        <hr className="w-full" />
        <div className="pt-10">{children}</div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
