// Окно ввода
let out = document.querySelector('.inputVal');

let clear = document.querySelector('.clear');

// Математическое выражение
let val = ``;
// Хранит математическое выражение после нажатия на кнопку "равно"
let rvtVal = '';
// Число для проверки условия: макс 12 знаков до запятой и макс 8 знаков после запятой 
let numCheck = '';
//Переменные для буфера
let memorySave = '';
let memoryRead = '';

const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const memory = ['MC', 'MS', 'MR', 'M+', 'M-'];
const operation = ['/', '*', '-', '+', '(', ')'];

document.querySelector('.button_wrapper').onclick = (e) => {
    // out.textContent = '';
    let pushBtn = e.target.textContent;

    if (!e.target.classList.contains('calc_Btn')) return;
    if (e.target.classList.contains('all_clear')) { allClear() }
    if (e.target.classList.contains('rvt')) { returnVT(); }
    if (e.target.classList.contains('dot')) { addDot(); }
    if (e.target.classList.contains('clear')) { clearSimbol(); }
    if (e.target.classList.contains('addPlusMinus')) { addPlusMinus(); }
    if (e.target.classList.contains('arrow_minus')) { shift(); }
    if (e.target.classList.contains('ms')) { saveInMemory(); }
    if (e.target.classList.contains('mc')) { memorySave = ''; }
    if (e.target.classList.contains('mr')) { readMemory(); }
    if (e.target.classList.contains('mPlus')) { addToMemory(); }
    if (e.target.classList.contains('mMinus')) { deductToMemory(); }
    if (e.target.classList.contains('equal')) { equalCheck(); }

    if (number.includes(pushBtn)) { condit(pushBtn); }
    if (operation.includes(pushBtn)) {
        numCheck = '';
        val += pushBtn;
        out.textContent = val;
    }

}

function returnVT() {
    out.textContent = rvtVal;
    val = rvtVal;
}

function addDot() {
    numCheck += '.';
    val += `.`;
    out.textContent = val;
}

//Сохранение значения в переменную(буфер)
function saveInMemory() {
    memorySave = eval(val)
    console.log('Memory Save: ' + memorySave);
}

//Вывод на дисплей значения из буфера
function readMemory() {
    memoryRead = memorySave;
    val = memoryRead;
    out.textContent = memoryRead;
    console.log('Memory Read: ' + val);
}

//Значение прибавляется и сохраняется обратно в буфер
function addToMemory() {
    // memoryPlus = memorySave;
    memorySave = eval(val) + eval(memorySave);
    console.log('Add to memory: ' + memorySave);
}

//Вычитает значение в буфере из текущего значения на дисплее и сохраняется обратно в буфер
function deductToMemory() {
    memorySave = eval(memorySave) - eval(val);
    console.log('Deduct to memory: ' + memorySave);
}

//Удаление одного символа
function clearSimbol() {
    if (val == ``) {
        out.textContent = '0';
    } else {
        val = val.substring(0, val.length - 1);
        out.textContent = val;
    }
}

//Очистить окно ввода
function allClear() {
    out.textContent = '0';
    val = ``;
    numCheck = '';
}

//Вывод результата
function equalCheck() {
    if (val == ``) {
        out.textContent = '0';
    } else {
        rvtVal = val;
        out.textContent = eval(val);
        val = eval(val);
    }
}

// Функция проверяет число на выполнение условий
function condit(pushBtn) {
    numCheck += pushBtn;
    if (numCheck.indexOf('.') != -1) {
        if (numCheck.split('.')[0].length <= 12 || numCheck.split('.')[1].length <= 8) {
            val += pushBtn;
            out.textContent = val;
        } else {
            out.textContent = val;
        }
    } else {
        if (numCheck.split('.')[0].length <= 12) {
            val += pushBtn;
            out.textContent = val;
        } else {
            out.textContent = val;
        }
    }
}

//Добавляет минус/плюс
function addPlusMinus() {
    if (val == ``) {
        out.textContent = '0';
    } else {
        if (val.slice(0, 1) != '-') {
            let minus = '-';
            minus = minus.concat(val)
            val = minus;
            out.textContent = val;
        } else if (val.slice(0, 1) == '-') {
            val = val.substring(1);
            out.textContent = val;
        }
    }
}

document.addEventListener('keydown', function (event) {
    if (!isNaN(event.key) && event.code != 'Space') {
        condit(event.key);
    } else {
        console.log('operating')
        for (let i = 0; i < operation.length; i++) {
            if (event.key == operation[i]) {
                numCheck = '';
                val += event.key;
                out.textContent = val;
            }
        }
    }
    if (event.key == '=') {
        equalCheck();
    }
    if (event.key == '.') {
        addDot();
    }
});