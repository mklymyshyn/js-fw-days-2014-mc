DEPENDENCIES := react twitter

run:
	python -m SimpleHTTPServer

install:
	$(foreach p,$(DEPENDENCIES),bower install $p;)
	npm install -g react-tools
	npm install grunt
