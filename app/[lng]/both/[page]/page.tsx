"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import useDynamicPageStore from "../../store/use[page]";
import { useTranslation } from "@/app/i18n/client";

const DynamicPage = ({
  params,
}: {
  params: {
    lng: string;
    page: string;
  };
}) => {
  const router = useRouter();
  const useParams1 = useParams();
  const searchParams = useSearchParams();
  const pageNumber = Number(useParams1.page);
  const pageCount = Number(searchParams.get("pageCount"));
  const lastSplit = Number(searchParams.get("split"));

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
  const [masterContributorType, setMasterContributorType] = useState(
    pageData.masterContributorType || ""
  );
  const [split, setSplit] = useState<number>(pageData.split || -1);
  const [splitTotal, setSplitTotal] = useState<number>(
    pageData.splitTotal || 0
  );
  const resetPages = useDynamicPageStore((state) => state.resetPages);
  const { lng, page } = params;
  const { t } = useTranslation(lng, "both/dynamic");

  useEffect(() => {
    resetPages(pageNumber); // Reset all stored info
  }, [pageNumber, resetPages]);

  // Update Zustand store only if inputs change
  useEffect(() => {
    const data = {
      legalName,
      email,
      contributorType,
      masterContributorType,
      split,
      splitTotal,
    };
    useDynamicPageStore.setState((state) => ({
      pages: {
        ...state.pages,
        [pageNumber]: { ...state.pages[pageNumber], ...data },
      },
    }));
  }, [
    legalName,
    email,
    contributorType,
    masterContributorType,
    split,
    splitTotal,
    pageNumber,
  ]);

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

  const handleMasterContributorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMasterContributorType(event.target.value);
  };

  const handleSplitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSplit(value);
    setSplitTotal(value + lastSplit);
    if (value >= 0) {
      document.getElementById("split2")!.innerHTML = String(value);
      document.getElementById("split3")!.innerHTML = String(value);
    }
  };

  const handleBackPage = () => {
    const previousPage = parseInt(page) - 1;
    if (previousPage > 0) {
      setSplitTotal(splitTotal - split);
      router.push(
        `/master_recording/${previousPage}?pageCount=${pageCount}&split=${splitTotal}`
      );
    } else {
      router.push(`/master_recording/question3`);
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
        split <= 100 &&
        masterContributorType != ""
      ) {
        const nextPage = pageNumber + 1;
        router.push(
          pageNumber >= pageCount
            ? `/both/question4?pageCount=${pageCount}`
            : `/both/${nextPage}?pageCount=${pageCount}&split=${splitTotal}`
        );
      }
    }
  };

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row">
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
                placeholder={legalName}
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
                placeholder={email}
                value={email}
                onChange={handleEmailChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full p-2 font-rubik"
                required
              />
            </div>
            <div className="flex flex-row">
              <div className="w-2/5">
                <label className="text-[.5rem] sm:text-sm mb-2 block font-share w-fit">
                  {t("type")}
                </label>
                <select
                  name="type"
                  id="cont"
                  value={contributorType}
                  className="bg-black p-2 size-10 w-[90%] font-rubik"
                  onChange={handleContributorChange}
                  required
                >
                  <option value=""></option>
                  <option value={t("lyrics")}>{t("lyrics")}</option>
                  <option value={t("music")}>{t("music")}</option>
                  <option value={t("both2")}>{t("both")}</option>
                </select>
              </div>
              <div className="w-2/5">
                <label className="text-[.5rem] sm:text-sm mb-2 block font-share w-fit">
                  {t("type2")}
                </label>
                <select
                  name="type"
                  id="cont"
                  value={masterContributorType}
                  className="bg-black w-fit size-10 w-[90%] font-rubik"
                  onChange={handleMasterContributorChange}
                  required
                >
                  <option value=""></option>
                  <option value={t("artist")}>{t("artist")}</option>
                  <option value={t("producer")}>{t("producer")}</option>
                  <option value={t("exec")}>{t("exec")}</option>
                  <option value={t("engineer")}>{t("engineer")}</option>
                </select>
              </div>
              <div className="w-1/5">
                <label className="text-[.5rem] sm:text-sm mb-2 block font-share w-fit">
                  Split (%)
                </label>
                <input
                  type="number"
                  max="100"
                  onChange={handleSplitChange}
                  className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2 p-2"
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
          <h3 className="text-base mb-2 font-roboto_bold">{t("type")}</h3>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("p3")}
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
            {t("contribution")}:{" "}
            <span className="text-[#AC4444] font-rubik">{contributorType}</span>
          </p>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("split2")}:
            <span className="text-[#AC4444] font-rubik" id="split2"></span>
          </p>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("contribution2")}:{" "}
            <span className="text-[#AC4444] font-rubik">
              {" "}
              {masterContributorType}
            </span>
          </p>
          <p className="text-sm sm:text-base mb-4 font-roboto_light">
            {t("split3")}:{" "}
            <span className="text-[#AC4444] font-rubik" id="split3"></span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <p
          id="wrongSplits"
          className="text-red-500 text-lg text-sm sm:text-base"
        ></p>
        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5 sm:pt-[12%]">
          <button
            onClick={handleBackPage}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("back")}
          </button>
          <button
            onClick={handleNextPage}
            className=" w-[15%] text-white py-2 px-4  w-fit relative bg-[#AC444475] flex-1 sm:flex-none"
          >
            {t("submit")}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DynamicPage;
