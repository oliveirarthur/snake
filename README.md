# snake
Snake game in JS

To install:
```
cd app
bower install
npm install
```

To test while developing, just do:
```
cd app
gulp
```

And to deploy to the folder **game** and push to **gh-pages** branch do the following:
```
git add .
git commit
cd app
gulp build --env prod
cd ..
git add game
git commit
git subtree push --prefix game origin gh-pages
```
