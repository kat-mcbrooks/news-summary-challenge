const NewsApi = require('./newsApi');
const apiKey = require('./apikey');

describe('testing NewsApi class', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('inserts a keyword into guardian url', () => {
    const api = new NewsApi();
    api.setUrl('environment');
    //api.setUrl()
    expect(api.guardianUrl).toBe(`https://content.guardianapis.com/search?page=1&q=environment&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`);
  })

  it('uses fetch to call guardian api and returns headlines', () => {
    const api = new NewsApi();
    fetch.mockResponseOnce(JSON.stringify(
      {'response':{
        'status': 'ok',
        'results':[
          {
            'fields':{
              'headline':'test headline 1', 
              'thumbnail':'test_pic_url'
              }, 
            'webUrl':'https://www.theguardian.com/lifeandstyle/2022/feb/05/concrete-beach-pablo-albarengas-best-phone-picture', 
            'sectionName':'Sport'
          },
          {
            'fields':{
              'headline': 'test headline 2', 
              'thumbnail': 'https://media.guim.co.uk/1e2ab1ced5da6ecf8d7fcca9f87d5398c1d22336/0_119_6480_3888/500.jpg'
              }, 
            'webUrl': 'https://www.theguardian.com/sport/blog/2022/feb/02/at-last-the-inventors-of-modern-skiing-have-something-to-cheer-dave-ryding',
            'sectionName':'Sport'
          }
        ]}}
        ));
    
    api.loadNews((newsData) => {
      expect(newsData.response.results[0].fields.headline).toBe('test headline 1');
      expect(newsData.response.results[1].webUrl).toBe('https://www.theguardian.com/sport/blog/2022/feb/02/at-last-the-inventors-of-modern-skiing-have-something-to-cheer-dave-ryding');
    })

   expect(fetch.mock.calls.length).toEqual(1);
   expect(fetch.mock.calls[0][0]).toEqual("https://content.guardianapis.com/search?page=1&q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=37d5ba51-0f4a-4c64-9603-7bf6e79c581b")
  })

})