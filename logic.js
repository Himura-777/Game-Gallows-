let answer = '';
let answerState = '';
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
	//сброс количество допущенных ошибок до нуля
	mistakesCount = 0;
	//сброс состояние клавиатуры в начальное состояние
	lettersState = getDefaultKeyboard();
	//отрисовка начальное состояние игрового персонажа
	drawPerson(mistakesCount);
	//отрисовка состояние клавиатуры
	drawBoard(lettersState);
	//генерация новое слово
	generateWord();
}

function generateWord() {
	//генерируйте целое число от 0 до длины массива dictionary и по сгенерированному числу получите элемент из массива dictionary
	answer = dictionary[Math.floor(Math.random() * dictionary.length)];
	//генерация строку с символами "*" длины сгенерированного слова
	answerState = '*'.repeat(answer.length);
	//отрисовка начальное состояние состояние отгаданного слова
	drawAnswerState(answerState);
}

function onKeyClick(letter) {
	//проверка проигрыш игры
	if (mistakesCount == 7) {
		alert('Game over');
		startGame();
		return;
	}

	let letterFromState;

	//нахождение кликнутый символ в состояние клавиатуры
	for (let i = 0; i < lettersState.length; i++) {
		if (letter === lettersState[i].char) {
			letterFromState = lettersState[i];
			break;
		}
	}

	//проверка: отсутствует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как ошибочный
	if (!letterFromState.error && !answer.includes(letter)) {
		mistakesCount++;
		letterFromState.error = true;
	}

	//проверка: присутствует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как успешный
	if (!letterFromState.success && answer.includes(letter)) {
		letterFromState.success = true;
		let charsArray = answerState.split('');
		for (let i = 0; i < answerState.length; i++) {
			if (letter === answer[i]) {
				charsArray[i] = letter;
			}
		}
		answerState = charsArray.join('');
	}

	//перерисовка состояние игрока с текущим количеством жизней
	drawPerson(mistakesCount);

	//перерисовка состояние клавиатуры
	drawBoard(lettersState);

	//перерисовка состояние отгаданного слова
	drawAnswerState(answerState);

	//проверка, совпадает ли состояние отгаданного слова с ответом игры
	if (answer == answerState) {
		winGame();
	}
}
