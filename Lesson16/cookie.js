// document.cookie = encodeURIComponent('my name') + '=' + encodeURIComponent('vasya pupkin');

// Cookie
// path=/
// domain=.site.com
// expires=Thu, 12 Nov 2020 18:27:48 GMT
// max-age=3600
// secure
// samesite=lax (XSRF)
// httpOnly

function setCookie(name, value, option) {
    const currentOptions = {
        path: '/',
        ...option
    };

    if (currentOptions.expires instanceof Date) {
        currentOptions.expires = currentOptions.expires.toUTCString();
    }

    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let key in currentOptions) {
        cookie += '; ' + key;

        if (currentOptions[key] !== true) {
            cookie += '=' + currentOptions[key];
        }
    }

    document.cookie = cookie;
}

setCookie('user', 'john', { path: '/Lesson16', expires: new Date(2020, 11, 2, 12, 3) });
setCookie('auth', 'token', { expires: new Date(2020, 11, 2, 12, 3) });

function getCookie(name) {
    const cookies = document.cookie.split(';')
        .reduce(
            (result, cookieStr) => {
                const [name, value] = cookieStr.trim().split('=');

                result[name] = value;

                return result;
            },
            {}
        );

    return cookies[name];
}

function deleteCookie(name, options = {} ) {
    const currentDate = new Date();

    currentDate.setSeconds(currentDate.getSeconds() - 1);

    setCookie(name, '', { ...options, 'expires': currentDate });
}

console.log( 'auth', getCookie('auth') );
console.log( 'user', getCookie('user') );

deleteCookie('user', { path: '/Lesson16' });

console.log( 'user', getCookie('user') );

// GDPR
