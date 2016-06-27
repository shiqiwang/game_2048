var table_2048 = new Array(16);

function setRandomNumAndPos() {
    var num;
    var pos = Math.floor(Math.random() * 16);
    var condition = Math.floor(Math.random() * 2);
    if (condition) {
        num = 2;
    } else {
        num = 1;
    }
    return {
        number: num,
        postion: pos
    };
}

function setTdColor() {
    var td = document.getElementsByTagName("td");
    var len = td.length;
    for (var i = 0; i < len; i++) {
        var dataNum = td[i].getAttribute("data-number");

    }
}