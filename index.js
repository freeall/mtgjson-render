var phantom = require('phantom-render-stream');
var pejs = require('pejs');
var fs = require('fs');
var path = require('path');

var views = pejs();

module.exports = function(options) {
	options = options || {};

	var zoom = options.zoom || 1;
	var margin = options.margin || 0;
	var width = options.width || 265;
	var height = options.height || 370;

	var renderHtml = phantom({
		format: options.format || 'png',
		width: zoom*(width+margin*2),
		height: zoom*(height+margin*2)
	});

	return function(card, options, callback) {
		if (!callback) {
			callback = options;
			options {}
		}
		
		if (card.power && card.toughness) card.strength = card.power + '/' + card.toughness;
		if (card.loyalty) card.strength = card.loyalty;

		card.setName = options.setname || '';
		card.manaCost = card.manaCost || '';
		card.manaCost = card.manaCost.replace(/[\{\}]/g, '');
		card.text = card.text || '';
		card.text = card.text.replace(/\{T\}/g, '<span class="tap"></span>');
		card.text = card.text.replace(/\{([WUBRGX\d]+)\}/g, '$1');
		card.text = card.text.replace(/\n\n/g, '<br />');
		card.text = card.text.replace(/\n/g, '<br />');
		card.text = card.text.replace(/—/g, '-'); // quick fix for weird '-'' character
		card.type = card.type.replace(/—/g, '-'); // quick fix for weird '-'' character

		views.render(path.join(__dirname, 'card.ejs'), {zoom:zoom, margin:margin, card:card}, function(err, html) {
			if (err) return callback(err);

			fs.writeFile(path.join(__dirname, '.tmp.html'), html, function(err) {
				if (err) return callback(err);

				callback(null, renderHtml(path.join(__dirname, '.tmp.html')));
			});
		});
	};
};
