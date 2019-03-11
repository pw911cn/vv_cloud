
//index css配置
var indextt = window.indexTheme;
for (var item in indextt) {
    dynamicLoadCss(indextt[item]+'?'+version);
}

//业务 css配置
var commontt = window.commonTheme;
for (var item in commontt) {
    dynamicLoadCss(commontt[item]+'?'+version);
}


//写入 link css 文件
function dynamicLoadCss(url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}



