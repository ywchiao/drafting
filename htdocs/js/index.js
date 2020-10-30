window.addEventListener('load', () => {
  console.log("drafting.js loaded");

  let siteContainer = document.createElement('div');
  siteContainer.className = 'site-container';

  let siteBanner = document.createElement('header');
  siteBanner.className = 'site-banner';

  let siteTitle = document.createElement('h1');
  siteTitle.innerHTML = 'Drafting:';

  let siteSubtitle = document.createElement('h3');
  siteSubtitle.innerHTML = '一個 html/css/node.js 的練習專案';

  siteBanner.appendChild(siteTitle);
  siteBanner.appendChild(siteSubtitle);

  let siteBody = document.createElement('article');
  siteBody.className = 'site-body';

  let siteStatus = document.createElement('header');
  siteStatus.className = 'site-status';

  siteStatus.innerHTML = '<span>x:<span id="cursor-x">0</span>y:<span id="cursor-y">0</span>';

  siteBody.appendChild(siteStatus);

  let siteFooter = document.createElement('footer');
  siteFooter.className = 'site-footer';

  let copyright = document.createElement('small');
  copyright.className = 'float-right';
  copyright.innerHTML = '&copy; Copyright 2020，佛光大學資訊應用學系';

  siteFooter.appendChild(copyright);

  siteContainer.appendChild(siteBanner);
  siteContainer.appendChild(siteBody);
  siteContainer.appendChild(siteFooter);

  document.body.appendChild(siteContainer);

  // 準備承載 *網頁標題* (title) 的 HTML 元素
  let cardTitle = document.createElement('span');
  cardTitle.textContent = 'Drafting!';

  // 準備承載 *網頁版頭* (header) 的 HTML 元素
  let cardHeader = document.createElement('header');
  cardHeader.className = 'card-header';

  // 將 *網頁標題* 放上 *網頁版頭*
  cardHeader.appendChild(cardTitle);

  // 準備承載 *網頁內容* 的 HTML 元素
  let cardContent = document.createElement('article');
  cardContent.className = 'card-content';

  // 準備 *網頁桌面* 的 HTML 元素
  let cardDesktop = document.createElement('section');
  cardDesktop.className = 'card';

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
