// analog clock................................................................................

'use strict';
var toggle = false;
var clock_format_12 = true;
var canvas = document.getElementById("canvas");
var alarm=false;
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

//Draw Clock
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

// Draw clock interface
function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

//Draw number on clock
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

//For Moving hand
function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

// For drawing Hand
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// For Switching from analog to digital clock
function Switch() {
    if (toggle == false) {
        toggle = true;
        document.getElementById('analog_clock').style.display = "none";
        document.getElementById('digital_clock').style.display = "block"
        document.getElementById('MyClockDisplay').style.display = "block"
    }
    else {
        toggle = false;
        document.getElementById('digital_clock').style.display = "none";
        document.getElementById('MyClockDisplay').style.display = "none";
        document.getElementById('analog_clock').style.display = "block"
    }
}
// Digital clock........................................................................
function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var time;
     console.log(h,m)
    if (clock_format_12 == true) {
        var session = "AM";
	if(h==12){
            session="PM"
        }

        if (h == 0) {
            h = 12;
        }
        
        if (h >12) {
            h = h - 12;
            session = "PM";
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        time = h + ":" + m + ":" + s + " " + session;
	console.log(session)
    } else {
        time = h + ":" + m + ":" + s;
    }
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

function ChangeFormat(){
    if(clock_format_12==true){
        clock_format_12=false;
    }
    else{
        clock_format_12=true;
    }
}

// set alarm..........................................................................................
function set_Alarm(){
    if(alarm==false){
        alarm=true
    document.getElementById('alarm').style.display='block';
    document.getElementById('digital_clock').style.display = "none";
    document.getElementById('MyClockDisplay').style.display = "none";
    document.getElementById('analog_clock').style.display = "none";
    }
    else{
        alarm=false;
        document.getElementById('alarm').style.display='none';
        document.getElementById('digital_clock').style.display = "none";
        document.getElementById('MyClockDisplay').style.display = "none";
        document.getElementById('analog_clock').style.display = "block";

        
    }

}
