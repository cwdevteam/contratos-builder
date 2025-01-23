"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import docusignImage from "../../public/images/docusign.png";
import useQuestion1 from "../../store/useQuestion1";
import PDF from "../../musical_work/success/pdf";
import { NextResponse } from "next/server";
import useQuestion2 from "../../store/useQuestion2";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

React.useEffect(() => {
  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);
  if (query.get("success")) {
    console.log("Order placed! You will receive an email confirmation.");
  }

  if (query.get("canceled")) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you’re ready."
    );
  }
}, []);

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

  const downloadUnsignedTrue = PDF(false);
  let cid = useQuestion1((state) => state.cid);
  const songName = useQuestion2((state) => state.song);

  const sendEmail = async (songName: string) => {
    try {
      const response = await fetch(`/${lng}/api/sendDocusign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songName: songName }),
      });
      if (!response.ok) {
        console.error("Error sending email:", response.statusText);
        return NextResponse.json(
          { error: "Error sending email" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 }
      );
    }
  };

  const handleCheckout = async () => {
    cid = "https://mesa.mypinata.cloud/ipfs/" + cid;
    const response = await fetch(`../api/checkout_sessions`, {
      method: "POST",
    });
    const data = await response.json();
    if (data.url) {
      push(data.url);
    }
    sendEmail(songName);
    downloadUnsignedTrue();
  };

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
