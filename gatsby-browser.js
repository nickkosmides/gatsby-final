require('./public/themeStylesheet.css');
require('./src/styles/global.css');

const Cookies = require('js-cookie');

exports.onClientEntry = () => {
  const userPreference = Cookies.get('trackingAllowed');
  if (!userPreference) {
    window[`ga-disable-${process.env.GATSBY_GTAG_TRACKING_ID}`] = true;
  } else {
    window[`ga-disable-${process.env.GATSBY_GTAG_TRACKING_ID}`] = userPreference !== 'true';
  }
};

