class NewsView {
  constructor(model, api) {
    this.model = model; // new NewsModel and new ApiModel are dependency injected in within index.js main file
    this.api = api;
    this.maincontainerEl = document.querySelector('#main-container');
    //const submitButtonEl = document.querySelector('#submit-button');
    //const repoInputEl = document.querySelector('#repo-name-input');

    //submitButtonEl.addEventListener('click', () => {
      //const repoName = repoInputEl.value;

    }

  displayNews() {
    // document.querySelectorAll('.news').forEach(element => {
    //   element.remove();
    // });

    const news = this.model.getNews(); //hoping that each news element is a json object that I can access the properties of 
    console.log('in the display method', news[0].fields.thumbnail)

    news.forEach(article => {
      // const newsEl = document.createElement('div');
      // newsEl.innerText = news.fields.headline;
      // newsEl.className = 'news';
      // this.maincontainerEl.append(newsEl);
      
      const headlineEl = document.createElement('a');
      headlineEl.innerText = article.fields.headline;
      headlineEl.setAttribute('href', article.webUrl);
      headlineEl.className = 'headline-link';
      this.maincontainerEl.append(headlineEl);

      const thumbnailEl = document.createElement('img');
      thumbnailEl.src = article.fields.thumbnail;
      this.maincontainerEl.append(thumbnailEl);
    }) 
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