NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= ./test/*-test.js ./test/**/*-test.js
TEST_FLAGS = -spec

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/railway-bootstrap/*.js
	dox \
		--title Railway-Bootstrap \
		--desc "Render Twitter Bootstrap HTML forms with RailwayJS models" \
		$(shell find lib/railway-bootstrap/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
