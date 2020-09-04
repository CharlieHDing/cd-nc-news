## styling
​
X - nice neutral colour pallet
X - topics are bit small and lost
X - everything is a bit stretched - consider adding a max width
- date needs formatting
X - consider the layout to maximise use of space on article card
- NC logo is bit lost with the choice of head colour.
X - sort by buttons have underscores?
X - padding around the comment cards so the delete button doesn't touch the border
​
## UX
​
X - refresh on a subroute causes page not found, check the deployment instructions again.
X - you're rendering an error on your homepage
X - alerts are not the nicest UX, they are seen as aggressive and not particularly sleek. Consider triggering a p tag to let the person know that something is missing when they log in without a typing in the box.
X - you say I'm logged in as jessjelly and yet I can still login? I would render a logout button in this case.
X - when you login, put a prompt so they know what is acceptable username, Do you have an endpoint you could use to ensure the user actually exists?
X - failing this just get the user to pick from a drop down, OR ensure they login/logout with the same user
X - your paths are clear and make sense
X - do you no wish to down vote?
X - no need to show the article id, it is not intended for the end user to see.
X - even when I log in as a non-user I can comment, it doesn't work but it doesn't tell me it doesn't.
- there is no pointer cursor for the topic links, but the is around the perimeter for it.
- it would be nice to know what order the articles are coming back in. eg. highlight the button which has been selected.
- on slow internet speeds I'm able to attempt to delete a comment multiple times becauseI've been given no indication that the api req is going through
​
## code
​
X - when I add or delete a comment, the whole article component re-renders which is very smooth consider moving the comment state down to the comments list, so only that needs to update.
X - you have a whole component for your delete button. I would simply just let it be a button, it doesn't need to be in a form. It's a tad overkill
X - check your default values for your state. In ArticleById you've could it initially as an `[]`, when we know it is never an array but will always be an object of some kind.
X - components could generally do with a bit of refactoring and considering where state should be. I have gone into too much of this because I know this is what you were wanting to working on before I asked you to submit!
- you're trigger a cDU when you post a comment, this is unecessary as you have all the comments except the one you've just posted, just insert it into state. You're over fetching data
​
# Checklist for Northcoders News Front End
​
## README - write your own and make sure that it:
​
- [✔️] has a link to the deployed version
- [ ] provides general info about your app
- [✔️] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [✔️] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)
​
## UX
​
- [✔️] Basic styling added
- [✔️] Responsive design - _stretched across large screens_
- [✔️] Items aligned
- [✔️] Content legible (not too wide, obstructed, etc)
- [✔️] Refreshing doesn’t cause an issue on sub-pages
- [✔️] No errors in the console
- [ ] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading
​
## Functionality
​
### Login
​
- [✔️] Some indication of who is logged in
​
### Articles
​
- [✔️] Serves all articles / top articles
- [✔️] Can vote on articles
- [ ] Can vote a maximum of once in either direction per page load
- [✔️] Votes are persistent when page is refreshed
- [✔️] Topic pages load only relevant articles (especially when navigating from one topic page to another)
- [✔️] Can sort articles by date created / comment_count / votes
​
### Individual Article / Comments
​
- [✔️] Individual articles are served with comments
- [✔️] Can vote on comments
- [ ] Can vote a maximum of once in either direction per page load
- [✔️] Votes are persistent when page is refreshed
- [✔️] Can post new comments, which are persistent
- [✔️] Can only delete comments of logged in user
- [✔️] Deleted comments don’t re-appear on re-render/refresh
​
### Additional functionality:
​
- [✔️] sort comments by date created / votes
- [ ] navigate over pages of articles (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [✔️] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles
​
## Error Handling
​
- [✔️] Bad url
- [ ] Bad topic slug in url
- [✔️] Bad article id in url
- [✔️] Post comment: (No text in comment body / Can you post without logging in?)
​
## Code
​
- [✔️] Well named components
- [ ] Functional components used where possible
- [✔️] Components reused where possible (`Articles` / `Voter`...)
- [ ] Minimal state - don't hold derivable data in state
- [ ] Set state correctly, using previous state where possible
- [ ] Handle asynchronicity clearly (i.e. isLoading pattern)
- [ ] Functions are DRY (`handleChange` for controlled components / api calls)
- [✔️] Use object destructuring where possible
- [ ] Tidy? If not: ESLint / Prettier
- [ ] `node_modules` git ignored
- [ ] No `console.log`s / comments
- [ ] remove unnecessary files (e.g. App.test.js)
​
## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END
​
## Once everything else is complete, here are some extra challenges:
​
- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Add integration tests with `cypress`
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Use React Hooks
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the articles a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent articles e.g. last 10 minutes