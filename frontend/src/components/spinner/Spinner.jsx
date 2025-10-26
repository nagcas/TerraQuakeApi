import React from 'react';
import { ImSpinner9 } from 'react-icons/im';

export default function Spinner({ size = '2xl' }) {
  return (
    <>
      <ImSpinner9 className={`text-${size} mx-auto spinner`} />
    </>
  );
}
