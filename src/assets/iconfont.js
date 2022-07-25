!(function (e) {
    var t,
        n,
        o,
        a,
        i,
        c =
            '<svg><symbol id="icon-chuanshuliebiao" viewBox="0 0 1024 1024"><path d="M806.7072 470.528A290.816 290.816 0 0 0 252.16 371.4048a217.5488 217.5488 0 0 0-9.8304 428.1344 149.1456 149.1456 0 0 0 37.0176 4.352h504.4224a167.8336 167.8336 0 0 0 167.7824-167.7824c1.0752-82.7904-62.1056-154.6752-144.896-165.5808z m-44.6464 44.6464a26.2656 26.2656 0 0 0 19.6096 7.6288h4.352a113.3056 113.3056 0 0 1 0 226.6112H280.5248a114.3808 114.3808 0 0 1-26.1632-3.2768 164.1984 164.1984 0 0 1 19.6096-324.6592 27.3408 27.3408 0 0 0 22.9888-17.408 237.3632 237.3632 0 0 1 458.6496 84.992v3.2768c-1.0752 10.9056 1.0752 17.408 6.5536 22.8864z"  ></path><path d="M489.6768 557.6704a23.1936 23.1936 0 0 0-30.72 0l-27.2384 27.2384V458.5472a21.8112 21.8112 0 1 0-43.5712 0v126.3616l-27.2384-27.2384a23.1936 23.1936 0 0 0-30.72 0 21.0432 21.0432 0 0 0 0 30.72l64.256 64.256c1.0752 1.0752 2.2016 1.0752 3.2768 2.2016s2.2016 1.0752 3.2768 2.2016c1.0752 0 2.2016 1.0752 3.2768 1.0752h10.9056c1.0752 0 2.2016-1.0752 3.2768-1.0752a22.784 22.784 0 0 0 6.5536-4.352l64.256-64.256a21.0432 21.0432 0 0 0 0-30.72zM670.72 508.672l-64.4608-64.3072-1.0752-1.0752c-1.0752 0-1.0752-1.0752-2.2016-1.0752s-1.0752-1.0752-2.2016-1.0752-1.0752-1.0752-2.2016-1.0752-1.0752 0-2.2016-1.0752h-13.056c-1.0752 0-1.0752 0-2.2016 1.0752a1.0752 1.0752 0 0 0-1.0752 1.0752c-1.0752 0-1.0752 1.0752-2.2016 1.0752l-1.0752 1.0752c-1.0752 0-1.0752 1.0752-2.2016 1.0752L510.3616 508.672a21.5552 21.5552 0 0 0 30.72 30.72L568.32 512v126.3616a21.8112 21.8112 0 0 0 43.5712 0V512l27.2384 27.2384a21.0432 21.0432 0 0 0 30.72 0 20.48 20.48 0 0 0 1.0752-30.72z"  ></path></symbol></svg>',
        d = (d = document.getElementsByTagName('script'))[d.length - 1].getAttribute(
            'data-injectcss',
        ),
        l = function (e, t) {
            t.parentNode.insertBefore(e, t);
        };
    if (d && !e.__iconfont__svg__cssinject__) {
        e.__iconfont__svg__cssinject__ = !0;
        try {
            document.write(
                '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
            );
        } catch (e) {
            console && console.log(e);
        }
    }
    function s() {
        i || ((i = !0), o());
    }
    function r() {
        try {
            a.documentElement.doScroll('left');
        } catch (e) {
            return void setTimeout(r, 50);
        }
        s();
    }
    (t = function () {
        var e,
            t = document.createElement('div');
        (t.innerHTML = c),
            (c = null),
            (t = t.getElementsByTagName('svg')[0]) &&
                (t.setAttribute('aria-hidden', 'true'),
                (t.style.position = 'absolute'),
                (t.style.width = 0),
                (t.style.height = 0),
                (t.style.overflow = 'hidden'),
                (t = t),
                (e = document.body).firstChild ? l(t, e.firstChild) : e.appendChild(t));
    }),
        document.addEventListener
            ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
                ? setTimeout(t, 0)
                : ((n = function () {
                      document.removeEventListener('DOMContentLoaded', n, !1), t();
                  }),
                  document.addEventListener('DOMContentLoaded', n, !1))
            : document.attachEvent &&
              ((o = t),
              (a = e.document),
              (i = !1),
              r(),
              (a.onreadystatechange = function () {
                  'complete' == a.readyState && ((a.onreadystatechange = null), s());
              }));
})(window);
