import { jsPDF } from 'jspdf';

import useQuestion1 from '../../store/useQuestion1';
import useQuestion2 from '../../store/useQuestion2';
//import useQuestion3 from '../../store/useQuestion3'; //NOT USED
import useQuestion4 from '../../store/useQuestion4';
import useDynamicPageStore from '../../store/use[page]';
import useQuestion5Admin from '../../store/useQuestion5Admin';
import useQuestion5Vote from '../../store/useQuestion5Vote';

const getX = (text: string) =>{
    let x = 0;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const width = doc.getTextWidth(text);
    x = (pageWidth - width) / 2;
    return Math.abs(x);
}



const PDF = () => {

    const date = useQuestion1((state) => state.date)
    const song = useQuestion2((state) => state.song)
    const recording = useQuestion2((state) => state.recording)
    const voteSelection = useQuestion4((state) => state.voteSelection)
    const pages = useDynamicPageStore((state) => state.pages);
    const adminName = useQuestion5Admin((state) => state.adminName)
    const percent = useQuestion5Vote((state) => state.percent)

    const generatePDF = () =>{
        const doc = new jsPDF();

    const getY = (y: number,inc:number) =>{
        if(y>220){//new page is needed
            doc.addPage();
            return 30;
        }else{//need to increment y
            return y+inc;
        }
    }

    let x = 0;
    let y = 20;

    doc.setFont('Palatino Linotype', 'bold');
    doc.setFontSize(15);
  
    const title = 'Copyright Ownership Agreement for Musical Work and Master Recording, made as a joint work.';
    x = getX(title);
    doc.text(title, x, y);
    y = getY(y,30);

    doc.setFont('Palatino Linotype', 'normal')
    doc.setFontSize(11);
    const line1 = `This agreement is entered into on ${date} between the following parties:`
    x = 50;
    doc.text(line1,x,y)
    y = y = getY(y,15)

    doc.setFont('Palatino Linotype', 'bold')
    const line2 = `1.     Musical Work Identification`
    x = getX(line2);
    doc.text(line2,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line3 = `The contracting parties will perform and fixate a performance of the song or Musical Work titled ${song}. `
    const split3 = doc.splitTextToSize(line3,doc.internal.pageSize.getWidth()*.6)
    x = getX(line3);
    doc.text(split3,x,y)
    y = getY(y,15)

    const line3_5 = `The parties acknowledge and accept their contribution to the authorship or composition of the musical work and agree to the distribution of copyright ownership as follows:`
    const split3_5 = doc.splitTextToSize(line3_5,doc.internal.pageSize.getWidth()*.6)
    doc.text(split3_5,x,y+10)
    y = getY(y,30)

    //list collaborator info
    x = 25;
    Object.keys(pages).forEach((id) => {
        const pageData = pages[Number(id)];
        if(pageData.legalName!=''){
        doc.setFont('Palatino Linotype','bold')
        doc.text(`Collaborator ${id}`, x, y);
        y = getY(y,5)
        doc.setFont('Palatino Linotype','normal')
        doc.text(`Legal Name: ${pageData.legalName}`, x, y);
        y = getY(y,5)
        doc.text(`Email: ${pageData.email}`, x, y);
        y = getY(y,5)
        doc.text(`Contribution: ${pageData.contributorType}`, x, y);
        y = getY(y,5)
        doc.text(`Ownership Percentage: ${pageData.split}%`, x, y);
        y = getY(y,15)
        }
        });
    
    

    doc.setFont('Palatino Linotype', 'bold')
    const line4 = `2.     Identification of Master Recording`
    x = getX(line4);
    doc.text(line4,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line5 = `The contracting parties have collaborated in the recording and production of the Master Recording titled ${recording}, which fixes a performance of the Musical Work identified in clause 1 of this agreement.`
    const split5 = doc.splitTextToSize(line5,doc.internal.pageSize.getWidth()*.6)
    doc.text(split5,x/2,y)
    y = getY(y,10)

    const line6 = `The parties acknowledge and accept their contribution to the recording and production of the Master Recording and agree to the distribution of ownership as follows:`
    const split6 = doc.splitTextToSize(line6,doc.internal.pageSize.getWidth()*.6)
    doc.text(split6,x/2,y+10)
    y = getY(y,30)
        
    //useDynamicPageStore
    Object.keys(pages).forEach((id) => {
    const pageData = pages[Number(id)];
    if(pageData.legalName!=''){
    doc.setFont('Palatino Linotype','bold')
    doc.text(`Collaborator ${id}`, x/2, y);
    y = getY(y,5)
    doc.setFont('Palatino Linotype','normal')
    doc.text(`Legal Name: ${pageData.legalName}`, x/2, y);
    y = getY(y,5)
    doc.text(`Email: ${pageData.email}`, x/2, y);
    y = getY(y,5)
    doc.text(`Contribution: ${pageData.contributorType}`, x/2, y);
    y = getY(y,5)
    doc.text(`Ownership Percentage: ${pageData.split}%`, x/2, y);
    y = getY(y,15)
    }
    });

    doc.setFont('Palatino Linotype', 'bold')
    doc.setFontSize(11);
    const line7 = `3.     Rights and duties of the parties.`
    x = getX(line7);
    doc.text(line7,x/2,y)

    doc.setFont('Palatino Linotype', 'normal')
    const line8 = `The parties agree and accept the mutual assignment of copyright ownership in the proportions set forth in clauses 1 and 2 of this agreement for the Musical Work and Master Recording, respectively. Consequently, each of the parties receives for itself, in its patrimony, in perpetuity, and for the whole territory, all the rights, interests, and prerogatives granted by copyright ownership of the mentioned works, according to the law and to the present agreement. `
    const split8 = doc.splitTextToSize(line8,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',x/2,y+10)
    doc.text(split8,(x/2)+10,y+10)
    y = getY(y,30)

    const line9 = `The parties agree that the Musical Work is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Musical Work in Collaboration is divided between the Contracting Parties in the percentages established in clause 1 of the present contract. `
    const split9 = doc.splitTextToSize(line9,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',x/2,y+10)
    doc.text(split9,(x/2)+10,y+10)
    y = getY(y,25)

    //different section based on vote or admin
    if(voteSelection == "VOTE"){
        const line10_5 = `None of the parties may perform legally relevant acts on the Musical Work without the written authorization of the ${percent}% of the ownership, such as but not limited to the following:`
        const split10_5 = doc.splitTextToSize(line10_5,doc.internal.pageSize.getWidth()*.6)
        doc.text('c.',x/2,y+10)
        doc.text(split10_5,(x/2)+10,y+10)
        y = getY(y,15)

        const line11_5 = `Authorizing derivative works, granting licenses, or licensing different kinds of uses. `
        const split11_5 = doc.splitTextToSize(line11_5,doc.internal.pageSize.getWidth()*.6)
        doc.text('i.',(x/2)+10,y+10)
        doc.text(split11_5,(x/2)+20,y+10)
        y = getY(y,10)
    
        const line12_5 = `Edit, alter or modify the Musical Work, especially the contributions of the other parties, in uses or sound recordings other than the one produced under this agreement, unless authorized verbally or in writing by the co-author.`
        const split12_5 = doc.splitTextToSize(line12_5,doc.internal.pageSize.getWidth()*.6)
        doc.text('ii.',(x/2)+10,y+10)
        doc.text(split12_5,(x/2)+20,y+10)
        y = getY(y,10)
    
        const line13_5 = `Commercially exploiting the Musical Work in a manner that directly or indirectly suggests approval or endorsement of a product or service other than the Musical Work itself.`
        const split13_5 = doc.splitTextToSize(line13_5,doc.internal.pageSize.getWidth()*.6)
        doc.text('iii.',(x/2)+10,y+10)
        doc.text(split13_5,(x/2)+20,y+10)
        y = getY(y,15)
    
        const line14_5 = `Grant exclusive or non-exclusive licenses on the Musical Work to third parties.`
        const split14_5 = doc.splitTextToSize(line14_5,doc.internal.pageSize.getWidth()*.6)
        doc.text('iv.',(x/2)+10,y+10)
        doc.text(split14_5,(x/2)+20,y+10)
        y = getY(y,15)

        const line9_5 = `The parties agree that the Master Recording is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Master Recording in collaboration is divided between the Contracting Parties in the percentages established in clause 2 of the present contract.`
        const split9_5 = doc.splitTextToSize(line9_5,doc.internal.pageSize.getWidth()*.6)
        doc.text('d.',x/2,y+10)
        doc.text(split9_5,(x/2)+10,y+10)
        y = getY(y,25)

        const line10 = `None of the parties may perform legally relevant acts on the Master Recording without the written authorization of the ${percent}% of the ownership, such as but not limited to the following:`
        const split10 = doc.splitTextToSize(line10,doc.internal.pageSize.getWidth()*.6)
        doc.text('e.',x/2,y+10)
        doc.text(split10,(x/2)+10,y+10)
        y = getY(y,15)

        const line11 = `Exploiting the Sound Recording of the other contributions in a manner different from that set in the Master copy.`
        const split11 = doc.splitTextToSize(line11,doc.internal.pageSize.getWidth()*.6)
        doc.text('i.',(x/2)+10,y+10)
        doc.text(split11,(x/2)+20,y+10)
        y = getY(y,10)
    
        const line12 = `Authorizing derivative works or Editing, altering, or sampling the original Master Recording.`
        const split12 = doc.splitTextToSize(line12,doc.internal.pageSize.getWidth()*.6)
        doc.text('ii.',(x/2)+10,y+10)
        doc.text(split12,(x/2)+20,y+10)
        y = getY(y,10)
    
        const line13 = `Commercially exploiting the Master Recording in a manner that directly or indirectly suggests approval or endorsement of a product or service other than the sound recording itself.`
        const split13 = doc.splitTextToSize(line13,doc.internal.pageSize.getWidth()*.6)
        doc.text('iii.',(x/2)+10,y+10)
        doc.text(split13,(x/2)+20,y+10)
        y = getY(y,15)
    
        const line14 = `Grant exclusive or non-exclusive licenses on the Master Recording to third parties.`
        const split14 = doc.splitTextToSize(line14,doc.internal.pageSize.getWidth()*.6)
        doc.text('iv.',(x/2)+10,y+10)
        doc.text(split14,(x/2)+20,y+10)
        y = getY(y,30)

    }else{
        const line10 = `By means of the present contract, the parties recognize, accept, and declare that they designate ${adminName} as the representative in charge of making the decisions related to the commercial exploitation of the Musical Work. The designated person will make their best effort to achieve the greatest commercial benefit of the works which includes but is not limited to: offering licenses, working with publishing companies, music distributors, record labels or synchronizations. The representative is NOT authorized to sell or dispose of the copyright ownership of the Musical Work and the recording, they can only offer licenses of use. The sale of copyrights is an exclusive faculty of each owner.`
        const split10 = doc.splitTextToSize(line10,doc.internal.pageSize.getWidth()*.6)
        doc.text('c.',x/2,y+10)
        doc.text(split10,(x/2)+10,y+10)
        y = getY(y,45)

        const line11 = `The parties agree that the Master Recording is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Master Recording in collaboration is divided between the Contracting Parties in the percentages established in clause 2 of the present contract.  `
        const split11 = doc.splitTextToSize(line11,doc.internal.pageSize.getWidth()*.6)
        doc.text('d.',x/2,y+10)
        doc.text(split11,(x/2)+10,y+10)
        y = getY(y,40)

        const line12 = `By means of the present contract, the parties recognize, accept, and declare that they designate ${adminName} as the representative in charge of making the decisions related to the commercial exploitation of the Master Recording. The designated person will make their best effort to achieve the greatest commercial benefit of the works which includes but is not limited to: offering licenses, working with publishing companies, music distributors, record labels or synchronizations. The representative is NOT authorized to sell or dispose of the copyright ownership of the Master Recording and the recording, they can only offer licenses of use. The sale of copyrights is an exclusive faculty of each owner.`
        const split12 = doc.splitTextToSize(line12,doc.internal.pageSize.getWidth()*.6)
        doc.text('e.',x/2,y+10)
        doc.text(split12,(x/2)+10,y+10)
        y = getY(y,60)
    }
    
    
    doc.setFont('Palatino Linotype', 'bold')
    doc.setFontSize(11);
    const line15 = `4.     Distribution and monetization of works`
    x = getX(line15);
    doc.text(line15,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line16 = `Parties agree and accept that they shall seek and select a competitive distributor or aggregator, which shall be responsible for making the works available to the public and shall collect and pay the respective royalties to each of the Musical Work and Master Recording copyright owners according to the proportions indicated in clauses 1 and 2 of this contract. `
    const split16 = doc.splitTextToSize(line16,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split16,(x/2)+10,y)
    y = getY(y,25)

    const line17 = `The parties agree that they will seek a distributor who will professionally and responsibly collect royalties for commercial exploitation of the Musical Work and Master Recording in the respective known and unknown uses. Such a distributor will pay each copyright owner in the proportions agreed upon in clauses 1 and 2 of this contract. In the event that the works have not been distributed with an aggregator that offers the service of direct payments to each of the copyright owners, the party or administrator that receives any sum of money for royalties belonging to another of the parties must pay them within fourteen (14) days in the respective bank account.`
    const split17 = doc.splitTextToSize(line17,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',(x/2),y)
    doc.text(split17,(x/2)+10,y)
    y = getY(y,40)
 
    const line18 = `In the event that the administrator or any of the parties receives money from any third party attributable to the commercial exploitation of the Musical Work or Master Recording, such as synchronization licenses, or of any other type, the administrator or party receiving the money shall pay to the other parties the royalties corresponding to the pro rata of its participation in the copyright ownership, no later than fourteen days after receiving the money. `
    const split18 = doc.splitTextToSize(line18,doc.internal.pageSize.getWidth()*.6)
    doc.text('c.',(x/2),y)
    doc.text(split18,(x/2)+10,y)
    y = getY(y,40)

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line19 = `5.     Credits`
    doc.text(line19,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line20 = `The credits of each co-owner or collaborator shall be presented according to their corresponding role in each of the Musical Work and Master Recording, whether as author, composer, recording musician, producer, etc., and mentioning their legal or artistic name, as decided.`
    const split20 = doc.splitTextToSize(line20,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split20,(x/2)+10,y)
    y = getY(y,25)

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line21 = `6.     License for artists`
    doc.text(line21,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line22 = `Each of the co owners is hereby granted a license to use the names of artists, approved portraits, and biographical material approved by each of the parties for the exclusive purpose of promoting and commercially exploiting the Musical Work and Master Recording. Each party shall have the right to approve any biographical or identification materials selected or commissioned by the other, provided that such consent to the Biographical Materials is not unreasonably withheld or delayed. In the event of unreasonable delay, approval shall be deemed granted within five (5) business days of the date such Biographical Materials are received by the party required to grant approval.`
    const split22 = doc.splitTextToSize(line22,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split22,(x/2)+10,y)
    y = getY(y,50)

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line23 = `7.     Accounting`
    doc.text(line23,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line24 = `Each party has the right to engage a certified public accountant to audit the books and records of the administrator and other parties solely to verify the receipt and payment of monies derived from the Musical Work and Master Recording. This audit right may be exercised to verify the accuracy of such statements twice a year, at the sole expense of the party concerned and upon at least thirty (30) days prior written notice. Any objection relating to any financial statement must be filed no later than three years from the date of inspection. `
    const split24 = doc.splitTextToSize(line24,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split24,(x/2)+10,y)
    y = getY(y,40)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line25 = `8.     Full capacity and indemnity against third parties.`
    doc.text(line25,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line26 = `The parties acknowledge and declare that each of them has the capacity to contract and does so freely, without any restriction or prohibition whatsoever, including restrictions derived from record, publishing or representation agreements with any third party.`
    const split26 = doc.splitTextToSize(line26,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split26,(x/2)+10,y)
    y = getY(y,20)  

    const line27 = `The parties also declare that all their contributions to the Musical Work and Master Recording are original and do not infringe on the economic or moral rights or interests of third parties.`
    const split27 = doc.splitTextToSize(line27,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',(x/2),y)
    doc.text(split27,(x/2)+10,y)
    y = getY(y,15) 

    const line28 = `The parties agree that in the event of any claim by third parties for copyright or otherwise, the responsible party shall hold harmless the non-responsible parties from any judicial or extrajudicial claim arising out of its contribution to the Musical Work and Master Recording, or out of its participation in or performance of this contract.`
    const split28 = doc.splitTextToSize(line28,doc.internal.pageSize.getWidth()*.6)
    doc.text('c.',(x/2),y)
    doc.text(split28,(x/2)+10,y)
    y = getY(y,30)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line29 = `9.     Full autonomy and no employment relationship.`
    doc.text(line29,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line30 = `The parties understand, acknowledge, and declare that no employment relationship exists between them. They act as independent artists with full administrative and artistic autonomy. Nothing in this contract shall be construed as an employment, partnership or business relationship other than collaboration between artists for the production of a joint artistic work.`
    const split30 = doc.splitTextToSize(line30,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split30,(x/2)+10,y)
    y = getY(y,30)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line31 = `10.     Right of first refusal.`
    doc.text(line31,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line32 = `Parties agree that in the event they wish to sell or otherwise dispose of or transfer their ownership  in the copyrights of the Musical Work and Master Recording, they shall grant to the other parties a right of first refusal or first option to purchase to the other parties to the contract, first on a pro rata basis, and secondly on an individual basis. In the event that the purchase option is not exercised by the other parties, the seller may freely offer its share to the market.`
    const split32 = doc.splitTextToSize(line32,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split32,(x/2)+10,y)
    y = getY(y,35)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line33 = `11.     Notices.`
    doc.text(line33,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line34 = `The parties will be notified of any decision, controversy, negotiation or relevant matter related to this contract, via email at the electronic address that appears at the bottom of their signature. `
    const split34 = doc.splitTextToSize(line34,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split34,(x/2)+10,y)
    y = getY(y,20)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line35 = `12.     Dispute settlement.`
    doc.text(line35,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line36 = `Any controversy will be dealt with through dialogue between the parties. Failing this, they will seek to exhaust an alternative dispute resolution mechanism, and failing this, they will submit it to the competent judges under the laws of the United States of America.`
    const split36 = doc.splitTextToSize(line36,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split36,(x/2)+10,y)
    y = getY(y,20)  

    const line37 = `If any provision of this Agreement is invalid, void or unenforceable, the remainder of the Agreement shall remain in full force and effect. This Agreement may not be modified in any way except by an instrument signed by the parties. This Agreement may be signed in duplicate (and/or facsimile and/or PDF), each of which shall be deemed an original, but all of which together shall constitute the Agreement.`
    const split37 = doc.splitTextToSize(line37,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',(x/2),y)
    doc.text(split37,(x/2)+10,y)
    y = getY(y,30)  

    doc.text("In witness whereof, the collaborators sign:", x, y)
    y = getY(y,15);
    x/=2;
    Object.keys(pages).forEach((id) => {
    const pageData = pages[Number(id)];
    if(pageData.legalName!=''){
    doc.setFont('Palatino Linotype','bold')
    doc.text(`Collaborator ${id}`, x, y);
    y = getY(y,5)
    doc.setFont('Palatino Linotype','normal')
    doc.text(`Legal Name:`, x, y);
    doc.line(x+20,y,x+150,y);
    y = getY(y,5)
    doc.text(`Signature:`, x, y);
    doc.line(x+20,y,x+80,y);
    doc.text(`Date:`, x+85, y);
    doc.line(x+95,y,x+130,y);
    y = getY(y,15)
    }
    });

    doc.save('unsignedContract.pdf');
    }
    

    return generatePDF;
}

export default PDF