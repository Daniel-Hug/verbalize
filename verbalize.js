// Verbalize is a set of tiny utility functions for converting data into human-readable text.
// All functions return a plain english string.
// https://github.com/Daniel-Hug/verbalize

(function (root, factory) {
	if (typeof define === 'function' && define.amd)
		define([], factory);
	else if (typeof exports === 'object')
		module.exports = factory();
	else root.verbalize = factory();
})(this, function () {
	var verbalize = {};


	// Capitalize the first character in a string:
	verbalize.capitalize = function(str) {
		return str.length ? str[0].toUpperCase() + str.slice(1) : str;
	};


	//	Accepts an integer and an optional verb:
	//		verbalize.times(1, 'try')
	//	Returns the number of times paired with the verb:
	//		"try once"
	verbalize.times = function(num, verb) {
		var adv = ['never', 'once', 'twice'][num] || num + ' times';
		return verb ? (num ? verb + ' ' + adv : adv + ' ' + verb) : adv;
	};


	//	Accepts an array of items, and an optional coordinating conjunction ("and" is default):
	//		verbalize.list(['apples', 'oranges', 'bananas'])
	//	Returns a comma-delimited list with the conjunction before the last item if there are 3 or more:
	//		"apples, oranges, and bananas"
	verbalize.list = function(items, cunjunction) {
		cunjunction = ' ' + (cunjunction || 'and') + ' ';
		if (items.length < 3) return items.join(cunjunction);
		return items.slice(0, -1).join(', ') + ',' + cunjunction + items[items.length - 1];
	};


	//	Accepts an integer:
	//		verbalize.order(312)
	//	Returns the integer's ordinal number:
	//		"312th"
	verbalize.order = function(num) {
		var mod100 = num % 100;
		var suffix = mod100 > 4 && mod100 < 21 ? 0 : ['st', 'nd', 'rd'][num % 10 - 1];
		return num + (suffix || 'th');
	};


	//	Accepts a singular noun:
	//		verbalize.aOrAn('apple')
	//	Returns the noun paired with the correct article:
	//		"an apple"
	//	false positives: "hour", "university", "FBI agent"
	verbalize.aOrAn = function(noun) {
		return ('aeiouAEIOU'.indexOf(noun[0]) >= 0 ? 'an ' : 'a ') + noun;
	};


	//	Accepts a singular noun:
	//		verbalize.plural('box')
	//	Returns the noun in plural form:
	//		"boxes"
	//	false positives: "ox", "potato", "half", "deer", etc.
	verbalize.plural = function(noun) {
		var lastChar = noun.slice(-1);
		if ('sxz'.indexOf(lastChar) >= 0 ||
			['ch', 'sh'].indexOf(noun.slice(-2)) >= 0) return noun + 'es';
		if (lastChar === 'y') return noun.slice(0, -1) + 'ies';
		return noun + 's';
	};


	//	Accepts a number, a singular noun, and an optional plural noun (plural is inferred using verbalize.plural if not given):
	//		verbalize.count(3, 'apple')
	//	Returns the number paired with the correct noun:
	//		"3 apples"
	verbalize.count = function(num, singular, plural) {
		plural = plural || verbalize.plural(singular);
		var noun = num === 1 ? singular : plural;
		return num + ' ' + noun;
	};


	return verbalize;
});
