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
  const song = searchParams.get("recording")!;

  const { lng } = params;
  const { t } = useTranslation(lng, "master/question3");

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
      push(`/master_recording/1?pageCount=${pageCount}`);
    }
  };

  return (
    <div className="p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="text-[#696969] w-full text-left mb-4 border-none font-share text-sm ">
          <p className="text-[#FFFFFF] text-[1.5rem] pt-10">{t("collaboratorsCountQuestion")}</p>
          <form className="flex flex-col pt-5">
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
        <div className="py-1 pt-10">
          <div className="w-4/5">
            <p className=" font-roboto_light text-[#696969] text-[0px] sm:text-[16px]">
              {t("incompleteContractMessage")}
            </p>
            <h3 className="font-bold mb-2 font-roboto_bold text-[0px] sm:text-[16px]">
              {t("masterRecordingIdentification")}
            </h3>
            <p className=" font-roboto text-[0px] sm:text-[16px]">
              {t("collaborationDescription")}{" "}
              <span className="text-[#AC4444] font-rubik text-[0px] sm:text-[16px]">
                {song}
              </span>
            </p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <div className="inline-flex relative bottom-0 left-0 right-0 justify-between sm:justify-normal sm:gap-20 gap-5 pt-[65%] sm:pt-[25%]">
          <button
            onClick={() => push("/master_recording/question2")}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("backButton")}
          </button>
          <button
            onClick={handleSubmit}
            className="  w-[15%]  bg-[#AC444475] flex-1 sm:flex-none "
          >
            {t("nextButton")}
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
