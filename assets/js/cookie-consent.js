const cookieStorage = {
  getItem: (key) => { // returns all cookies as an array
    const cookies = document.cookie
      .split(';')
      .map(cookie => cookie.split('='))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
    return cookies[key];
  },
  setItem: (key, value, expires) => { // sets cookie
    document.cookie = `${key}=${value}; expires=${expires}`;
  }
}

const consentPropertyName = 'cookie_consent';
const cookieExpiryDays = 7; //remember choice for given days

const shouldShowCookiePopup = () => !cookieStorage.getItem(consentPropertyName); // returns false if cookie_consent has been set

const saveCookie = (value) => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (cookieExpiryDays * 24 * 60 * 60 * 1000));
  const expires = currentDate.toUTCString();

  cookieStorage.setItem(consentPropertyName, value, expires);
}

window.onload = () => {
  if (shouldShowCookiePopup()) {
    const consentPopup = document.getElementById('cookie-consent-popup');
    const acceptButton = document.getElementById('js-cookie-consent-accept');
    const denyButton = document.getElementById('js-cookie-consent-deny');

    // show cookie consent popup when JS is loaded and consent is not set
    consentPopup.classList.remove('hidden');

    const acceptFunction = event => {
      saveCookie(true);
      consentPopup.classList.add('hidden');
    }

    const denyFunction = event => {
      saveCookie(false);
      consentPopup.classList.add('hidden');
    }

    acceptButton.addEventListener('click', acceptFunction);
    denyButton.addEventListener('click', denyFunction);
  }
}