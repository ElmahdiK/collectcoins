/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let _main;
let _player1;
let _pos_1 = 1;

var myVar, myVarCoin;
let _time = 60; // 1min => 60 
let _timeCoin = 120;
let _score, _scoreBest;
_score = _scoreBest = 0;

let _operations = ['+', '-', '*', '/'];
let _coins = [`10`, `20`, `50`];
let _objects = [`☠`]; // † [`skull`, `timer`, `skate`];
var _nbPos;

let gameHEIGHT, playerTOP;

window.onload = _ => {
    _main = $(`main`);
    _player1 = $(`#player1`);

    _nbPos = (_main.querySelectorAll(`aside`).length);

    gameHEIGHT = $(`body`).getBoundingClientRect().height;
    playerTOP = _player1.getBoundingClientRect().top;


    $(`#bt_play`).onclick = () => {
        myVar = setInterval(myTimer, 1000);
        myVarCoin = setInterval(myTimerCoin, 500);

        $(`#div_title`).classList.add(`hidden`);
        $(`#div_infos`).classList.remove(`hidden`);
    }


    $(`#bt_restart`).onclick = () => {
        initGAME();

        $(`body`).classList.remove(`game_over`);
        $(`#div_infos`).classList.remove(`hidden`);
        $(`#div_menu`).classList.add(`hidden`);


        myVar = setInterval(myTimer, 1000);
        myVarCoin = setInterval(myTimerCoin, 500);
    }

    $(`body`).addEventListener(`keydown`, e => {
        switch (e.key) {
            case "ArrowLeft":
                moveTo(`L`);
                break;
            case "ArrowRight":
                moveTo(`R`);
                break;
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
        }
    })
}

const initGAME = _ => {
    // score
    _score = 0;
    $(`#sp_score`).innerText = _score;
    // time
    _time = 60;
    $(`#sp_time`).innerText = _time;

    let _tabCoins = _main.querySelectorAll(`.coin`);
    for (let i = 0; i < _tabCoins.length; i++) _tabCoins[i].remove();
}

const myTimerCoin = _ => {
    _timeCoin--;

    if ((_timeCoin % 5) == 0) addObject();
    else addCoin();

    if (_timeCoin <= 0) myStopFunction();

    let _tabCoins = _main.querySelectorAll(`.coin`);
    let _posCoin = 0;
    for (let i = 0; i < _tabCoins.length; i++) {
        _posCoin = _tabCoins[i].getBoundingClientRect().top;
        _posCoin += 100;
        _tabCoins[i].style.top = _posCoin + 'px';

        if (_posCoin >= playerTOP && _posCoin <= gameHEIGHT) {
            if (_tabCoins[i].dataset.pos == _player1.dataset.pos) {
                if (parseInt(_tabCoins[i].dataset.value) == 0) {
                    myStopFunction();
                } else {
                    _score += parseInt(_tabCoins[i].dataset.value);
                    $(`#sp_score`).innerText = _score;
                    _tabCoins[i].remove();
                }
            }
        }
        if (_posCoin > gameHEIGHT) _tabCoins[i].remove();
    }
}


const myTimer = _ => {
    _time--;

    if (_time <= 0) myStopFunction();
    $(`#sp_time`).innerText = _time;
}

const myStopFunction = _ => {
    clearInterval(myVar);
    myStopFunctionCoin();
}

const myStopFunctionCoin = _ => {
    clearInterval(myVarCoin);

    if (_scoreBest < _score) _scoreBest = _score;
    $(`#sp_end_best_score`).innerText = _scoreBest;
    $(`#sp_end_score`).innerText = _score;


    $(`body`).classList.add(`game_over`);
    $(`#div_infos`).classList.add(`hidden`);
    $(`#div_menu`).classList.remove(`hidden`);
}

const addCoin = _ => {
    let _value = getRandom(0, 100) + _operations[getRandom(0, _operations.length - 1)] + getRandom(0, 100);
    let _coin = `<div class='coin' data-pos="${getRandom(1, _nbPos)}" data-value="${eval(_value)}">${_value}</div>`;
    _main.insertAdjacentHTML(`beforeEnd`, _coin);
}

const addObject = _ => {
    let _coin = `<div class='coin object' data-pos="${getRandom(1, _nbPos)}" data-value="0">${_objects[getRandom(0, _objects.length - 1)]}</div>`;
    _main.insertAdjacentHTML(`beforeEnd`, _coin);
}

const moveTo = _direction => {
    switch (_direction) {
        case "L": {
            if (_pos_1 > 1) _pos_1--;
            _player1.dataset.pos = _pos_1;
        } break;
        case "R": {
            if (_pos_1 < _nbPos) _pos_1++;
            _player1.dataset.pos = _pos_1;

        } break;
    }
}

const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);