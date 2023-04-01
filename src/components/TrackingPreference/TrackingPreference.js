import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


export const TrackingPreference = () => {
  const showMessageCookie = Cookies.get('showMessage') || 'true';
  const [trackingAllowed, setTrackingAllowed] = useState(null);
  const [showMessage, setShowMessage] = useState(showMessageCookie === 'true');


  useEffect(() => {
    const userPreference = Cookies.get('trackingAllowed');
    const showMessageCookie = Cookies.get('showMessage');

    if (userPreference) {
      setTrackingAllowed(userPreference === 'true');
    } else {
      setTrackingAllowed(null);
    }

    if (showMessageCookie) {
      setShowMessage(showMessageCookie === 'true');
    }
  }, []);

  const handleUserChoice = (allowed) => {
    setTrackingAllowed(allowed);
    Cookies.set('trackingAllowed', allowed, { expires: 365 });
    window[`ga-disable-${process.env.GATSBY_GTAG_TRACKING_ID}`] = !allowed;
    setShowMessage(false);
    Cookies.set('showMessage', false, { expires: 365 });
  };

  if (!showMessage) {
    return null;
  }

  return (
    <div className={`tracking-preference fixed bottom-0 left-0 w-full bg-primary text-white py-10 px-6 z-50 ${!showMessage ? 'fade-out' : ''}`}>
      {trackingAllowed === null ? (
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">
            Do you want to enable or disable Cookies?
          </p>
          <div>
            <button
              onClick={() => handleUserChoice(true)}
              className="bg-white border-black border-2 text-black font-bold py-2 px-4 mr-2"
            >
              Enable
            </button>
            <button
              onClick={() => handleUserChoice(false)}
              className="bg-white border-black border-2 text-black font-bold py-2 px-4 mr-2"
            >
              Disable
            </button>
          </div>
        </div>
      ) : (
        <p className="font-semibold text-lg">
          {trackingAllowed
            ? 'You have enabled cookies for Google Analytics.'
            : 'You have disabled cookies for Google Analytics.'}
        </p>
      )}
    </div>
  );
};
