"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useQuestion3 from "../../store/useQuestion3";
import { useTranslation } from "@/app/i18n/client";

const ContractBuilder3 = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter();
  const updateContributorCount = useQuestion3(
    (state) => state.updateContributorCount
  );
  const [pageCount, setPageCount] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const song = searchParams.get("song")!;
  const recording = searchParams.get("recording")!;

  const { lng } = params;
  const { t } = useTranslation(lng, "both/question3");

  const handleContributorsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const contributors = Number(event.target.value);
    setPageCount(contributors)!;
    updateContributorCount(contributors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageCount && pageCount > 0) {
      push(`/both/1?pageCount=${pageCount}`);
    }
  };

  return (
    <div className=" flex flex-col justify-between pl-5">
      <main className="flex flex-col sm:flex-row">
        <div className="text-[#696969] w-full text-left mb-4 border-none font-share text-sm pt-20">
          <p className="pl-5 text-[#FFFFFF] text-[1.5rem] pt-5">{t("p1")}</p>
          <form className="flex flex-col pl-5 pt-5">
            <input
              type="number"
              name="type"
              onChange={handleContributorsChange}
              min="1"
              className="rounded-lg bg-black border border-white border-[.125rem] text-white focus:outline-none focus:ring-2 focus:ring-white w-[3rem] font-rubik p-1"
              required
            />
          </form>
        </div>
        <div className=" p-8 py-1 pt-20">
          <div className="w-4/5">
            <p className=" font-roboto_light text-[#696969]">{t("p2")}</p>
            <h3 className="text-base font-bold mb-2 font-roboto_bold">
              {t("h3")}
            </h3>
            <p className="font-roboto">
              {t("p3")}{" "}
              <span className="text-[#AC4444] font-rubik">{song}</span>
            </p>
            <br />
            <h3 className="text-base font-bold mb-2 font-roboto_bold">
              {t("h32")}
            </h3>
            <p className="font-roboto">
              {t("p4")} {t("p5")}
              <span className="text-[#AC4444] font-rubik">{recording}</span>
            </p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <div className="inline-flex gap-20">
          <button
            onClick={() => push("/both/question2")}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("back")}
          </button>
          <button
            onClick={handleSubmit}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("submit")}
          </button>
        </div>
      </footer>
    </div>
  );
};

const WrappedContractBuilder3 = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContractBuilder3 params={{ lng: lng }} />
    </Suspense>
  );
};

export default WrappedContractBuilder3;
