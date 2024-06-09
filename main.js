const checkboxElements = document.querySelectorAll('li > span');
const sliderElement = document.querySelector('#my-range');
const sliderValueElement = document.querySelector('.length');

function handleCheckboxClick(e) {
	console.log(e.currentTarget);
	e.currentTarget.querySelector('img').classList.toggle('hidden');
	e.currentTarget.classList.toggle('checked');
}

function handleSliderValue(e) {
	console.log(e.target.value);
	sliderValueElement.textContent = e.target.value;
}

checkboxElements.forEach((item) =>
	item.addEventListener('click', handleCheckboxClick)
);

sliderElement.addEventListener('input', handleSliderValue);

console.log(sliderValueElement);
