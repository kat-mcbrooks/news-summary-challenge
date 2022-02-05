/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const NewsView = require('./newsView')
 const NewsModel = require('./newsModel');
 
 describe('NewsView', () => {

   const newsArray = [
    {
      'fields':{
        'headline': 'test headline 1', 
        'thumbnail': 'test_pic'
      }, 
      'webUrl': 'https://www.theguardian.com/lifeandstyle/2022/feb/05/concrete-beach-pablo-albarengas-best-phone-picture'
    },
    {
      'fields':{
        'headline': 'test headline 2', 
        'thumbnail': 'https://media.guim.co.uk/1e2ab1ced5da6ecf8d7fcca9f87d5398c1d22336/0_119_6480_3888/500.jpg'
      }, 
      'webUrl': 'https://www.theguardian.com/sport/blog/2022/feb/02/at-last-the-inventors-of-modern-skiing-have-something-to-cheer-dave-ryding'
    }
  ] 
  beforeEach(() => {
    model = new NewsModel();
    model.setNews(newsArray);
    });

  it('displays multiple news headlines in one page', () => { //user
     document.body.innerHTML = fs.readFileSync('./index.html');
  
     const view = new NewsView(model);
     view.displayNews();
    
     expect(document.querySelectorAll('.headline-link').length).toEqual(2);
     
   });
 
   it('creates a headline element with link to the original article for each article', () => {
     document.body.innerHTML = fs.readFileSync('./index.html');
   
     const view = new NewsView(model);
     view.displayNews();

     const allLinks = document.querySelectorAll('a');
     expect(allLinks[0].href).toEqual("https://www.theguardian.com/lifeandstyle/2022/feb/05/concrete-beach-pablo-albarengas-best-phone-picture");


 
   });
 //    expect(allLinks[1].fields.thumbnail).toEqual('test_pic_2');
 it('creates an image element for each news article', () => {
  document.body.innerHTML = fs.readFileSync('./index.html');
 
  const view = new NewsView(model);
  view.displayNews();

  const allImages = document.querySelectorAll('img');
  expect(allImages.length).toBe(2);
  expect(allImages[1].src).toEqual("https://media.guim.co.uk/1e2ab1ced5da6ecf8d7fcca9f87d5398c1d22336/0_119_6480_3888/500.jpg");
 });
 })