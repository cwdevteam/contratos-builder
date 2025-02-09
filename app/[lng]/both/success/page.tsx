"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PDF from "./pdf";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import useQuestion1 from "../../store/useQuestion1";

import { NextResponse } from "next/server";
import useQuestion2 from "../../store/useQuestion2";

const Success = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const router = useRouter();
  const [jurisdiction, setJurisdiction] = useState("");

  //const downloadUnsignedTrue = PDF(true);
  const downloadUnsignedFalse = PDF(false,jurisdiction);
  let cid =
    "https://mesa.mypinata.cloud/ipfs/" + useQuestion1((state) => state.cid);
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
    cid = cid;
    sendEmail(songName);
    document.getElementById("ipfs")!.innerText = "View contract on IPFS";
  };

  const handleDocusign = () => {
    router.push(`/${lng}/master_recording/docusign_choice`);
    //downloadUnsignedTrue();
  };

  const handleJurisdictionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setJurisdiction(event.target.value);
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10 mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center font-share p-0">
            {t("congrats")}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center font-rubik p-0">
            {t("draft-created")}
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleFreeDownload}
              className=" text-white py-2 px-4 rounded  transition-colors font-rubik py-1 button-height"
            >
              {t("download-unsigned")}
            </button>
            <button
              onClick={handleDocusign}
              className=" text-white py-2 px-4 rounded  transition-colors font-rubik p-0 button-height"
            >
              {t("send-docusign")}
            </button>
            <a id="ipfs" className="text-center" href={cid}></a>
          </div>
          <div>
          <label className="pt-5">Opcionalmente, pruebe en una jurisdicción diferente.</label>
          <select
            name="type"
            id="cont"
            className="bg-black p-2 size-10 w-[140%] sm:w-full font-rubik"
            onChange={handleJurisdictionChange}
            required
          >
            <option value=""></option>
            <option value="USA">United States</option>
            <option value="Colombia">Colombia</option>
            <option value="France">France</option>
          </select>
          <button
              onClick={handleFreeDownload}
              className=" text-white py-2 px-4 rounded  transition-colors font-rubik p-0 button-height"
            >
              Intentar
            
          </button>
          </div>
        </div>
        <p className="text-base sm:text-lg font-share mx-auto">{t("lawyer")}</p>
      </main>
    </div>
  );
};

export default Success;
