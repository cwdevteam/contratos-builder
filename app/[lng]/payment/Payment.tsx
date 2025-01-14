"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useDynamicPageStore from "../store/use[page]";
import { useTranslation } from "@/app/i18n/client";

const Payment = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  const { t } = useTranslation(lng, "confirmation");
  const query = useSearchParams();
  const paid = query.get("success");
  const pages = useDynamicPageStore((state) => state.pages);
  console.log("pages:", pages);
  const emails = Object.keys(pages).map((id) => {
    const email = pages[Number(id)]?.email;
    console.log(`id: ${id}, email: ${email}`);
    return email;
  });
  console.log("emails:", emails);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (paid === "true") {
      setMessage(t("1"));
    } else {
      setMessage(t("2"));
    }
  }, [paid, emails]);

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">{t("3")}</p>
          <div className="text-base sm:text-lg">{message}</div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
