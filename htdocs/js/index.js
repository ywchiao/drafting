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

    on: function (e, fn) {
      el.addEventListener(e, fn);

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

const Http = (() => {
  const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  });

  return {
    HTTP_OK: 200,

    HTTP_203: 203,

    HTTP_204: 204,

    get: function (url, args = {}) {
      return fetch(get_url(url, args), {
        method: "GET",
        headers: headers,
      });
    },

    head: function (url) {
      return fetch(url, {
        method: "HEAD",
        headers: headers,
      });
    },

    delete: function (url) {
      return fetch(url, {
        method: "DELETE",
        headers: headers,
      });
    },

    patch: function (url, data = {}) {
      return fetch(url, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(data)
      });
    },

    post: function (url, data = {}) {
      return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
    },

    put: function (url, data = {}) {
      return fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
      });
    },

    query: function (url, data = {}) {
      return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      }).then(response => {
        let json = {};

        if (response.status === 200) {
          json = response.json();
        }

        return json;
      });
    },
  };
})();

function inputField(key, value, binding) {
  let input = Html('input')
    .setClass('input')
    .setAttribute('placeholder', value.hint)
    .setAttribute('id', key)
    .setAttribute('type', value.type)
    .on('change', e => {
      binding[key] = e.target.value;
    });

  let control = Html('p')
    .setClass('control')
    .appendChild(input.node);

  let label = Html('label')
    .setClass('control-label')
    .setAttribute('htmlFor', key)
    .setAttribute('textContent', value.label)
    .appendChild(control.node);

  let field = Html('div')
    .setClass('h-field')
    .appendChild(label.node)
    .appendChild(control.node);

  return field;
};

const fieldSet = {
  'name': {
    'hint': '王大錘',
    'type': 'text',
    'label': '姓名',
  },
  'hp': {
    'hint': '10',
    'type': 'number',
    'label': '血量 (hp)'
  },
  'ap': {
    'hint': '1',
    'type': 'number',
    'label': '攻擊力 (ap)'
  },
  'dp': {
    'hint': '0',
    'type': 'number',
    'label': '防禦力 (dp)'
  },
};

let charData = {};

function getCharPane() {
  let pane = Html('div')
    .setClass('pane');

  Object.entries(fieldSet).forEach(([key, value]) => {
    pane.appendChild(inputField(key, value, charData).node);
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
  let btnSubmit = Html('input')
    .setAttribute('type', 'button')
    .setAttribute('value', 'Ok')
    .setClass('control-button')
    .on('click', () => {
      console.log(JSON.stringify(charData));

      Http.post(`api/update/${charData.name}`, charData);
    });

  // 準備承載 *網頁內容* 的 HTML 元素
  let cardContent = Html('article')
    .setClass('card-content')
    .appendChild(charPane.node)
    .appendChild(btnSubmit.node);

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
