// app/payment/page.tsx
import { Suspense } from 'react';
import Payment from './Payment';

const PaymentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payment />
    </Suspense>
  );
};

export default PaymentPage;
