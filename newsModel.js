class NewsModel {
  constructor() {
    this.news = [];
  }
  getNews() {
    return this.news;
  }

  setNews(news) { // this should be passed, within index.js, the news coming from the guardian api
    this.news = news; //array of each results from guardian api on the first page. 
  }
  reset() {
    this.news = [];
  }
}

module.exports = NewsModel