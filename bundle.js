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
        loadNews(keyword, callback) {
          console.log("in the loadNews method", keyword);
          this.guardianUrl = `https://content.guardianapis.com/search?page=1&q=${keyword}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`;
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
      var NewsModel2 = require_newsModel();
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
            filterInputEl.value = "";
          });
        }
        displayNews() {
          const news = this.model.getNews();
          const newsArray = [];
          console.log("in the display method", news);
          news.forEach((article) => {
            const linkEl = document.createElement("a");
            linkEl.innerText = article.fields.headline;
            linkEl.setAttribute("href", article.webUrl);
            const thumbnailEl = document.createElement("img");
            thumbnailEl.src = article.fields.thumbnail;
            const newsEl = document.createElement("div");
            newsEl.className = "headline";
            newsEl.appendChild(linkEl);
            newsEl.appendChild(thumbnailEl);
            newsArray.push(newsEl);
          });
          this.maincontainerEl.replaceChildren(...newsArray);
        }
        addSearchFilter(keyword) {
          this.api.loadNews(keyword, (data) => {
            this.model.reset();
            this.model.setNews(data.response.results);
            console.log("in the addSearchFilter method", this.api.guardianUrl);
            console.log("in the addSearchFilter method", this.model.getNews());
            this.displayNews();
            document.reload;
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
  api.loadNews("", (data) => {
    model.setNews(data.response.results);
    view.displayNews();
  });
})();
