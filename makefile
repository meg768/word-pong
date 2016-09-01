

build:
	browserify ./app/components/app.js -v -d -t [babelify --presets [ es2015 react stage-2] ] -t node-lessify -t imgurify | uglifyjs -c > index.js

watch:
	watchify ./app/components/app.js -v -d -t [babelify --presets [ es2015 react stage-2] ] -t node-lessify -t imgurify -o index.js

release:
	browserify ./app/components/app.js -v -t [babelify --presets [ es2015 react stage-2] ] -t node-lessify -t imgurify | uglifyjs -c > index.js
	cp -r index.js index.html ~/Dropbox/Public/word-pong
