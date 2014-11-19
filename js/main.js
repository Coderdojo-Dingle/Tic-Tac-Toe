/*
by AdamByrne for Tic-Tac-Toe
*/
function checkWin(e) {
    return checkRows(e) || checkCols(e) || checkDiagonals(e)
}

function checkRows(e) {
    return checkRow(1, e) || checkRow(2, e) || checkRow(3, e)
}

function checkRow(e, t) {
    return checkField(e, 1, t) && checkField(e, 2, t) && checkField(e, 3, t)
}

function checkCols(e) {
    return checkCol(1, e) || checkCol(2, e) || checkCol(3, e)
}

function checkCol(e, t) {
    return checkField(1, e, t) && checkField(2, e, t) && checkField(3, e, t)
}

function checkDiagonals(e) {
    return checkField(1, 1, e) && checkField(2, 2, e) && checkField(3, 3, e) || checkField(1, 3, e) && checkField(2, 2, e) && checkField(3, 1, e)
}

function checkDraw() {
    return !(checkField(1, 1, noTokenName) || checkField(1, 2, noTokenName) || checkField(1, 3, noTokenName) || checkField(2, 1, noTokenName) || checkField(2, 2, noTokenName) || checkField(2, 3, noTokenName) || checkField(3, 1, noTokenName) || checkField(3, 2, noTokenName) || checkField(3, 3, noTokenName))
}

function checkField(e, t, n) {
    return $("canvas#f" + e + t).attr(tokenAttributeName) == n
}

function drawCircle(e) {
    var t = document.getElementById(e);
    var n = t.getContext("2d");
    var r = t.width / 2;
    var i = t.height / 2;
    var s = .5 * t.width / 2;
    var o = .75 * t.width / 2;
    n.beginPath();
    n.arc(r, i, o, 0, 2 * Math.PI, false);
    n.arc(r, i, s, 0, 2 * Math.PI, true);
    n.fillStyle = circleColor;
    n.fill()
}

function drawCross(e) {
    var t = document.getElementById(e);
    var n = t.getContext("2d");
    var r = t.width / 2;
    var i = t.height / 2;
    var s = .2 * t.width / 2;
    var o = .4 * t.width / 2;
    var u = .75 * t.width / 2;
    var a = .75 * t.width / 2;
    var f = .75 * t.width / 2;
    n.fillStyle = crossColor;
    n.beginPath();
    n.moveTo(r - s, i);
    n.lineTo(r - a, i - f);
    n.lineTo(r - o, i - u);
    n.lineTo(r, i - s);
    n.lineTo(r + o, i - u);
    n.lineTo(r + a, i - f);
    n.lineTo(r + s, i);
    n.lineTo(r + a, i + f);
    n.lineTo(r + o, i + u);
    n.lineTo(r, i + s);
    n.lineTo(r - o, i + u);
    n.lineTo(r - a, i + f);
    n.closePath();
    n.fill()
}

function drawResetCanvas() {
    var e = document.getElementById("reset");
    var t = e.getContext("2d");
    t.fillStyle = fontColor;
    t.font = font;
    t.fillText(resetText, 55, 35)
}

var tokenAttributeName = "token";
var idAttributeName = "id";
var circleTokenName = "Circles";
var crossTokenName = "Crosses";
var noTokenName = "None";
var circleColor = "#3498db";
var crossColor = "#2ecc71";
var fontColor = "#d35400";
var font = "bold 30px Courier";
var resetText = "Reset";
var hoverOnOpacity = 1;
var hoverOffOpacity = .75;
var highlightTime = 350;
var turn = circleTokenName;
var won = false;

$(document).ready(function() {
    drawResetCanvas();
    $("canvas#reset").click(function(e) {
        location.reload()
    });
    $("canvas").hover(function(e) {
        var t = $(this);
        t.animate({
            opacity: hoverOnOpacity
        }, highlightTime)
    }, function(e) {
        var t = $(this);
        t.animate({
            opacity: hoverOffOpacity
        }, highlightTime)
    });
    $("canvas.field").click(function(e) {
        var t = $(this);
        var n = t.attr(idAttributeName);
        if (t.attr(tokenAttributeName) != noTokenName || won) {
            return
        }
        if (turn == circleTokenName) {
            drawCircle(n);
            t.attr(tokenAttributeName, circleTokenName)
        } else {
            drawCross(n);
            t.attr(tokenAttributeName, crossTokenName)
        }
        if (checkWin(turn)) {
            var input = turn + "Won!";
            $("body").append("<audio autoplay><source src=http://tts-api.com/tts.mp3?q=" + input + " type=audio/mpeg></audio><p>");
            $(document).scrollTop($(document).height());
            won = true
        } else if (checkDraw()) {
            $("body").append("<audio autoplay><source src=http://tts-api.com/tts.mp3?q=" + "It's%20a%20draw" + " type=audio/mpeg></audio>");
            $(document).scrollTop($(document).height());
        }
        if (turn == circleTokenName) turn = crossTokenName;
        else turn = circleTokenName
    })
});