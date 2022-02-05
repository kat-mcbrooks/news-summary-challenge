const NewsModel = require('./newsModel');

describe('NewsModel class', () => {
  const newsArray = [
    {
      'fields':{
        'headline': 'test headline 1', 
        'thumbnail': 'test_pic'
      }, 
      'webUrl': 'test.co.uk'
    }
  ] 
  
  it('contains news headlines within array', () => {
    const model = new NewsModel();
    model.setNews(newsArray);
    expect(model.getNews()).toEqual(newsArray);
  })

  it('resets i.e. clears news headlines from array', () => {
    const model = new NewsModel();
    model.setNews(newsArray);
    model.reset();
    expect(model.getNews()).toEqual([]);
  })
})
