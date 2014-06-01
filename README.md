# mtgjson-render

Generates images from card data based on the [https://github.com/freeall/mtgjson](mtgjson) format.

## Installation

`npm install mtgjson-render`

## Usage

``` js
var fs = require('fs');
var renderer = require('mtgjson-render');

var renderCard = renderer({
	margin: 10
});
var card = {
	layout: 'normal',
	type: 'Creature — Elemental',
	types: [ 'Creature' ],
	colors: [ 'Blue' ],
	multiverseid: 94,
	name: 'Air Elemental',
	subtypes: [ 'Elemental' ],
	cmc: 5,
	rarity: 'Uncommon',
	artist: 'Richard Thomas',
	power: '4',
	toughness: '4',
	manaCost: '{3}{U}{U}',
	text: 'Flying',
	flavor: 'These spirits of the air are winsome and wild and cannot be truly contained. Only marginally intelligent, they often substitute whimsy for strategy, delighting in mischief and mayhem.',
	imageName: 'air elemental'
};

renderCard(card, {setname:'Limited Edition Alpha'}, function(err, stream) {
	var out = fs.createWriteStream('Air Elemental.png');
	stream.pipe(out);
});

```

## Create renderer, ([options])

Returns a function which can create a stream with the rendered image.

Example:

``` js
var renderer = require('mtgjson-render');

var renderCard = renderer({
	zoom: 2,
	format: 'jpg'
});
```

### options

#### zoom

Zoom-level. Defaults to 1.

Can be a practical way if you want to print the rendered image and you need it in a higher resolution.

#### margin

Margin around the black border. Defaults to 0.

Can be practical if you need some whitespace before the actual rendered image.

#### width

Width of the card. Defaults to 265.

#### height

Height of the card. Defaults to 370.

#### format

Output format. Defaults to png.

Can be png, gif, jpg, pdf.

## Create image, (card, [options], callback)

Returns a stream with the generated image.

Example:

``` js
var renderer = require('mtgjson-render');

var renderCard = renderer();
renderCard(aMagicCard, {setname:'some magic set'}, function(err, stream) {
	var out = fs.createWriteStream('Air Elemental.png');
	stream.pipe(out);
});
```

### options

#### setname

The name of the set. Replaces the image of the card.