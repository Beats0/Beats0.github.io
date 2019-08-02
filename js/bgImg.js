(function f() {
    var r = Math.random()
    var bg = r > 0.5
    ? 'https://steamuserimages-a.akamaihd.net/ugc/775101441379220784/162E37914A5EE563B10EA1FBCDD686CE73297EC4/'
    : 'https://steamuserimages-a.akamaihd.net/ugc/775101441379221292/49A7E4CF30A14DFAD6782F769E1538ABD6895981/'
    var bgImg = document.querySelector('#bgImg');
    bgImg.style.backgroundImage='url(' + bg + ')';
}())
