const step = 20;
const gravity = 0.85;
const jumpPower = 12;
const runSpeed = 8;

let timer = 0;
let height = 0;
let push = 0;
let jumping = false;
let blockLeft = 0;
let blockFly = false;
let score = 0;
let playing = false;

$(function () {
    $("#switch").on("click", changeStyle);
    $("#field").on("click", action);

    $(document).on("keydown", function (event) {
        if (event.keyCode == 32) {
            event.preventDefault();
            action();
        }
    });
});

function changeStyle() {
    if ($("body").hasClass("pink")) {
        stopGame();
        $("body").removeClass("pink");
        swapImages("img/pink/", "img/");
        $("#switch").html("&#9728;");
    }
    else {
        $("body").addClass("pink");
        swapImages("img/", "img/pink/");
        $("#switch").html("&#9790;");
    }
}

function swapImages(from, to) {
    $(".work-image").each(function () {
        let address = $(this).attr("src");
        $(this).attr("src", address.replace(from, to));
    });
}

function action() {
    if ($("body").hasClass("pink") == false) {
        return;
    }

    if (playing == false) {
        startGame();
    }
    else if (jumping == false) {
        jumping = true;
        push = jumpPower;
    }
}

function startGame() {
    score = 0;
    height = 0;
    push = 0;
    jumping = false;
    playing = true;

    $("#score").text(score);
    $("#message").text("");
    $("#hero").css("bottom", "0px");

    newBlock();
    timer = setInterval(moveAll, step);
}

function newBlock() {
    blockLeft = $("#field").width();

    if (Math.floor(Math.random() * 2) == 0) {
        blockFly = false;
        $("#block").attr("src", "img/bow.png");
        $("#block").removeClass("fly");
    }
    else {
        blockFly = true;
        $("#block").attr("src", "img/heart.png");
        $("#block").addClass("fly");
    }

    $("#block").css("left", blockLeft + "px");
}

function moveAll() {
    if (jumping) {
        push = push - gravity;
        height = height + push;

        if (height <= 0) {
            height = 0;
            jumping = false;
        }

        $("#hero").css("bottom", height + "px");
    }

    blockLeft = blockLeft - runSpeed;

    if (blockLeft < -80) {
        score = score + 1;
        $("#score").text(score);
        newBlock();
    }
    else {
        $("#block").css("left", blockLeft + "px");
    }

    if (crash()) {
        stopGame();
        $("#message").text("Гру завершено. Рахунок: " + score + ". Пробіл або клік, щоб почати знову");
    }
}

function crash() {
    if (blockLeft + 32 < 52 || blockLeft > 116) {
        return false;
    }

    if (blockFly) {
        return height > 10;
    }

    return height < 41;
}

function stopGame() {
    clearInterval(timer);
    playing = false;
}
