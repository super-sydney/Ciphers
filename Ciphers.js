var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

/*https://en.wikipedia.org/wiki/Caesar_cipher
Shift the alphabet by a certain number*/
function caesarShift(shift){ //returns a shifted version of the alphabet (also used in the vigenere cipher)
	let shifted = []
	alphabet.forEach(function(val, i, arr){
		if (i+shift <= alphabet.length-1){
			shifted.push(arr[i+shift]);
		}else{
			shifted.push(arr[i+shift-(alphabet.length-1)-1]);
		}
	});
	return shifted;
}

function caesarEn(text, shift){
	let shifted = caesarShift(shift), tmp = ''; 
	text = text.toLowerCase().split('');
	text.forEach(function(val, i){
		if (alphabet.includes(val)){
			tmp += shifted[alphabet.indexOf(val)];
		}else{
			tmp += val;
		}
	});
	return tmp.trim();
}

function caesarDe(text, shift){
	return caesarEn(text, 26-shift);
}

/*https://en.wikipedia.org/wiki/Atbash
Same as caesar cipher, but only with the alphabet reversed.
Only one function causethe decoding and encoding processes are the exact same.*/
function atbash(text){
	let reverse = 'abcdefghijklmnopqrstuvwxyz'.split('').reverse(), tmp = '';
	text = text.split('');
	text.forEach(function(val, i){
		if (alphabet.includes(val)){
			tmp += reverse[alphabet.indexOf(val)];
		}else{
			tmp += val;
		}
	});
	return tmp;
}

//Converts each letter to its corresponding number (a = 1, b = 2, c = 3 etc.).
function a1z26En(text){
	text = text.toLowerCase().split('')
	let tmp = '';
	text.forEach(function(val){
		if (alphabet.includes(val)){
			tmp += ((alphabet.indexOf(val)+1) + ' ');
		}else{
			tmp += val;
		}
	});
	return tmp.trim();
}

function a1z26De(text){
	text = text.split(' ');
	let tmp = ''
	text.forEach(function(val, i){
		if (text[i+1] === ' ' && text[i+2] === ' '){
			tmp += ' ';
		}else if (!isNaN(parseInt(val))){
			tmp += alphabet[val-1];
		}else{
			tmp += (val + ' ');
		}
	});
	return tmp.trim();
}

/*https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
Just read the wiki page on this one.
everything is first converted to lowercase and foreign characters/spaces are removed
(I might change these into options eventually).*/
function vigenereEn(text, key){ 
	let shifted = [], tmp = '', count = 0; 
	text = text.toLowerCase().replace(/[^a-zA-Z]/g, '').split('');
	key = key.toLowerCase().split('');
	for (char of key){
		if (!alphabet.includes(char)){
			alert('There can only be letters in the key (So no spaces or special characters like @, # or %)')
			return undefined;
		}
	}
	text.forEach(function(val){
		shifted = caesarShift(alphabet.indexOf(key[count]));
		tmp += shifted[alphabet.indexOf(val)];
		count = count === key.length-1 ? 0 : count+1;
	});
	return tmp;
}

//again, everything is converted to lowercase and foreign characters/spaces are removed.
function vigenereDe(text, key){ 
	let tmp = '', count = 0, shifted;
	text = text.toLowerCase().replace(/[^a-zA-Z]/g, '').split('');
	key = key.toLowerCase().split('');
	for (char of key){
		if (!alphabet.includes(char)){
			alert('The key can\'t contain spaces or special characters. Check if you have the correct key.');
			return undefined;
		}
	}
	text.forEach(function(val){
		shifted = caesarShift(alphabet.indexOf(key[count]));
		tmp += alphabet[shifted.indexOf(val)];
		count = count === key.length-1 ? 0 : count+1;
	});
	return tmp;
}

//Html stuffs
function show(cipher){
	for (el of document.getElementsByTagName('textarea')){
		if (el !== document.getElementById(cipher+'Done') || el !== document.getElementById(cipher+'Text') || el !== document.getElementById(cipher+'Key') || el !== document.getElementById(cipher+'Shift'))
		el.value = ''
	}
	document.getElementById('a1z26').style.display = 'none';
	document.getElementById('a1z26List').className = '';
	document.getElementById('atbash').style.display = 'none';
	document.getElementById('atbashList').className = '';
	document.getElementById('caesar').style.display = 'none';
	document.getElementById('caesarList').className = '';
	document.getElementById('vigenere').style.display = 'none';
	document.getElementById('vigenereList').className = '';
	document.getElementById(cipher+'List').className = 'active';
	document.getElementById(cipher).style.display = '';
}

function encode(cipher){
	if (cipher === 'a1z26'){
		document.getElementById('a1z26Done').value = a1z26En(document.getElementById('a1z26Text').value);
	}else if (cipher === 'atbash'){
		document.getElementById('atbashDone').value = atbash(document.getElementById('atbashText').value);
	}else if (cipher === 'caesar'){
		document.getElementById('caesarDone').value = caesarEn(document.getElementById('caesarText').value, parseInt(document.getElementById('caesarShift').value));
	}else if (cipher === 'vigenere'){
		document.getElementById('vigenereDone').value = vigenereEn(document.getElementById('vigenereText').value, document.getElementById('vigenereKey').value);
	}
}

function decode(cipher){
	if (cipher === 'a1z26'){
		document.getElementById('a1z26Done').value = a1z26De(document.getElementById('a1z26Text').value);
	}else if (cipher === 'atbash'){
		document.getElementById('atbashDone').value = atbash(document.getElementById('atbashText').value);
	}else if (cipher === 'caesar'){
		document.getElementById('caesarDone').value = caesarDe(document.getElementById('caesarText').value, parseInt(document.getElementById('caesarShift').value));
	}else if (cipher === 'vigenere'){
		document.getElementById('vigenereDone').value = vigenereDe(document.getElementById('vigenereText').value, document.getElementById('vigenereKey').value);
	}
}