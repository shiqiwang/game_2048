'use strict';

window.addEventListener("load", function () {
    setRandomNumAndPos();
    arrayToDisplay(table_2048);
});

document.addEventListener("keydown", function (event) {
    console.log(event.keyCode);
    if (event.keyCode == 37) {
        arrayToDisplay(moveLeft());
    } else if (event.keyCode == 38) {
        arrayToDisplay(moveUp());
    } else if (event.keyCode == 39) {
        arrayToDisplay(moveRight());
    } else if (event.keyCode == 40) {
        arrayToDisplay(moveDown());
    }
});

let td = document.getElementsByTagName("td");
let tdLen = td.length;
let table_2048 = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];//16

//void
//after some operation, a new number appear 
function setRandomNumAndPos() {
    let emptyTable2048CellArray = new Array();
    for (let j = 0; j < 16; j++) {
        if (table_2048[j] === 0) {
            emptyTable2048CellArray.push(j);
        }
    }
    let len = emptyTable2048CellArray.length;
    let num;
    let pos = Math.floor(Math.random() * len);
    let condition = Math.floor(Math.random() * 2);
    if (condition) {
        num = 4;
    } else {
        num = 2;
    }
    table_2048[emptyTable2048CellArray[pos]] = num;
}

// set every td's background color, color changes by number
function setTdColor(td) {
    let dataNum = Number(td.getAttribute("data-number"));
    if(dataNum != 0) {
        let colorDivisor = 220 - 10 * (Math.log2(dataNum) - 1);
        td.style.backgroundColor = "rgb(255," + colorDivisor + "," + colorDivisor + ")";
    }
}

// return table_2048
function moveLeft() {
    for (let i = 0; i < table_2048.length; i += 4) {
        let index = i;
        let current;
        let next;
        let results = [];
        function findNextNoneZero() {
            while (index < i + 4) {
                let value = table_2048[index];

                index++;

                if (value !== 0) {
                    return value;
                }
            }
            return 0;
        }
        while (next || index < i + 4) {
            current = next || findNextNoneZero();
            if (!current) {
                break;
            }
            next = findNextNoneZero();
            if (current === next) {
                results.push(current * 2);
                next = 0;
            } else {
                results.push(current);
            }
        }
        for (let k = i; k < i + 4; k++) {
            table_2048[k] = results[k - i] || 0;
        }
    }
    setRandomNumAndPos();
    return table_2048;
}

function moveRight() {
    for (let i = 0; i < table_2048.length; i += 4) {
        let index = i + 3;
        let current;
        let previous = 0;
        let results = [];
        function findpreviousnonezero() {
            while (index > i - 1) {
                let value = table_2048[index];
                index--;
                if (value !== 0) {
                    return value;
                }
            }
            return 0;
        }
        while (previous || index > i - 1) {
            current = previous || findpreviousnonezero();
            if (!current) {
                break;
            }
            previous = findpreviousnonezero();
            if (current == previous) {
                results.push(current * 2);
                previous = 0;
            } else {
                results.push(current);
            }
        }
        let temp = new Array(4);
        for (let k = 0; k < 4; k++) {
            temp[k] = results[k] || 0;
        }
        temp = temp.reverse();
        for (let j = i + 3; j > i - 1; j--) {
            table_2048[j] = temp[j - i];
        }
    }
    setRandomNumAndPos();
    return table_2048;
}

function moveUp() {
    for (let i = 0; i < 4; i++) {
        let current;
        let next;
        let results = [];
        let index = i;
        function findNextNoneZero() {
            while (index < (i + 13)) {
                let value = table_2048[index];
                index += 4;
                if (value !== 0) {
                    return value;
                }
            }
            return 0;
        }
        while (next || index < (i + 13)) {
            current = next || findNextNoneZero();
            if (!current) {
                break;
            }
            next = findNextNoneZero();
            if (current == next) {
                results.push(2 * current);
                next = 0;
            } else {
                results.push(current);
            }
        }
        for (let k = i; k < (i + 3 * 4 + 1) ; k += 4) {
            table_2048[k] = results[(k - i) / 4] || 0;
        }
    }
    setRandomNumAndPos();
    return table_2048;
}
function moveDown() {
    for (let i = 0; i < 4; i++) {
        let current;
        let previous;
        let results = [];
        let index = i + 12;
        function findPreviousNoneZero() {
            while (index > i - 1) {
                let value = table_2048[index];
                index -= 4;
                if (value !== 0) {
                    return value;
                }
            }
            return 0;
        }
        while (previous || index > i - 1) {
            current = previous || findPreviousNoneZero();
            if (!current) {
                break;
            }
            previous = findPreviousNoneZero();
            if (current == previous) {
                results.push(2 * current);
                previous = 0;
            } else {
                results.push(current);
            }
        }
        let temp = new Array(4);
        for (let k = 0; k < 4; k++) {
            temp[k] = results[k] || 0;
        }
        let u = 0;
        for (let j = i + 12; j > (i - 1); j -= 4) {
            table_2048[j] = temp[u];
            u++;
        }
    }
    setRandomNumAndPos();
    return table_2048;
}

// fill the table_2048 to single td
function arrayToDisplay(table_2048) {
    console.log(table_2048);
    for (let i = 0; i < tdLen; i++) {
        td[i].innerHTML = "";
        td[i].setAttribute("data-number", "0");
        td[i].style.backgroundColor = "rgb(255, 255, 255)";
    }
    for (let j = 0; j < tdLen; j++) {
        if (table_2048[j] !== 0) {
            td[j].innerHTML = table_2048[j];
            td[j].setAttribute("data-number", table_2048[j]);
            setTdColor(td[j]);
        } else {
            td[j].innerHTML = "";
            td[j].setAttribute("data-number", "0");
            setTdColor(td[j]);
        }
    }
}