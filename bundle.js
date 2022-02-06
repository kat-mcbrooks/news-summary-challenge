(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // apikey.js
  var require_apikey = __commonJS({
    "apikey.js"(exports, module) {
      var apiKey = "37d5ba51-0f4a-4c64-9603-7bf6e79c581b";
      module.exports = apiKey;
    }
  });

  // newsApi.js
  var require_newsApi = __commonJS({
    "newsApi.js"(exports, module) {
      var apiKey = require_apikey();
      var NewsApi2 = class {
        constructor() {
          this.guardianUrl = `https://content.guardianapis.com/search?page=1&q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`;
        }
        setUrl(keyword) {
          console.log(keyword);
          this.guardianUrl = `https://content.guardianapis.com/search?page=1&q=${keyword}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`;
          console.log(this.guardianUrl);
        }
        loadNews(callback) {
          console.log("in the loadNews method", this.guardianUrl);
          fetch(this.guardianUrl).then((response) => response.json()).then((data) => {
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
          const filterBtnEl = document.querySelector("#filter-btn");
          const filterInputEl = document.querySelector("#filter-input");
          filterBtnEl.addEventListener("click", () => {
            const keyword = filterInputEl.value;
            this.addSearchFilter(keyword);
            document.querySelector("#filter-input").value = "";
          });
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
        addSearchFilter(keyword) {
          this.api.setUrl(keyword);
          console.log("before reload in addSearch", this.api.guardianUrl);
          document.location.reload();
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
