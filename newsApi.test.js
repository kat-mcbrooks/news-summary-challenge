const NewsApi = require('./newsApi');

describe('testing NewsApi class', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('uses fetch to call guardian api and returns headlines', () => {
    const api = new NewsApi();
    fetch.mockResponseOnce(JSON.stringify({ headline: 'test headline' }))

    api.loadNews((newsData) => {
      expect(newsData.headline).toBe('test headline')
    }

   expect(fetch.mock.calls.length).toEqual(1);
   expect(fetch.mock.calls[0][0]).toEqual('')
  })

})