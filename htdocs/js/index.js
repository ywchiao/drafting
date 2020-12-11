'use strict';

let Html = function (tag) {
  let el = document.createElement(tag);

  return {
    get node() {
      return el;
    },

    appendChild: function (node) {
      el.appendChild(node);

      return this;
    },

    setAttribute: function (attribute, value) {
      el[attribute] = value;

      return this;
    },

    setClass: function (cls) {
      el.className = cls;

      return this;
    },
  };
};

function inputField(o) {
  let input = Html('input')
    .setClass('input')
    .setAttribute('placeholder', o.hint)
    .setAttribute('id', o.id)
    .setAttribute('type', o.type);

  let control = Html('p')
    .setClass('control')
    .appendChild(input.node);

  let label = Html('label')
    .setClass('control-label')
    .setAttribute('htmlFor', o.id)
    .setAttribute('textContent', o.label)
    .appendChild(control.node);

  let field = Html('div')
    .setClass('h-field')
    .appendChild(label.node)
    .appendChild(control.node);

  return field;
}

const fieldSet = {
  'account': {
    'id': 'name',
    'icon': 'credit-card',
    'hint': '王大錘',
    'type': 'text',
    'label': '姓名'
  },
  'address': {
    'id': 'hp',
    'icon': 'align-left',
    'hint': '10',
    'type': 'number',
    'label': '血量 (hp)'
  },
  'bank': {
    'id': 'ap',
    'icon': 'bank',
    'hint': '1',
    'type': 'number',
    'label': '攻擊力 (ap)'
  },
  'branch': {
    'id': 'dp',
    'icon': 'building',
    'hint': '0',
    'type': 'number',
    'label': '防禦力 (dp)'
  },
};

function getCharPane() {
  let pane = Html('div')
    .setClass('pane');

  Object.values(fieldSet).forEach(value => {
    pane.appendChild(inputField(value).node);
  });

  return pane;
};

window.addEventListener('load', () => {
  console.log("drafting.js loaded");

  let siteTitle = Html('h1')
    .setAttribute('innerHTML', 'Drafting');

  let siteSubtitle = Html('h3')
    .setAttribute('innerHTML', '一個 html/css/node.js 的練習專案');

  let siteBanner = Html('header')
    .setClass('site-banner')
    .appendChild(siteTitle.node)
    .appendChild(siteSubtitle.node);

  let siteStatus = Html('header')
    .setClass('site-status')
    .setAttribute(
      'innerHTML',
      '<span>x:<span id="cursor-x">0</span>y:<span id="cursor-y">0</span>'
    );

  let siteBody = Html('article')
    .setClass('site-body')
    .appendChild(siteStatus.node);

  let copyright = Html('small')
    .setClass('float-right')
    .setAttribute(
      'innerHTML',
      '&copy; Copyright 2020，佛光大學資訊應用學系'
    );

  let siteFooter = Html('footer')
    .setClass('site-footer')
    .appendChild(copyright.node);

  let siteContainer = Html('div')
    .setClass('site-container')
    .appendChild(siteBanner.node)
    .appendChild(siteBody.node)
    .appendChild(siteFooter.node);

  document.body.appendChild(siteContainer.node);

  // 準備承載 *網頁標題* (title) 的 HTML 元素
  let cardTitle = Html('span')
    .setAttribute('textContent', 'Drafting!');

  // 準備承載 *網頁版頭* (header) 的 HTML 元素
  let cardHeader = Html('header')
    .setClass('card-header')
    .appendChild(cardTitle.node); // 將 *網頁標題* 放上 *網頁版頭*

  let charPane = getCharPane();

  // 準備承載 *網頁內容* 的 HTML 元素
  let cardContent = Html('article')
    .setClass('card-content')
    .appendChild(charPane.node);

  // 準備 *網頁桌面* 的 HTML 元素
  let cardDesktop = Html('section')
    .setClass('card')
    .appendChild(cardHeader.node)   // 將 *網頁版頭* 放上 *網頁桌面*
    .appendChild(cardContent.node); // 將 *網頁內容* 放上 *網頁桌面*

  // 將 *網頁桌面* 放上 *網頁*
  let desktop = document
    .querySelector('.site-body')
    .appendChild(cardDesktop.node);

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
