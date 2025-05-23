import { useLocation } from 'react-router-dom';
import images from '../images';
import React from 'react';
import Button from '../modules/components/button/Button';
const PaymentSuccess = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;
  const event = state?.event;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <img width={150} src={images.paymentSuccess} alt="payment success" />
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Payment is Successfull for event {event?.name} and your order id is{' '}
        {orderId}
      </p>
      <Button
        text="Explore More Events"
        onClick={() => (window.location.href = '/app/events')}
      />
    </div>
  );
};

export default PaymentSuccess;
