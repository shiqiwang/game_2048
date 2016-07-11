'use strict';

window.addEventListener("load", function () {
    setRandomNumAndPos();
    arrayToDisplay(table_2048);
});

document.addEventListener("keydown", function (event) {
    console.log(event.keyCode);
    event.preventDefault();
    if (event.keyCode == 37) {
        arrayToDisplay(moveLeft());
    } else if (event.keyCode == 38) {
        arrayToDisplay(moveUp());
    } else if (event.keyCode == 39) {
        arrayToDisplay(moveRight());
    } else if (event.keyCode == 40) {
        arrayToDisplay(moveDown());
    }
    if (isGameOver()) {
        alert("game over!");
    }
});

let reset = document.getElementById("newGameBtn");
reset.addEventListener("click", newGame);

let td = document.getElementsByClassName("td");
let tdLen = td.length;
let scoreDisplay = document.getElementById("score");
let table_2048 = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];//init the 2048 table
//init the score
let score = 0;

//init the table by clicking the new game button
function newGame() {
    score = 0;
    table_2048 = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
    ];
    setRandomNumAndPos();
    arrayToDisplay(table_2048);
}
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
    switch (dataNum) {
        case 0:
            td.style.backgroundColor = "rgb(205, 192, 180)";
            break;
        case 2:
            td.style.backgroundColor = "rgb(238, 228, 218)";
            td.style.color = "#776e65";
            td.style.fontSize = "40px";
            break;
        case 4:
            td.style.backgroundColor = "rgb(237, 224, 200)";
            td.style.color = "#776e65";
            td.style.fontSize = "40px";
            break;
        case 8:
            td.style.backgroundColor = "rgb(242, 177, 121)";
            td.style.color = "#fff";
            td.style.fontSize = "40px";
            break;
        case 16:
            td.style.backgroundColor = "rgb(245, 149, 99)";
            td.style.color = "#fff";
            td.style.fontSize = "40px";
            break;
        case 32:
            td.style.backgroundColor = "rgb(246, 124, 95)";
            td.style.color = "#fff";
            td.style.fontSize = "40px";
            break;
        case 64:
            td.style.backgroundColor = "rgb(246, 94, 59)";
            td.style.color = "#fff";
            td.style.fontSize = "40px";
            break;
        case 128:
            td.style.backgroundColor = "rgb(237, 207, 114)";
            td.style.color = "#fff";
            td.style.fontSize = "40px";
            break;
        case 256:
            td.style.backgroundColor = "rgb(237, 204, 97)";
            td.style.color = "#fff";
            break;
        case 512:
            td.style.backgroundColor = "rgb(237, 200, 80)";
            td.style.color = "#fff";
            td.style.fontSize = "40px";
            break;
        case 1024:
            td.style.backgroundColor = "rgb(237, 197, 63)";
            td.style.color = "#fff";
            td.style.fontSize = "28px";
            break;
        case 2048:
            td.style.backgroundColor = "rgb(237, 194, 46)";
            td.style.color = "#fff";
            td.style.fontSize = "28px";
            break;
        case 4096:
            td.style.backgroundColor = "rgb(255, 61, 61)";
            td.style.color = "#fff";
            td.style.fontSize = "28px";
            break;
        default:
            td.style.backgroundColor = "rgb(255, 29, 30)";
            td.style.color = "#fff";
            td.style.fontSize = "28px";
    }
}

// return table_2048
function moveLeft() {
    let copyTable_2048 = table_2048.slice();
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
                score = score + current * 2;
                next = 0;
            } else {
                results.push(current);
            }
        }
        for (let k = i; k < i + 4; k++) {
            table_2048[k] = results[k - i] || 0;
        }
    }
    if (table_2048.toString() != copyTable_2048.toString()) {
        setRandomNumAndPos();
    }
    return table_2048;
}

function moveRight() {
    let copyTable_2048 = table_2048.slice();
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
                score = score + current * 2;
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
    if (table_2048.toString() != copyTable_2048.toString()) {
        setRandomNumAndPos();
    }
    return table_2048;
}

function moveUp() {
    let copyTable_2048 = table_2048.slice();
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
                score = score + current * 2;
                next = 0;
            } else {
                results.push(current);
            }
        }
        for (let k = i; k < (i + 3 * 4 + 1) ; k += 4) {
            table_2048[k] = results[(k - i) / 4] || 0;
        }
    }
    if (table_2048.toString() != copyTable_2048.toString()) {
        setRandomNumAndPos();
    }
    return table_2048;
}

function moveDown() {
    let copyTable_2048 = table_2048.slice();
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
                score = score + current * 2;
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
    if (table_2048.toString() != copyTable_2048.toString()) {
        setRandomNumAndPos();
    }
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
    scoreDisplay.innerHTML = score;
}
//return true
function isGameOver() {
    // if there is at least one zero, it won't end
    for (let i = 0; i < table_2048.length; i++) {
        if (table_2048[i] == 0) {
            return false;
        }
    }
    //compare the number to it's next one 
    for (let i = 0; i < 16; i += 4) {
        for (let j = i; j < i + 3; j++) {
            if (table_2048[j] == table_2048[j + 1]) {
                return false;
            }
        }
    }
    //compare the number to which is below it
    for (let i = 0; i < 12; i += 4) {
        for (let j = i; j < i + 4; j++) {
            if (table_2048[j] == table_2048[j + 4]) {
                return false;
            }
        }
    }
    return true;
}