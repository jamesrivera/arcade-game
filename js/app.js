// Constants
var xCon = 101,
    yCon = 85;
// Enemy class
var Enemy = function() {
    this.x = -xCon;
    yCalc();
    speedCalc();
    this.speed = speed;
    this.sprite = 'images/enemy.png';
};
// Update enemy position
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > xCon * 7) {
        this.x = -xCon;
        yCalc();
        this.y = y;
        speedCalc();
        this.speed = speed;
    }
    // Check for collisions with enemy
    if (Player.y === this.y && Player.x + 25 <= this.x && Player.x + 150 >= this.x) {
        lives--;
        if (lives < 1) {
            Enemy.prototype.render();
            lives = 3;
            score = 0;
            document.getElementById('playerScore').innerHTML = score;
            this.enemySpawn = 3;
        }
        document.getElementById('playerLives').innerHTML = lives;
        Player.reset();
    }
    // Reset and increment score if player reaches water
    if (Player.y < 0) {
        scoring();
        Player.reset();
    }
    // Reset start position if player moves out of bounds
    if (Player.y > (yCon * 4) - 25) {
        Player.reset();
    }
};
// Render enemy
Enemy.prototype.render = function() {
    if (lives === 0) {
        document.getElementById('playerLives').innerHTML = lives;
        ctx.drawImage(Resources.get('images/gameover.png'), 0, -80);
        ctx.font = '20px "Press Start 2P"';
        ctx.fillStyle = 'white';
        ctx.fillText("You got a score of " + score, 158, 290);
        if (score >= 50) {
            ctx.fillText("You are Victorious!", 182, 340);
            ctx.fillText("Refresh the screen to play again!", 26, 390);
        } else {
            ctx.fillText("Refresh the screen to play again!", 26, 390);
        }
    }
    ctx.drawImage(Resources.get(this.sprite), this.x - xCon, this.y);
};
// Player class
var Player = function() {
    this.sprite = 'images/char.png';
    this.x = xCon * 3;
    this.y = (yCon * 4) - 25;
    this.score = 0;
};
// Update player position
Player.prototype.update = function(dt) {
    x = this.x * dt;
    y = this.y * dt;
};
// Reset player position
Player.prototype.reset = function() {
    this.x = xCon * 3;
    this.y = (yCon * 4) - 25;
};
// Render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Handle keyboard events
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x > 0) {
                this.x -= xCon;
            }
            break;
        case 'up':
            if (this.y < yCon * 5) {
                this.y -= yCon;
            }
            break;
        case 'right':
            if (this.x < xCon * 6) {
                this.x += xCon;
            }
            break;
        case 'down':
            if (this.y > 0) {
                this.y += yCon;
            }
            break;
    }
};
// Gem class
var Gem = function() {
    this.gemImg = gemImages[Math.floor(Math.random() * 3)];
    this.x = gemPosX[Math.floor(Math.random() * 7)];
    yCalc();
    this.y = y;
};
// Update gem position and score
Gem.prototype.update = function() {
    if (Player.x === this.x && Player.y === this.y) {
        this.gemImg = gemImages[Math.floor(Math.random() * 3)];
        this.x = gemPosX[Math.floor(Math.random() * 7)];
        yCalc();
        this.y = y;
        scoring();
    }
};
// Render gems
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
};
// Instantiate objects
var Player = new Player();
var allEnemies = [];
var gemImages = ['images/gem.png', 'images/gem.png', 'images/gem.png'];
var gemPosX = [0, xCon, xCon * 2, xCon * 3, xCon * 4, xCon * 5, xCon * 6];
var enemySpawn = 3;
var gem = new Gem();
var score = 0;
var lives = 3;
// Spawn enemies
var enemy = function() {
    enemy = new Enemy();
    allEnemies.push(enemy);
};
enemy();
for (var i = 0; i < enemySpawn; i++) {
    allEnemies.push(new Enemy());
}
// Calculate y position for enemy
function yCalc() {
    var y = Math.random();
    if (y < 0.34) {
        this.y = yCon - 25;
    } else if (y >= 0.34 && y <= 0.66) {
        this.y = (yCon * 2) - 25;
    } else if (y > 0.66) {
        this.y = (yCon * 3) - 25;
    }
    return this.y;
}
// Base enemy speed on score
function speedCalc() {
    var speed = Math.floor(Math.round(Math.random() * 10) * 15) + 50;
    this.speed = speed;
    return this.speed;
}
// Increment score and spawn new enemy 
function scoring() {
    score++;
    document.getElementById('playerScore').innerHTML = score;
    if (score > 1 && score % 5 === 0) {
        enemySpawn += 1;
        allEnemies.push(new Enemy());
    }
    return score;
}
// Listen for key strokes
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    Player.handleInput(allowedKeys[e.keyCode]);
});
// Prevent page scroll
window.addEventListener("keydown", function(e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
// Adjust HTML
document.getElementById('playerLives').innerHTML = lives;
document.getElementById('playerScore').innerHTML = score;