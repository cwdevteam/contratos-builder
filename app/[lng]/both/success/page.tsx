"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PDF from "./pdf";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "@/app/i18n/client";
import useQuestion1 from "../../store/useQuestion1";

import { NextResponse } from "next/server";
import useQuestion2 from "../../store/useQuestion2";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Success = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const router = useRouter();
  const downloadUnsignedTrue = PDF(true);
  const downloadUnsignedFalse = PDF(false);
  let cid = useQuestion1((state) => state.cid);
  const songName = useQuestion2((state) => state.song);
  const { lng } = params;
  const { t } = useTranslation(lng, "both/success");

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

  const sendEmail = async (songName: string) => {
    try {
      const response = await fetch(`/${lng}/api/send`, {
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

  const handleFreeDownload = () => {
    downloadUnsignedFalse();
    cid = "https://mesa.mypinata.cloud/ipfs/" + cid;
    sendEmail(songName);
  };

  const handleCheckout = async () => {
    cid = "https://mesa.mypinata.cloud/ipfs/" + cid;
    const response = await fetch(`../api/checkout_sessions`, {
      method: "POST",
    });
    const data = await response.json();
    if (data.url) {
      router.push(data.url);
    }
    sendEmail(songName);
    downloadUnsignedTrue();
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center font-share p-0">
            {t("congrats")}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center font-rubik p-0">
            {t("draft-created")}
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleFreeDownload}
              className=" text-white py-2 px-4 rounded  transition-colors font-rubik p-0"
            >
              {t("download-unsigned")}
            </button>
            <button
              onClick={handleCheckout}
              className=" text-white py-2 px-4 rounded  transition-colors font-rubik p-0"
            >
              {t("send-docusign")}
            </button>
            <a id="ipfs" className="text-white">
              {cid}
            </a>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8 font-share">{t("congrats")}</p>
          <h4 className="text-base sm:text-lg font-share">{t("lawyer")}</h4>
        </div>
      </main>
    </div>
  );
};

export default Success;
