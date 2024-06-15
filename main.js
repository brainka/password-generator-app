const checkboxElements = document.querySelectorAll('li > span');
const sliderElement = document.querySelector('#my-range');
const sliderValueElement = document.querySelector('.length');
const generateButtonElement = document.querySelector('.button-container');
const clipboardIconElement = document.querySelector('.clipboard-icon');
const copiedToClipboard = document.querySelector('span.hidden');
const strengthProgressBar = document.querySelectorAll('.strength-progress-bar');
const strengthIndicatorHeading = document.querySelector('.password-indicator');
const h2 = document.createElement('h2');
const generatedPasswordElement = document.querySelector('.password');

const uppercaseArray = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
const lowercaseArray = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
const symbolsArray = [
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'_',
	'+',
	'-',
	'.',
];
const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//add selections to the array when they are selected via checkbox
let passwordSelections = [];
let combinedCharacterArrays = [];
let generatedPassword = '';
let currentStrengthIndicator = '';

// console.log(strengthProgressBar);

const arrays = {
	uppercase: uppercaseArray,
	lowercase: lowercaseArray,
	symbols: symbolsArray,
	numbers: numbersArray,
};

function handleCheckboxClick(e) {
	copiedToClipboard.classList.add('hidden');

	combinedCharacterArrays = [];
	e.currentTarget.querySelector('img').classList.toggle('hidden');
	e.currentTarget.classList.toggle('checked');

	if (passwordSelections.includes(e.currentTarget.dataset.value)) {
		passwordSelections = passwordSelections.filter(
			(selection) => selection !== e.currentTarget.dataset.value
		);
		e.currentTarget.setAttribute('aria-checked', 'false');
	} else {
		passwordSelections = [...passwordSelections, e.currentTarget.dataset.value];
		e.currentTarget.setAttribute('aria-checked', 'true');
	}

	passwordSelections.forEach((item) => {
		combinedCharacterArrays = [...combinedCharacterArrays, ...arrays[item]];
	});
}

function handleSliderValue(e) {
	const tempSliderValue = e.target.value;
	sliderValueElement.textContent = tempSliderValue;

	const progress = (tempSliderValue / sliderElement.max) * 100;

	sliderElement.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) ${progress}%, hsl(248, 15%, 11%) ${progress}%)`;
}

function arrayShuffle() {
	for (let i = combinedCharacterArrays.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let k = combinedCharacterArrays[i];
		combinedCharacterArrays[i] = combinedCharacterArrays[j];
		combinedCharacterArrays[j] = k;
	}
}

function handleGeneratePasswordButton(e) {
	generatedPasswordElement.classList.add('generated');
	generatedPassword = '';
	arrayShuffle();

	for (let i = parseInt(sliderValueElement.textContent); i > 0; i--) {
		generatedPassword = generatedPassword + combinedCharacterArrays[i];
	}

	generatedPasswordElement.textContent = generatedPassword;

	passwordStrengthIndicator();
}

function handleCopyClipboard() {
	let copyText = document.querySelector('.password');
	let textToCopy = copyText.textContent;
	copiedToClipboard.classList.remove('hidden');
	navigator.clipboard.writeText(textToCopy);

	window.getSelection().removeAllRanges();
	document.activeElement.blur();
}

function passwordStrengthIndicator() {
	let lengthOfPassword = parseInt(sliderValueElement.textContent);

	console.log(currentStrengthIndicator);

	if (lengthOfPassword === 0) {
	}
	// else if (condition) {

	// }
	else if (passwordSelections.length <= 1) {
		console.log('too weak');
		handlePasswordStrengthColor('too-weak');
	} else if (passwordSelections.length === 2) {
		console.log('weak');
		handlePasswordStrengthColor('weak');
	} else if (passwordSelections.length === 3) {
		console.log('medium');
		handlePasswordStrengthColor('medium');
	} else if (passwordSelections.length === 4 && lengthOfPassword >= 8) {
		console.log('strong');
		handlePasswordStrengthColor('strong');
	}

	console.log(currentStrengthIndicator);
}

function handlePasswordStrengthColor(passwordStrength) {
	h2.textContent = '';

	strengthProgressBar.forEach((element) => {
		if (element.classList.contains(currentStrengthIndicator)) {
			element.classList.remove(currentStrengthIndicator);
		}
	});

	currentStrengthIndicator = passwordStrength.replace(' ', '-');

	for (let i = 0; i <= passwordSelections.length - 1; i++) {
		console.log(strengthProgressBar[i].classList);

		strengthProgressBar[i].classList.add(passwordStrength);
	}

	currentStrengthIndicator = passwordStrength.replace('-', ' ');

	h2.textContent = currentStrengthIndicator.toUpperCase();
	strengthIndicatorHeading.prepend(h2);
}

checkboxElements.forEach((item) =>
	item.addEventListener('click', handleCheckboxClick)
);

sliderElement.addEventListener('input', handleSliderValue);

generateButtonElement.addEventListener('click', handleGeneratePasswordButton);

clipboardIconElement.addEventListener('click', handleCopyClipboard);
