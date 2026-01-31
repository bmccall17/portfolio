
(function () {
    const PARAM_NAME = 'update';
    const COOKIE_NAME = 'site_update';
    const CLASS_NAME_UPDATE = 'update-active';
    const CLASS_NAME_LEGACY = 'legacy-active';

    // Helper to set cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Helper to get cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Helper to clear cookie
    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // Logic
    const urlParams = new URLSearchParams(window.location.search);
    const updateParam = urlParams.get(PARAM_NAME);

    if (updateParam === '1') {
        setCookie(COOKIE_NAME, '1', 30);
    } else if (updateParam === '0') {
        eraseCookie(COOKIE_NAME);
    }

    const cookieVal = getCookie(COOKIE_NAME);
    const defaultOn = window.UPDATE_DEFAULT_ON || false;

    if (cookieVal === '1' || defaultOn) {
        document.documentElement.classList.add(CLASS_NAME_UPDATE);
        document.documentElement.classList.remove(CLASS_NAME_LEGACY);
        console.log('Site Update: Active');
    } else {
        document.documentElement.classList.add(CLASS_NAME_LEGACY);
        document.documentElement.classList.remove(CLASS_NAME_UPDATE);
        // console.log('Site Update: Legacy');
    }
})();
