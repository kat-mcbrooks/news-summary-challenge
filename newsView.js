const NewsModel = require("./newsModel");

class NewsView {
  constructor(model, api) {
    this.model = model; // new NewsModel and new ApiModel are dependency injected in within index.js main file
    this.api = api;
    this.maincontainerEl = document.querySelector('#main-container');

    const filterBtnEl = document.querySelector('#filter-btn');
    const filterInputEl = document.querySelector('#filter-input');

    filterBtnEl.addEventListener('click', () => {
      const keyword = filterInputEl.value;

      this.addSearchFilter(keyword);
      filterInputEl.value = "";
    })
  }

  displayNews() {
    // document.querySelectorAll('.news').forEach(element => {
    //   element.remove();
    // });

    const news = this.model.getNews();
    const newsArray = [];
    console.log('in the display method', news);
    news.forEach(article => {
      // newsEl.innerText = news.fields.headline;
      // newsEl.className = 'news';
      // this.maincontainerEl.append(newsEl);
      
      const linkEl = document.createElement('a');
      linkEl.innerText = article.fields.headline;
      linkEl.setAttribute('href', article.webUrl);
      //linkEl.className = 'headline-link';
      //this.maincontainerEl.append(headlineEl);

      const thumbnailEl = document.createElement('img');
      thumbnailEl.src = article.fields.thumbnail;
      //this.maincontainerEl.append(thumbnailEl);
      const newsEl = document.createElement('div');
      newsEl.className = 'headline';
      newsEl.appendChild(linkEl);
      newsEl.appendChild(thumbnailEl);
      newsArray.push(newsEl);
    })
    this.maincontainerEl.replaceChildren(...newsArray) 
  }

  addSearchFilter(keyword) {
    this.api.loadNews(keyword, (data) => {
      this.model.reset();
      this.model.setNews(data.response.results);
      console.log('in the addSearchFilter method', this.api.guardianUrl);
      console.log('in the addSearchFilter method', this.model.getNews());
      this.displayNews();
      document.reload
    });
    //console.log('in addSearchFilter', this.model.getNews());
   
    //console.log('after reload in addSearch', this.api.guardianUrl);

    //this.api.loadNews()
  }
}
module.exports = NewsView;

 // const repoNameEl = document.querySelector('#repo-name');
    // const repoDescriptionEl = document.querySelector('#repo-description');
    // const imgEl = document.querySelector('#imgid');

    // console.log(repoNameEl.innerHTML = data.full_name);
    // repoNameEl.innerHTML = data.full_name //repoNameEl is an h1 element so we don't call .innerText (which is used for div)
    // repoDescriptionEl.innerHTML = data.description; //repoDescriptionEl is a p element so we don't call .innerText (which is used for div)
    // imgEl.src = data.organization.avatar_url; 

    // document.getElementById("imgid").src = data.organization.avatar_url;