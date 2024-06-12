const checkboxElements = document.querySelectorAll('li > span');
const sliderElement = document.querySelector('#my-range');
const sliderValueElement = document.querySelector('.length');
const generateButtonElement = document.querySelector('.button-container');
const clipboardIconElement = document.querySelector('.clipboard-icon');

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

const arrays = {
	uppercase: uppercaseArray,
	lowercase: lowercaseArray,
	symbols: symbolsArray,
	numbers: numbersArray,
};

function handleCheckboxClick(e) {
	combinedCharacterArrays = [];
	e.currentTarget.querySelector('img').classList.toggle('hidden');
	e.currentTarget.classList.toggle('checked');

	if (passwordSelections.includes(e.currentTarget.dataset.value)) {
		passwordSelections = passwordSelections.filter(
			(selection) => selection !== e.currentTarget.dataset.value
		);
	} else {
		passwordSelections = [...passwordSelections, e.currentTarget.dataset.value];
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
	generatedPassword = '';
	arrayShuffle();

	for (let i = parseInt(sliderValueElement.textContent); i > 0; i--) {
		generatedPassword = generatedPassword + combinedCharacterArrays[i];
	}

	document.querySelector('input.password').value = generatedPassword;
}

function handleCopyClipboard() {
	let copyText = document.querySelector('input.password');
	copyText.select();

	copyText.setSelectionRange(0, 9999);

	navigator.clipboard.writeText(copyText.value);
}

checkboxElements.forEach((item) =>
	item.addEventListener('click', handleCheckboxClick)
);

sliderElement.addEventListener('input', handleSliderValue);

generateButtonElement.addEventListener('click', handleGeneratePasswordButton);

clipboardIconElement.addEventListener('click', handleCopyClipboard);
