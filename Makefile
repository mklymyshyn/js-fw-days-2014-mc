DEPENDENCIES := react twitter
NPM_DEPENDENCIES := grunt grunt-contrib-watch grunt-react

run:
	python -m SimpleHTTPServer

install:
	$(foreach p,$(DEPENDENCIES),bower install $p;)
	npm install -g react-tools
	$(foreach p,$(NPM_DEPENDENCIES),npm install $p;)

