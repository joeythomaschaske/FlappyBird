/**
 * Created by josephthomaschaske on 3/1/16.
 */
function gameLoop()
{
    var canvas = document.getElementById('canvas');
    pipes = [];
    upArrow = false;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var flappy = new player();
    for(var i = 0; i < 3; ++i)
    {
        var p = new pipe();
        p.x = (1 + i) * 266;
        p.y = (Math.random() * 400) + 25;
        pipes.push(p);
    }
    interval = window.setInterval(function() { updateLogic(flappy) } , 20);
}

function updateLogic(player)
{
    //update game logic move player && move pipes
    updatePlayer(player);
    updatePipes();
    //render current state
    draw(player);
    checkCollisions(player);
}

function draw(player)
{
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image,400,player.y, 20, 20);
    for(var i = 0; i < pipes.length; ++i)
    {
        var pipe = pipes[i];
        context.fillRect(pipe.x,0,pipe.width,pipe.y);
        context.fillRect(pipe.x,pipe.y + 125,pipe.width,450 - (pipe.y + 125));
        //left, starting pixel, width, height
    }
}

function updatePlayer(player){
    if(upArrow)
    {
        player.y -= 5.56;
        player.gravity = .01;
    }
    else
    {
        player.gravity += .2;
        player.y += player.gravity;
    }

    if(player.y < 0){
        player.y = 0;
    }
    else if(player.y > 450){
        alert('You died');
        window.clearInterval(interval);
    }
}

function updatePipes()
{
    for(var i = 0; i < pipes.length; ++i)
    {
        var pipe = pipes[i];
        pipe.x -= 3;
        if(pipe.x <= 0)
        {
            pipe.y = (Math.random() * 400) + 25;
            pipe.x = 800;
        }
    }
}

function checkCollisions(player)
{
    for(var i = 0; i < pipes.length; ++i)
    {
       var pipe = pipes[i];
        if(pipe.x < 420 && pipe.x + pipe.width > 400)
        {
            if(player.y < pipe.y || player.y + 20 > pipe.y + 125)
            {
                alert('You died');
                window.clearInterval(interval);
            }
        }
    }
}
function player()
{
    this.y = 225;
    this.gravity = .01;
}

function pipe()
{
    this.x = 800;
    this.width = 50;
    this.y = 450;
}

window.onkeydown = function(e)
{
    if(e.keyCode == 38){
        upArrow = true;
        console.log('up is pressed');
    }
}

window.onkeyup = function(e)
{
    if(e.keyCode == 38){
        upArrow = false;
        console.log('up is not pressed');
    }
}

var pipes = [];
var upArrow = false;
var image = new Image;
var interval;
image.src = "flappy.png";