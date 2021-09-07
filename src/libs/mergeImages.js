
import { withCap } from '../constant';
// Defaults
const defaultOptions = {
	format: 'image/png',
	quality: 0.92,
	width: undefined,
	height: undefined,
	Canvas: undefined,
	crossOrigin: undefined
};

// Return Promise
let mergeImages = function (sources, options, text, signIndex) {
	if (sources === void 0) sources = [];
	if (options === void 0) options = {};

	return new Promise(function (resolve) {
		options = Object.assign({}, defaultOptions, options);

		// Setup browser/Node.js specific variables
		var canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
		var Image = options.Image || window.Image;

		// Load sources
		var images = sources.map(function (source) {
			return new Promise(function (resolve, reject) {
				// Convert sources to objects
				if (source.constructor.name !== 'Object') {
					source = { src: source };
				}

				// Resolve source and img when loaded
				var img = new Image();
				img.crossOrigin = options.crossOrigin;
				img.onerror = function () { return reject(new Error('Couldn\'t load image')); };
				img.onload = function () { return resolve(Object.assign({}, source, { img: img })); };
				img.src = source.src;
			});
		});

		// Get canvas context
		var ctx = canvas.getContext('2d');

		// When sources have loaded
		resolve(Promise.all(images)
			.then(function (images) {
				// Set canvas dimensions
				var getSize = function (dim) { return options[dim] || Math.max.apply(Math, images.map(function (image) { return image.img[dim]; })); };
				canvas.width = getSize('width');
				canvas.height = getSize('height');

				const hasCap = withCap.findIndex(e => e == signIndex);


				if (hasCap >= 0) {
					ctx.globalAlpha = images[0].opacity ? images[0].opacity : 1;
					ctx.drawImage(images[0].img, images[0].x || 0, images[0].y || 0);
				} else {
					// Draw images to canvas
					images.forEach(function (image) {
						ctx.globalAlpha = image.opacity ? image.opacity : 1;
						return ctx.drawImage(image.img, image.x || 0, image.y || 0);
					});
				}




				if (hasCap >= 0) {
					if (text) {
						ctx.beginPath();
						ctx.moveTo(0, 130);
						ctx.lineTo(130, 0);
						ctx.lineTo(80, 0);
						ctx.lineTo(0, 80);
						ctx.closePath();
						ctx.fillStyle = "#13C2C2";
						ctx.fill();
						ctx.restore();
						ctx.beginPath();
						ctx.fillStyle = "#000";
						ctx.font = "28px SnaredrumZeroNbp";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						ctx.translate(-30, -20);
						ctx.rotate(-45 * Math.PI / 180);
						ctx.fillText(text, 10, 100);
					}
				} else {
					ctx.fillStyle = "#000";
					ctx.font = "28px SnaredrumZeroNbp";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(text, 164, 80);
				}

				if (options.Canvas && options.format === 'image/jpeg') {
					// Resolve data URI for node-canvas jpeg async
					return new Promise(function (resolve, reject) {
						canvas.toDataURL(options.format, {
							quality: options.quality,
							progressive: false
						}, function (err, jpeg) {
							if (err) {
								reject(err);
								return;
							}
							resolve(jpeg);
						});
					});
				}

				// Resolve all other data URIs sync
				return canvas.toDataURL(options.format, options.quality);
			}));
	});
};



export default mergeImages;
