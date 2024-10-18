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

    const date = useQuestion1((state) => state.split)
    const song = useQuestion2((state) => state.song)
    const voteSelection = useQuestion4((state) => state.voteSelection)
    const pages = useDynamicPageStore((state) => state.pages);
    const adminName = useQuestion5Admin((state) => state.adminName)
    const percent = useQuestion5Vote((state) => state.percent)

    const generatePDF = () =>{
        const doc = new jsPDF();

    const getY = (y: number,inc:number) =>{
        if(y>230){//new page is needed
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
  
    const title = 'Copyright Ownership Agreement for Master Recording';
    x = getX(title);
    doc.text(title, x, y);
    y = getY(y,10);

    doc.setFont('Palatino Linotype', 'normal')
    doc.setFontSize(11);
    const line1 = `This agreement is entered into on ${date}  between the following parties:`
    x = getX(line1);
    doc.text(line1,x,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'bold')
    const line2 = `1.0     Musical Work Identification`
    x = getX(line2);
    doc.text(line2,x,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line3 = `The contracting parties will perform and fixate a performance of the song or Musical Work titled ${song}. `
    const split3 = doc.splitTextToSize(line3,doc.internal.pageSize.getWidth()*.6)
    x = getX(line3);
    doc.text(split3,x,y)
    y = getY(y,10)

    const line6 = `The parties acknowledge and accept their contribution to the recording and production of the Master Recording and agree to the distribution of ownership as follows:`
    const split6 = doc.splitTextToSize(line6,doc.internal.pageSize.getWidth()*.6)
    doc.text(split6,x/2,y+10)
    y = getY(y,30)
    
     
        
    //useDynamicPageStore
    Object.keys(pages).forEach((id) => {
    const pageData = pages[Number(id)];
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
    });

    doc.setFont('Palatino Linotype', 'bold')
    doc.setFontSize(11);
    const line7 = `2.0     Rights and duties of the parties.`
    x = getX(line7);
    doc.text(line7,x/2,y)

    doc.setFont('Palatino Linotype', 'normal')
    const line8 = `The parties agree and accept the mutual assignment of copyright ownership in the proportions set forth in clause 2 of this agreement for the Master Recording. Consequently, each of the parties receives for itself, in its patrimony, in perpetuity, and for the whole territory, all the rights, interests, and prerogatives granted by copyright ownership of the mentioned work, according to the law and to the present agreement. `
    const split8 = doc.splitTextToSize(line8,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',x/2,y+10)
    doc.text(split8,(x/2)+10,y+10)
    y = getY(y,30)

    const line9 = `The parties agree that the Master Recording is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Master Recording in collaboration is divided between the Contracting Parties in the percentages established in clause 2 of the present contract.`
    const split9 = doc.splitTextToSize(line9,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',x/2,y+10)
    doc.text(split9,(x/2)+10,y+10)
    y = getY(y,25)

    //different section based on vote or admin
    if(voteSelection == "VOTE"){
        const line10 = `The parties co-owning the Musical Work shall refrain from performing legally relevant acts without the written authorization of the ${percent}% of the ownership interest, such as but not limited to the following.`
        const split10 = doc.splitTextToSize(line10,doc.internal.pageSize.getWidth()*.6)
        doc.text('c.',x/2,y+10)
        doc.text(split10,(x/2)+10,y+10)
        y = getY(y,15)

        const line11 = `Authorizing derivative works, granting licenses, or licensing different kinds of uses.`
        const split11 = doc.splitTextToSize(line11,doc.internal.pageSize.getWidth()*.6)
        doc.text('i.',(x/2)+10,y+10)
        doc.text(split11,(x/2)+20,y+10)
        y = getY(y,10)
    
        const line12 = `Edit, alter or modify the Musical Work, especially the contributions of the other parties, in uses or sound recordings other than the one produced under this agreement, unless authorized verbally or in writing by the co-author.`
        const split12 = doc.splitTextToSize(line12,doc.internal.pageSize.getWidth()*.6)
        doc.text('ii.',(x/2)+10,y+10)
        doc.text(split12,(x/2)+20,y+10)
        y = getY(y,15)
    
        const line13 = `Exploiting the name of other parties in a manner that suggests approval or endorsement of a third-party product or service other than the Musical Work itself.`
        const split13 = doc.splitTextToSize(line13,doc.internal.pageSize.getWidth()*.6)
        doc.text('iii.',(x/2)+10,y+10)
        doc.text(split13,(x/2)+20,y+10)
        y = getY(y,25)
    
    }else{
        const line10 = `By means of the present contract, the parties recognize, accept, and declare that they designate ${adminName} as the representative in charge of making the decisions related to the commercial exploitation of the Musical Work. The designated person will make their best effort to achieve the greatest commercial benefit of the work, which includes but is not limited to: offering licenses, working with publishing companies, music distributors, record labels or synchronizations. The representative is NOT authorized to sell or dispose of the copyright ownership of the Musical Work and the recording; they can only offer licenses of use. The sale of copyrights is an exclusive faculty of each owner.
`
        const split10 = doc.splitTextToSize(line10,doc.internal.pageSize.getWidth()*.6)
        doc.text('c.',x/2,y+10)
        doc.text(split10,(x/2)+10,y+10)
        y = getY(y,65)
    }
    
    
    doc.setFont('Palatino Linotype', 'bold')
    doc.setFontSize(11);
    const line15 = `3.0     Distribution and monetization of works`
    x = getX(line15);
    doc.text(line15,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line16 = `Parties agree and accept that they shall seek and select a competitive distributor or aggregator, which shall be responsible for making the works available to the public and shall collect and pay the respective royalties to each of the Master Recording copyright owners according to the proportions indicated in clause 2 of this contract.`
    const split16 = doc.splitTextToSize(line16,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split16,(x/2)+10,y)
    y = getY(y,25)

    const line17 = `The parties agree that they will seek a distributor who will professionally and responsibly collect royalties for commercial exploitation of the Master Recording in the respective known and unknown uses. Such a distributor will pay each copyright owner in the proportions agreed upon in clause 2 of this contract. In the event that the works have not been distributed with an aggregator that offers the service of direct payments to each of the copyright owners, the party that receives any sum of money for royalties belonging to another of the parties, must pay them within 14 days in the respective bank account.`
    const split17 = doc.splitTextToSize(line17,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',(x/2),y)
    doc.text(split17,(x/2)+10,y)
    y = getY(y,40)
 
    const line18 = `The parties agree that they will seek a distributor who will professionally and responsibly collect royalties for commercial exploitation of the Master Recording in the respective known and unknown uses. Such a distributor will pay each copyright owner in the proportions agreed upon in clause 2 of this contract. In the event that the works have not been distributed with an aggregator that offers the service of direct payments to each of the copyright owners, the party that receives any sum of money for royalties belonging to another of the parties, must pay them within 14 days in the respective bank account.`
    const split18 = doc.splitTextToSize(line18,doc.internal.pageSize.getWidth()*.6)
    doc.text('c.',(x/2),y)
    doc.text(split18,(x/2)+10,y)
    y = getY(y,40)

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line19 = `4.0     Credits`
    doc.text(line19,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line20 = `The credits of each co-owner or collaborator shall be presented according to their corresponding role in the Master Recording, whether as recording musician, producer, etc., and mentioning their legal or artistic name, as decided.`
    const split20 = doc.splitTextToSize(line20,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split20,(x/2)+10,y)
    y = getY(y,25)

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line21 = `5.0     License for artists`
    doc.text(line21,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line22 = `Each of the co owners is hereby granted a license to use the names of artists, approved portraits, and biographical material approved by each of the parties for the exclusive purpose of promoting and commercially exploiting the Master Recording. Each party shall have the right to approve any biographical or identification materials selected or commissioned by the other, provided that such consent to the Biographical Materials is not unreasonably withheld or delayed. In the event of unreasonable delay, approval shall be deemed granted within five (5) business days of the date such Biographical Materials are received by the party required to grant approval.`
    const split22 = doc.splitTextToSize(line22,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split22,(x/2)+10,y)
    y = getY(y,50)

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line23 = `6.0     Accounting`
    doc.text(line23,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line24 = `Each party has the right to engage a certified public accountant to audit the books and records of the other parties solely to verify the receipt and payment of monies derived from the Master Recording. This audit right may be exercised to verify the accuracy of such statements twice a year, at the sole expense of the party concerned and upon at least thirty (30) days prior written notice. Any objection relating to any financial statement must be filed no later than three years from the date of inspection.`
    const split24 = doc.splitTextToSize(line24,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split24,(x/2)+10,y)
    y = getY(y,40)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line25 = `7.0     Full capacity and indemnity against third parties.`
    doc.text(line25,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line26 = `The parties acknowledge and declare that each of them has the capacity to contract and does so freely, without any restriction or prohibition whatsoever, including restrictions derived from record, publishing or representation agreements with any third party.`
    const split26 = doc.splitTextToSize(line26,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split26,(x/2)+10,y)
    y = getY(y,20)  

    const line27 = `The parties also declare that all their contributions to the Master Recording are original and do not infringe on the economic or moral rights or interests of third parties.`
    const split27 = doc.splitTextToSize(line27,doc.internal.pageSize.getWidth()*.6)
    doc.text('b.',(x/2),y)
    doc.text(split27,(x/2)+10,y)
    y = getY(y,15) 

    const line28 = `The parties agree that in the event of any claim by third parties for copyright or otherwise, the responsible party shall hold harmless the non-responsible parties from any judicial or extrajudicial claim arising out of its contribution to the Master Recording, or out of its participation in or performance of this contract. `
    const split28 = doc.splitTextToSize(line28,doc.internal.pageSize.getWidth()*.6)
    doc.text('c.',(x/2),y)
    doc.text(split28,(x/2)+10,y)
    y = getY(y,30)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line29 = `8.0     Full autonomy and no employment relationship.`
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
    const line31 = `9.0     Right of first refusal.`
    doc.text(line31,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line32 = `Parties agree that in the event they wish to sell or otherwise dispose of or transfer their ownership in the copyrights of the Master Recording, they shall grant to the other parties a right of first refusal or first option to purchase to the other parties to the contract, first on a pro rata basis, and secondly on an individual basis. In the event that the purchase option is not exercised by the other parties, the seller may freely offer its share to the market.`
    const split32 = doc.splitTextToSize(line32,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split32,(x/2)+10,y)
    y = getY(y,35)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line33 = `10.0     Notices.`
    doc.text(line33,x/2,y)
    y = getY(y,10)

    doc.setFont('Palatino Linotype', 'normal')
    const line34 = `The parties will be notified of any decision, controversy, negotiation or relevant matter related to this contract, via email or certified physical mail at the physical and electronic addresses that appear at the bottom of their signature. `
    const split34 = doc.splitTextToSize(line34,doc.internal.pageSize.getWidth()*.6)
    doc.text('a.',(x/2),y)
    doc.text(split34,(x/2)+10,y)
    y = getY(y,20)  

    doc.setFont('Palatino Linotype','bold')
    doc.setFontSize(11);
    const line35 = `11.0     Dispute settlement.`
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
    doc.setFont('Palatino Linotype','bold')
    doc.text(`Collaborator ${id}`, x, y);
    y = getY(y,5)
    doc.setFont('Palatino Linotype','normal')
    doc.text(`Legal Name:`, x, y);
    doc.line(x+20,y,x+150,y);
    y = getY(y,5)
    doc.text(`Artistic Name:`, x, y);
    doc.line(x+20,y,x+150,y);
    y = getY(y,5)
    doc.text(`Home address:`, x, y);
    doc.line(x+25,y,x+100,y);
    y = getY(y,5)
    doc.text(`Signature:`, x, y);
    doc.line(x+20,y,x+80,y);
    doc.text(`Date:`, x+85, y);
    doc.line(x+95,y,x+130,y);
    y = getY(y,15)
    });

    doc.save('unsignedContract.pdf');
    }
    

    return generatePDF;
}

export default PDF