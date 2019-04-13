import React from 'react';
import RuchLogo from '../../assets/Ruch.png';
import PocztaLogo from '../../assets/poczta.png';
import InpostLogo from '../../assets/inpost.jpg';
import MailBox from '../../assets/mailbox.jpg';

export default function({ point, onClick }) {
  let logo = MailBox;
  if (point.type === 'PACZKOMAT') {
    logo = InpostLogo;
  } else if (point.type === 'POCZTA_POLSKA') {
    logo = PocztaLogo;
  } else if (point.type === 'RUCH') {
    logo = RuchLogo;
  } else {
  }

  return (
    <img
      {...(onClick ? { onClick } : {})}
      style={{
        width: '40px',
        height: '40px'
      }}
      alt="logo"
      src={logo}
    />
  );
}
