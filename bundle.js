(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // newsApi.js
  var require_newsApi = __commonJS({
    "newsApi.js"(exports, module) {
      var NewsApi2 = class {
        loadNews(callback) {
          console.log("in the loadNews method");
          fetch(`https://content.guardianapis.com/search?page=1&q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
      };
      module.exports = NewsApi2;
    }
  });

  // newsModel.js
  var require_newsModel = __commonJS({
    "newsModel.js"(exports, module) {
      var NewsModel2 = class {
        constructor() {
          this.news = [];
        }
        getNews() {
          return this.news;
        }
        setNews(news) {
          this.news = news;
        }
        reset() {
          this.news = [];
        }
      };
      module.exports = NewsModel2;
    }
  });

  // newsView.js
  var require_newsView = __commonJS({
    "newsView.js"(exports, module) {
      var NewsView2 = class {
        constructor(model2, api2) {
          this.model = model2;
          this.api = api2;
          this.maincontainerEl = document.querySelector("#main-container");
        }
        displayNews() {
          const news = this.model.getNews();
          console.log("in the display method", news[0].fields.thumbnail);
          news.forEach((article) => {
            const headlineEl = document.createElement("a");
            headlineEl.innerText = article.fields.headline;
            headlineEl.setAttribute("href", article.webUrl);
            headlineEl.className = "headline-link";
            this.maincontainerEl.append(headlineEl);
            const thumbnailEl = document.createElement("img");
            thumbnailEl.src = article.fields.thumbnail;
            this.maincontainerEl.append(thumbnailEl);
          });
        }
      };
      module.exports = NewsView2;
    }
  });

  // index.js
  var NewsApi = require_newsApi();
  var NewsModel = require_newsModel();
  var NewsView = require_newsView();
  var api = new NewsApi();
  var model = new NewsModel();
  var view = new NewsView(model, api);
  console.log("News summary app is running");
  api.loadNews((data) => {
    model.setNews(data.response.results);
    view.displayNews();
  });
})();
