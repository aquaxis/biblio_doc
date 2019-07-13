PORT=8000

.PHONY: all

all: index

index: chapter0 chapter1 chapter2 chapter9
	python -m SimpleHTTPServer &
	node js/createPDF.js $(PORT) index
	node js/modifyPDF.js $(PORT) index
	pkill python
	evince index.pdf &

chapter0:
	python -m SimpleHTTPServer &
	node js/createHTML.js $(PORT) chapter0
	pkill python

chapter1:
	python -m SimpleHTTPServer &
	node js/createHTML.js $(PORT) chapter1
	pkill python

chapter2:
	python -m SimpleHTTPServer &
	node js/createHTML.js $(PORT) chapter2
	pkill python

chapter9:
	python -m SimpleHTTPServer &
	node js/createHTML.js $(PORT) chapter9
	pkill python

setup:
	wget https://github.com/vivliostyle/vivliostyle.js/releases/download/2019.1.106/vivliostyle-js-2019.1.106.zip
	unzip vivliostyle-js-2019.1.106.zip
	cp -R vivliostyle-js-2019.1.106/viewer ./
	rm -rf vivliostyle-js-2019.1.106*

.PHONY: clean

clean:
	rm -f chapter?.html *.pdf
