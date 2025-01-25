import { jsPDF } from "jspdf";

import useQuestion1 from "../../store/useQuestion1";
import useQuestion2 from "../../store/useQuestion2";
//import useQuestion3 from '../../store/useQuestion3'; //NOT USED
import useQuestion4 from "../../store/useQuestion4";
import useDynamicPageStore from "../../store/use[page]";
import useQuestion5Admin from "../../store/useQuestion5Admin";
import useQuestion5Vote from "../../store/useQuestion5Vote";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const getX = (text: string) => {
  let x = 50;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const width = doc.getTextWidth(text);
  x = (pageWidth - width) / 2;
  return Math.abs(x);
};

const PDF = (isClicked: boolean) => {
  const date = useQuestion1((state) => state.date);
  const song = useQuestion2((state) => state.song);
  const recording = useQuestion2((state) => state.recording);
  const voteSelection = useQuestion4((state) => state.voteSelection);
  const pages = useDynamicPageStore((state) => state.pages);
  const adminName = useQuestion5Admin((state) => state.adminName);
  const percent = useQuestion5Vote((state) => state.percent);
  const { t } = useTranslation("master/pdf");
  const setCid = useQuestion1((state) => state.setCid);
  const names: string[] = [];
  const emails: string[] = [];

  const generatePDF = async () => {
    const doc = new jsPDF();

    const getY = (y: number, inc: number) => {
      if (y > 230) {
        //new page is needed
        doc.addPage();
        return 30;
      } else {
        //need to increment y
        return y + inc;
      }
    };

    let x = 0;
    let y = 20;

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(15);

    const title = t("1");
    const splitTitle = doc.splitTextToSize(
      title,
      doc.internal.pageSize.getWidth() * 0.6
    );
    x = getX(title);
    x = 2;
    doc.text(splitTitle, 50, y);
    y = getY(y, 30);

    doc.setFont("Palatino Linotype", "normal");
    doc.setFontSize(11);
    const line1 = t("2", { date });
    x = 50;
    doc.text(line1, x, y);
    y = getY(y, 15);

    //useDynamicPageStore
    x = 30;
    Object.keys(pages).forEach((id) => {
      const pageData = pages[Number(id)];
      if (pageData.legalName != "") {
        doc.setFont("Palatino Linotype", "bold");
        doc.text(t("6", { id }), x, y);
        y = getY(y, 5);
        doc.setFont("Palatino Linotype", "normal");
        const name = pageData.legalName;
        names.push(name);
        doc.text(t("7", { name }), x, y);
        y = getY(y, 5);
        const email = pageData.email;
        emails.push(email);
        doc.text(t("9", { email }), x, y);
        y = getY(y, 5);
        const contributorType = pageData.contributorType;
        doc.text(t("10", { contributorType }), x, y);
        y = getY(y, 5);
        const split = pageData.split;
        doc.text(t("11", { split }), x, y);
        y = getY(y, 15);
      }
    });

    doc.setFont("Palatino Linotype", "bold");
    const line2 = t("3");
    x = getX(line2);
    doc.text(line2, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line3 = t("4", { song });
    const split3 = doc.splitTextToSize(
      line3,
      doc.internal.pageSize.getWidth() * 0.6
    );
    x = getX(line3);
    doc.text(split3, x, y);
    y = getY(y, 15);

    doc.setFont("Palatino Linotype", "bold");
    const line4 = t("4a");
    x = getX(line4);
    doc.text(line4, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line5 = t("4b", { recording });
    const split5 = doc.splitTextToSize(
      line5,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text(split5, x / 2, y);
    y = getY(y, 10);

    const line6 = t("5");
    const split6 = doc.splitTextToSize(
      line6,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text(split6, x / 2, y + 10);
    y = getY(y, 30);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line7 = t("12");
    x = getX(line7);
    doc.text(line7, x / 2, y);

    doc.setFont("Palatino Linotype", "normal");
    const line8 = t("13");
    const split8 = doc.splitTextToSize(
      line8,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y + 10);
    doc.text(split8, x / 2 + 10, y + 10);
    y = getY(y, 30);

    const line9 = t("14");
    const split9 = doc.splitTextToSize(
      line9,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("b.", x / 2, y + 10);
    doc.text(split9, x / 2 + 10, y + 10);
    y = getY(y, 25);

    //different section based on vote or admin
    if (voteSelection == "VOTE") {
      const line10 = t("15", { percent });
      const split10 = doc.splitTextToSize(
        line10,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("c.", x / 2, y + 10);
      doc.text(split10, x / 2 + 10, y + 10);
      y = getY(y, 15);

      const line11 = t("16");
      const split11 = doc.splitTextToSize(
        line11,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("i.", x / 2 + 10, y + 10);
      doc.text(split11, x / 2 + 20, y + 10);
      y = getY(y, 10);

      const line12 = t("17");
      const split12 = doc.splitTextToSize(
        line12,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("ii.", x / 2 + 10, y + 10);
      doc.text(split12, x / 2 + 20, y + 10);
      y = getY(y, 10);

      const line13 = t("18");
      const split13 = doc.splitTextToSize(
        line13,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("iii.", x / 2 + 10, y + 10);
      doc.text(split13, x / 2 + 20, y + 10);
      y = getY(y, 15);

      const line14 = t("18a");
      const split14 = doc.splitTextToSize(
        line14,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("iv.", x / 2 + 10, y + 10);
      doc.text(split14, x / 2 + 20, y + 10);
      y = getY(y, 35);
    } else {
      const line10 = t("19", { adminName });
      const split10 = doc.splitTextToSize(
        line10,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("c.", x / 2, y + 10);
      doc.text(split10, x / 2 + 10, y + 10);
      y = getY(y, 65);

      const line10a = t("19a");
      const split10a = doc.splitTextToSize(
        line10a,
        doc.internal.pageSize.getWidth() * 0.6
      );
      doc.text("-", x, y + 10);
      doc.text(split10a, x / 2 + 10, y + 10);
      y = getY(y, 65);
    }

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line15 = t("20");
    x = getX(line15);
    doc.text(line15, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line16 = t("21");
    const split16 = doc.splitTextToSize(
      line16,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split16, x / 2 + 10, y);
    y = getY(y, 25);

    const line17 = t("22");
    const split17 = doc.splitTextToSize(
      line17,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("b.", x / 2, y);
    doc.text(split17, x / 2 + 10, y);
    y = getY(y, 50);

    const line18 = t("23");
    const split18 = doc.splitTextToSize(
      line18,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("c.", x / 2, y);
    doc.text(split18, x / 2 + 10, y);
    y = getY(y, 40);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line19 = t("24");
    doc.text(line19, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line20 = t("25");
    const split20 = doc.splitTextToSize(
      line20,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split20, x / 2 + 10, y);
    y = getY(y, 25);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line21 = t("26");
    doc.text(line21, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line22 = t("27");
    const split22 = doc.splitTextToSize(
      line22,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split22, x / 2 + 10, y);
    y = getY(y, 50);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line23 = t("28");
    doc.text(line23, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line24 = t("29");
    const split24 = doc.splitTextToSize(
      line24,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split24, x / 2 + 10, y);
    y = getY(y, 40);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line25 = t("30");
    doc.text(line25, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line26 = t("31");
    const split26 = doc.splitTextToSize(
      line26,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split26, x / 2 + 10, y);
    y = getY(y, 20);

    const line27 = t("32");
    const split27 = doc.splitTextToSize(
      line27,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("b.", x / 2, y);
    doc.text(split27, x / 2 + 10, y);
    y = getY(y, 15);

    const line28 = t("33");
    const split28 = doc.splitTextToSize(
      line28,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("c.", x / 2, y);
    doc.text(split28, x / 2 + 10, y);
    y = getY(y, 30);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line29 = t("34");
    doc.text(line29, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line30 = t("35");
    const split30 = doc.splitTextToSize(
      line30,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split30, x / 2 + 10, y);
    y = getY(y, 30);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line31 = t("36");
    doc.text(line31, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line32 = t("37");
    const split32 = doc.splitTextToSize(
      line32,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split32, x / 2 + 10, y);
    y = getY(y, 35);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line33 = t("38");
    doc.text(line33, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line34 = t("39");
    const split34 = doc.splitTextToSize(
      line34,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split34, x / 2 + 10, y);
    y = getY(y, 20);

    doc.setFont("Palatino Linotype", "bold");
    doc.setFontSize(11);
    const line35 = t("40");
    doc.text(line35, x / 2, y);
    y = getY(y, 10);

    doc.setFont("Palatino Linotype", "normal");
    const line36 = t("41");
    const split36 = doc.splitTextToSize(
      line36,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("a.", x / 2, y);
    doc.text(split36, x / 2 + 10, y);
    y = getY(y, 20);

    const line37 = t("42");
    const split37 = doc.splitTextToSize(
      line37,
      doc.internal.pageSize.getWidth() * 0.6
    );
    doc.text("b.", x / 2, y);
    doc.text(split37, x / 2 + 10, y);
    y = getY(y, 30);

    doc.text(t("43"), x, y);
    y = getY(y, 15);
    x /= 2;
    Object.keys(pages).forEach((id) => {
      const pageData = pages[Number(id)];
      if (pageData.legalName != "") {
        doc.setFont("Palatino Linotype", "bold");
        doc.text(t("6", { id }), x, y);
        y = getY(y, 5);
        doc.setFont("Palatino Linotype", "normal");
        const name = pageData.legalName;
        doc.text(t("7", { name }), x, y);
        doc.line(x + 30, y, x + 150, y);
        y = getY(y, 5);
        doc.text(t("44"), x, y);
        doc.line(x + 30, y, x + 80, y);
        doc.text(t("45", { date }), x + 85, y);
        doc.line(x + 95, y, x + 130, y);
        y = getY(y, 15);
      }
    });

    const pdfBlob = doc.output("blob");
    const docTitle = "Splits+" + song + ".pdf";
    doc.save(docTitle);

    const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

    async function pinFileToIPFS() {
      try {
        const blob = new Blob([pdfBlob], { type: "application/pdf" });
        const file = new File([blob], "contract.txt");
        const data = new FormData();
        data.append("file", file);

        const request = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
            body: data,
          }
        );

        const response = await request.json();
        console.log(response);
        console.log(response.IpfsHash);

        const cid = response.IpfsHash; // Get the CID from the response
        setCid(cid);
        const userId = uuidv4(); // Generate UUID here

        // Now post the userId and CID to Supabase
        const { data: supabaseData, error } = await supabase
          .from("contracts") // Replace with your actual table name
          .insert([
            {
              id: userId, // Store userId
              emails: emails,
              names: names,
              download_clicked: isClicked,
              ipfs_cid: cid, // Store CID
            },
          ]);

        if (error) {
          console.error("Error storing data in Supabase:", error);
        } else {
          console.log("Data stored in Supabase:", supabaseData);
        }
      } catch (error) {
        console.error(
          "Error during IPFS file pinning or Supabase storage:",
          error
        );
      }
    }
    await pinFileToIPFS();
  };

  return generatePDF;
};

export default PDF;
