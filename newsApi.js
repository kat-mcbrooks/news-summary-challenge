class NewsApi {

  loadNews(callback) {
    console.log('in the loadNews method')
    
    //const apiKey = process.env.NEWS_API_KEY;
    fetch(`https://content.guardianapis.com/search?page=1&q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      
      callback(data) //this will be the function that is passed in index.js
    });
  }
}
module.exports = NewsApi;