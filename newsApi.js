const apiKey = require('./apikey');

class NewsApi {

constructor() {
  this.guardianUrl = `https://content.guardianapis.com/search?page=1&q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`
}
  setUrl(keyword) {
    console.log(keyword);
    this.guardianUrl = `https://content.guardianapis.com/search?page=1&q=${keyword}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`;
    console.log(this.guardianUrl);
  }
  
  loadNews(callback) {
    console.log('in the loadNews method', this.guardianUrl)
    //const keyword = this.keyword
    //const apiKey = process.env.NEWS_API_KEY;
    fetch(this.guardianUrl)
    .then(response => response.json())
    .then(data => {
      
      callback(data) //this will be the function that is passed in index.js
    });
  }
}
module.exports = NewsApi;