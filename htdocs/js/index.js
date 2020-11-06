'use strict';

let HTML = (tag, cls) => {
  let el = document.createElement(tag);

  if (cls) {
    el.className = cls;
  }

  return el;
} // HTML()

let Html = function (tag) {
  let el = document.createElement(tag);

  return {
    node: () => {
      return el;
    },

    appendChild: function (node) {
      el.appendChild(node);

      return this;
    },

    setAttribute: function (attribute, value) {
//      this.node[attribute] = value;
      el[attribute] = value;

      return this;
    },

    setClass: function (cls) {
      el.className = cls;

      return this;
    },
  };
};

window.addEventListener('load', () => {
  console.log("drafting.js loaded");

  let siteContainer = HTML('div', 'site-container');

  let siteTitle = Html('h1')
    .setAttribute('innerHTML', 'Drafting')
    .node();

  let siteSubtitle = Html('h3')
    .setAttribute('innerHTML', '一個 html/css/node.js 的練習專案')
    .node();

  let siteBanner = Html('header')
    .setClass('site-banner')
    .appendChild(siteTitle)
    .appendChild(siteSubtitle)
    .node();

  let siteBody = HTML('article', 'site-body');
  let siteStatus = HTML('header', 'site-status');

  siteStatus.innerHTML = '<span>x:<span id="cursor-x">0</span>y:<span id="cursor-y">0</span>';

  siteBody.appendChild(siteStatus);

  let siteFooter = HTML('footer', 'site-footer');

  let copyright = HTML('small', 'float-right');
  copyright.innerHTML = '&copy; Copyright 2020，佛光大學資訊應用學系';

  siteFooter.appendChild(copyright);

  siteContainer.appendChild(siteBanner);
  siteContainer.appendChild(siteBody);
  siteContainer.appendChild(siteFooter);

  document.body.appendChild(siteContainer);

  // 準備承載 *網頁標題* (title) 的 HTML 元素
  let cardTitle = HTML('span');
  cardTitle.textContent = 'Drafting!';

  // 準備承載 *網頁版頭* (header) 的 HTML 元素
  let cardHeader = HTML('header', 'card-header');

  // 將 *網頁標題* 放上 *網頁版頭*
  cardHeader.appendChild(cardTitle);

  // 準備承載 *網頁內容* 的 HTML 元素
  let cardContent = HTML('article', 'card-content');

  // 準備 *網頁桌面* 的 HTML 元素
  let cardDesktop = HTML('section', 'card');

  // 將 *網頁版頭* 放上 *網頁桌面*
  cardDesktop.appendChild(cardHeader);

  // 將 *網頁內容* 放上 *網頁桌面*
  cardDesktop.appendChild(cardContent);

  // 將 *網頁桌面* 放上 *網頁*
  let desktop = document.querySelector('.site-body')
  desktop.appendChild(cardDesktop);

  /**
   * 滑鼠游標移動追踪
   *
   * @callback
   * @param 'mousemove' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  desktop.addEventListener('mousemove', (e) => {
    document.getElementById('cursor-x').textContent = e.clientX;
    document.getElementById('cursor-y').textContent = e.clientY;
  });
});
