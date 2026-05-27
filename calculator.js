// 1. 화면(디스플레이)과 버튼들을 JavaScript로 가져오기
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const onOffButton = document.querySelector('.on-off');

// 2. 계산기가 기억해야 할 변수들 (상태 설정)
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let isPowerOn = true;          // 계산기 전원 (기본 ON)

// 3. 화면 업데이트 함수
function updateDisplay() {
    if (!isPowerOn) {
        display.value = '';
        return;
    }
    display.value = displayValue;
}

// 4. 숫자 및 소수점 입력 함수
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        if (digit === '.') {
            if (!displayValue.includes('.')) displayValue += '.';
            return;
        }
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// 5. 연산자 처리 함수
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// 6. 사칙연산 계산 함수
function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') {
        if (second === 0) return 'Error';
        return first / second;
    }
    return second;
}

// 7. 초기화(C) 함수
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

// 8. 전원 ON/OFF 함수
function togglePower() {
    isPowerOn = !isPowerOn;
    if (isPowerOn) {
        resetCalculator();
    } else {
        displayValue = '';
    }
    updateDisplay();
}

// 9. 버튼 클릭 이벤트 리스너 (버튼이 눌렸을 때 실행되는 곳)
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // ON/OFF 버튼은 언제나 작동
        if (button.classList.contains('on-off')) {
            togglePower();
            return;
        }

        // 전원이 꺼져있으면 다른 버튼은 무시
        if (!isPowerOn) return;

        // C(초기화) 버튼
        if (button.classList.contains('clear')) {
            resetCalculator();
            updateDisplay();
            return;
        }

        // 연산자 버튼
        if (button.classList.contains('operator')) {
            handleOperator(buttonText);
            updateDisplay();
            return;
        }

        // Enter(결과) 버튼
        if (button.classList.contains('enter')) {
            if (operator === null) return;
            const inputValue = parseFloat(displayValue);
            const result = calculate(firstOperand, inputValue, operator);

            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
            return;
        }

        // 숫자 버튼
        inputDigit(buttonText);
        updateDisplay();
    });
});

// 시작할 때 화면에 0 띄우기
updateDisplay();