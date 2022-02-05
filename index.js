// const dotenv = require('dotenv')
// dotenv.config()

const NewsApi = require('./newsApi')
const NewsModel = require('./newsModel');
const NewsView = require('./newsView')

const api = new NewsApi();
const model = new NewsModel();
const view = new NewsView(model, api);

console.log('News summary app is running')

api.loadNews((data) => { 
  model.setNews(data.response.results);
  //console.log('is this an array with 10 articles', model.getNews()) //yes each element is a js object
  view.displayNews();
});
//alternative, using promises:
// api.loadNotes().then(notes => { //notes is an array that has been retrieved from server via the loadNotes and fetch method
//   model.setNotes(notes);
//   view.displayNotes();
// });
