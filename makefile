
PUBLIC_FOLDER = ~/Dropbox/Public/word-pong

PUBLIC_FILES = $(PUBLIC_FOLDER)/index.html $(PUBLIC_FOLDER)/index.js

ALL_FILES = $(shell find . -type f  -path ./app/*.*)

NODE_ENV = production

all:
	@echo Specify something...

clean:
	@rm ./index.js

build:
	browserify ./app/components/app.js -v -d -t [babelify --presets [ es2015 react stage-2] ] -t node-lessify -t imgurify | uglifyjs -c > index.js

watch:
	watchify ./app/components/app.js -v -d -t [babelify --presets [ es2015 react stage-2] ] -t node-lessify -t imgurify -o index.js

public: $(PUBLIC_FILES)
	@echo Done!

./index.js: $(ALL_FILES)
	browserify ./app/components/app.js -v -d -t [babelify --presets [ es2015 react stage-2] ] -t node-lessify -t imgurify | uglifyjs -c > $@

$(PUBLIC_FOLDER)/index.html: ./index.html
	cp $^ $@

$(PUBLIC_FOLDER)/index.js: ./index.js
	cp $^ $@
