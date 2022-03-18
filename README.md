# News Headlines challenge

**JavaScript | Jest**

I created a single page web app that uses the Guardian API to display the latest news headlines, with a thumbnail image, bundled using **esbuild**. I used the [`jest-fetch-mock`](https://www.npmjs.com/package/jest-fetch-mock) module to mock API requests.

Clicking on a headline links the user to the actual article page on the Guardian's website. A user can input a keyword

### Instructions for running the app

1. Install dependencies using npm install or yarn
2. `$ npm run build` to ensure esbuild is watching for any changes
3. Open the app in browser
   `$ open index.html`
4. Enter a keyword and click search headlines to filter for a particular topic

### With more time, I would plan to:

- Modify the filter/search feature so that the user could enter more than one keyword and an optional date range
- Instead of using simply pulling the results from page 1 (via Guardian API), I would modify the loadNews method to pull today's headlines
- Work on the CSS to improve the aesthetic of the page

### User Stories

```
As a busy politician
So I know what the big stories of the day are
I can see all of today's headlines in one place
```

```
As a busy politician
So that I have something nice to look at
I can see a relevant picture to illustrate each news article when I browse headlines
```

```
As a busy politician
So I can get a few more details about an important story
I can click a news article title which links to the original article
```

```
As a busy politician
So I can search what I want to read about
I can specify a search query on the page and get articles matching this search
```

### App screenshot

![Screenshot](./images/screenshot.png)
