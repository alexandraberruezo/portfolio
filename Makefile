.PHONY: serve
serve:
	browser-sync start --server '.' --files '*'

.PHONY: gen
gen:
	rm -rf public
	mkdir public
	cp -r assets/ images/ public
	./gen_variants.py