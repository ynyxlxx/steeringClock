/// <reference path="lib/p5.global-mode.d.ts" />

"use strict";

var font;
var curTime;
var oldTime;
var isBurst = false;
var vehicles = [];
const myFrameRate = 30;
const clockPosX = screen.width / 2;
const clockPosY = screen.height / 2.2;
const rectPosX = 0;
const rectPosY1 = screen.height / 5 * 3;
const rectPosY2 = screen.height / 5 * 3.6;
const fontSize = 300;

function preload() {
    font = loadFont('Inconsolata-Bold.ttf');
}

function setup() {
    createCanvas(screen.width, screen.height);
    init();
    oldTime = getCurTimeString();
}

function draw() {
    frameRate(myFrameRate);

    background(205, 179, 128);
    noStroke();
    rect(rectPosX, rectPosY1, screen.width, rectPosY2 - rectPosY1);
    fill(3, 54, 73);
    rect(rectPosX, rectPosY2, screen.width, rectPosY2);
    fill(3, 101, 100);

    curTime = getCurTimeString();
    updateEveryMinute();
    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviour();
        v.update();
        v.show();
    }
}

function init() {
    let t = getCurTimeString();
    var points = font.textToPoints(t, clockPosX, clockPosY, fontSize);
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function updateEveryMinute() {
    if (curTime != oldTime) {

        // for (var i = 0; i < vehicle.length; i++){
        //     var v = vehicles[i];
        //     v.burst();
        // }

        curTime = getCurTimeString();
        var points = font.textToPoints(curTime, clockPosX, clockPosY, fontSize);
        vehicles = [];
        for (var i = 0; i < points.length; i++) {
            var pt = points[i];
            var vehicle = new Vehicle(pt.x, pt.y);
            vehicles.push(vehicle);
        }
        oldTime = curTime;
    }
}

function getCurTimeString() {
    let min = minute();
    let minString;
    if (min < 10) {
        minString = '0' + min.toString();
    }
    else {
        minString = min.toString();
    }

    let curTime = hour().toString() + ":" + minString;
    return curTime;
}