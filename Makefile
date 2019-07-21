PORT=8000

HTTP_SERVER=python -m SimpleHTTPServer $(PORT)
HTTP_DOWN=pkill -f '$(HTTP_SERVER)'

.PHONY: all

all: index

index: chapter0 chapter1 chapter2 chapter9
	$(HTTP_SERVER) &
	node js/createPDF.js $(PORT) index
	node js/modifyPDF.js $(PORT) index
	$(HTTP_DOWN)
	evince index.pdf &

chapter0:
	$(HTTP_SERVER) &
	node js/createHTML.js $(PORT) chapter0
	$(HTTP_DOWN)

chapter1:
	$(HTTP_SERVER) &
	node js/createHTML.js $(PORT) chapter1
	$(HTTP_DOWN)

chapter2:
	$(HTTP_SERVER) &
	node js/createHTML.js $(PORT) chapter2
	$(HTTP_DOWN)

chapter9:
	$(HTTP_SERVER) &
	node js/createHTML.js $(PORT) chapter9
	$(HTTP_DOWN)

setup:
	wget https://github.com/vivliostyle/vivliostyle.js/releases/download/2019.1.106/vivliostyle-js-2019.1.106.zip
	unzip vivliostyle-js-2019.1.106.zip
	cp -R vivliostyle-js-2019.1.106/viewer ./
	rm -rf vivliostyle-js-2019.1.106*

.PHONY: clean

clean:
	rm -f chapter?.html *.pdf
