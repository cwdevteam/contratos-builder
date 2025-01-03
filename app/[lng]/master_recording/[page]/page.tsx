"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import useDynamicPageStore from "../../store/use[page]";
import useQuestion2 from "../../store/useQuestion2";
import { useTranslation } from "@/app/i18n/client";

const DynamicPage = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const router = useRouter();
  const useParams1 = useParams();
  const searchParams = useSearchParams();
  const pageNumber = Number(useParams1.page);
  const pageCount = Number(searchParams.get("pageCount"));
  const lastSplit = Number(searchParams.get("split"));
  const recording = useQuestion2((state) => state.recording);

  // Get page data from the Zustand store
  const pageData = useDynamicPageStore(
    (state) => state.pages[pageNumber] || {}
  );

  // Local state for input fields
  const [legalName, setLegalName] = useState(pageData.legalName || "");
  const [email, setEmail] = useState(pageData.email || "");
  const [contributorType, setContributorType] = useState(
    pageData.contributorType || ""
  );
  const [split, setSplit] = useState<number>(pageData.split || -1);
  const [splitTotal, setSplitTotal] = useState<number>(
    pageData.splitTotal || 0
  );
  const resetPages = useDynamicPageStore((state) => state.resetPages);
  const { lng } = params;
  const { t } = useTranslation(lng, "master/dynamic");

  useEffect(() => {
    resetPages(pageNumber); // Reset all stored info
  }, [pageNumber, resetPages]);

  // Update Zustand store only if inputs change
  useEffect(() => {
    const data = {
      legalName,
      email,
      contributorType,
      split,
      splitTotal,
    };
    useDynamicPageStore.setState((state) => ({
      pages: {
        ...state.pages,
        [pageNumber]: { ...state.pages[pageNumber], ...data },
      },
    }));
  }, [legalName, email, contributorType, split, splitTotal, pageNumber]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLegalName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleContributorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setContributorType(event.target.value);
  };

  const handleSplitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSplit(value);
    setSplitTotal(value + lastSplit);
    if (value >= 0) {
      document.getElementById("split")!.innerHTML = String(value);
    }
  };

  const handleNextPage = () => {
    if (pageNumber >= pageCount && splitTotal !== 100) {
      const splitNeeded = (100 - splitTotal + split).toFixed(2);
      document.getElementById("wrongSplits")!.innerHTML =
        "Splits need to add to 100% to be valid. You need " +
        splitNeeded +
        " instead of " +
        split;
    } else {
      if (
        legalName != "" &&
        email != "" &&
        contributorType != "" &&
        split >= 0 &&
        split <= 100
      ) {
        const nextPage = pageNumber + 1;
        router.push(
          pageNumber >= pageCount
            ? `/master_recording/question4?pageCount=${pageCount}`
            : `/master_recording/${nextPage}?pageCount=${pageCount}&split=${splitTotal}`
        );
      }
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row pl-10 pt-10">
        <div className="w-full">
          <h2 className="text-[1.5rem] sm:text-xl mb-4 font-share">
            {t("contributor")} {pageNumber}
          </h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="text-[.5rem] sm:text-sm mb-2 block font-share">
                {t("name")}
              </label>
              <input
                type="text"
                value={legalName}
                onChange={handleNameChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full p-2 font-rubik"
                required
              />
            </div>
            <div>
              <label className="text-[.5rem] sm:text-sm mb-2 block font-share">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full p-2 font-rubik"
                required
              />
            </div>
            <div className="flex flex-row">
              <div>
                <label className="text-[.5rem] sm:text-sm mb-2 block font-share">
                  {t("type")}
                </label>
                <select
                  name="type"
                  id="cont"
                  value={contributorType}
                  className="bg-black p-2 size-10 w-full font-rubik"
                  onChange={handleContributorChange}
                >
                  <option value=""></option>
                  <option value={t("artist")}>{t("artist")}</option>
                  <option value={t("producer")}>{t("producer")}</option>
                  <option value={t("exec")}>{t("exec")}</option>
                  <option value={t("engineer")}>{t("engineer")}</option>
                </select>
              </div>
              <div>
                <label className="text-[.5rem] sm:text-sm mb-2 block font-share">
                  {t("split")}
                </label>
                <input
                  type="number"
                  max="100"
                  onChange={handleSplitChange}
                  className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full p-2 font-rubik"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="sm:text-sm text-gray-500 mb-4 font-roboto_thin">
            {t("p1")}
          </p>
          <h3 className="text-base mb-2 font-roboto_bold">{t("p2")}</h3>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("p3", { title: recording })}
          </p>
          <h3 className="text-base mb-2 font-roboto_bold">
            {t("contributor")} {pageNumber}:
          </h3>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("name2")}:{" "}
            <span className="text-[#AC4444] font-rubik">{legalName}</span>
          </p>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("email2")}:{" "}
            <span className="text-[#AC4444] font-rubik">{email}</span>
          </p>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("contribution2")}:{" "}
            <span className="text-[#AC4444] font-rubik">{contributorType}</span>
          </p>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("split")}:{" "}
            <span className="text-[#AC4444] font-rubik" id="split"></span>
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <p id="wrongSplits" className="text-[#AC4444] font-rubik"></p>
        <button
          onClick={handleNextPage}
          className="text-white py-2 px-4 rounded  transition-colors w-fit relative"
        >
          {t("next")}
        </button>
      </footer>
    </div>
  );
};

export default DynamicPage;
