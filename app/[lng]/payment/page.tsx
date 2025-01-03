// app/payment/page.tsx
import { Suspense } from "react";
import Payment from "./Payment";

const PaymentPage = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payment params={{ lng: lng }} />
    </Suspense>
  );
};

export default PaymentPage;
