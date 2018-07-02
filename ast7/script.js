var $body = document.getElementsByTagName('body')[0];

/**
 * constructor function for controlling the whole game
 * @param {*} props 
 */
function MainWrapper(props) {
    this.width = props.width;
    this.height = props.height;
    this.$parent = props.$parent;
    this.$mainWrapper = document.createElement("div");
    // array for storing the necessary screen for game
    this.screens = {};

    var self = this;

    // function for initializing the window size of game play
    this.init = function(){
        self.$mainWrapper.className = "main-wrapper";
        self.$mainWrapper.style.width = self.width + 'px';
        self.$mainWrapper.style.height = self.height + 'px';
        self.$parent.appendChild(self.$mainWrapper);
    }

    // function to add the screens required for the game
    this.populateScreen = function(key, screen) {
        self.screens[key] = screen;

    }
}

/**
 * constructor function for controlling the homescreen of the game
 * @param {*} props 
 */
function HomeScreen(props) {
    this.parent = props.parent;
    this.$homeScreen = document.createElement('div');
    this.$button = null;
    this.components = {};
    var self = this;

    // functions for adding the components of homescreen
    this.init = function() {
        self.$homeScreen.className = "home-screen";

        // text for title of the game
        var text = document.createElement('h1');
        text.innerHTML = "Space Fighter";
        self.$homeScreen.appendChild(text);

        self.parent.populateScreen("homeScreen", self);

        self.parent.$mainWrapper.append(self.$homeScreen);
    }

    // function for adding the necessary components to homescreen
    this.populateComponents = function(key, value) {
        self.components.key = value;
    }

    // function for showing the homescreen
    this.showHomeScreen = function() {
        self.$homeScreen.style.display = "block";
    }

    // function for hiding the homescreen
    this.hideHomeScreen = function() {
        self.$homeScreen.style.display = "none";
    }
}

/**
 * constructor function for creating the start button of HomeScreen
 * @param {*} props 
 */
function StartButton(props) {
    this.parent = props.parent;
    this.$startButton = document.createElement("button");
    
    var self = this;

    this.init = function() {
        self.$startButton.className = "start-button";
        self.$startButton.innerHTML = "Start";
        self.parent.$homeScreen.appendChild(self.$startButton);
        self.parent.populateComponents("startButton", self);
    }

    // **********************************************
    // self.$startButton.onclick = function() {
    //     self.parent.hideHomeScreen();
    //     self.parent.parent.screens.gameScreen.showGameScreen(); 
    // }
    // **********************************************
}

/**
 * consturctor function for handling the events on play mode
 * @param {*} props 
 */
function GameScreen(props) {
    this.parent = props.parent;
    this.components = {};
    this.$gameScreen = document.createElement('div');
    this.$score = document.createElement('h1');
    this.components = {};
    this.enemies = [];
    this.bullets = [];
    this.score = 0;

    var self = this;

    this.init = function() {
        self.$gameScreen.className = "game-screen";

        self.parent.populateScreen("gameScreen", self);
        self.parent.$mainWrapper.appendChild(self.$gameScreen);
        self.$score.className = "score";
        self.$score.innerHTML = "Score: " + self.score;
        self.$gameScreen.appendChild(self.$score);
    }

    this.pushComponent = function(key, value) {
        self.components[key] = value;
    }

    this.pushEnemy = function(enemy) {
        self.enemies.push(enemy);
    }

    this.pushBullet = function(bullet) {
        self.bullets.push(bullet);
    }

    this.showGameScreen = function() {
        self.$gameScreen.style.display = "block";
    }

    this.hideGameScreen = function() {
        self.$gameScreen.style.display = "none";
    }

    this.addScore = function() {
        self.score += 10;
        self.$score.innerHTML = "Score: " + self.score;
    }

    this.generateEnemies = function() {
        var enemy = new Enemy({
            parent: self,
        });
        enemy.init();
    }

    this.detectCollisionBetweenPlayerAndEnemy = function() {
        if (self.enemies.length > 1) {
            if ((self.enemies[0].x == self.components.player.x && (self.enemies[0].y + 100) >= self.components.player.y) || (self.enemies[1].x == self.components.player.x && (self.enemies[1].y + 100) >= self.components.player.y)){
                // console.log("collision Detected");

                // gameover
                // console.log(self.enemies[0].x == self.components.player.x);
                return true;
            }
        }
        return false;
    }

    this.detectCollisionBetweenEnemyAndBullet = function() {
        for (var i = 0; i < self.enemies.length; i++) {
            for (var j = 0; j < self.bullets.length; j++) {
                if (self.enemies[i].x < self.bullets[j].x && (self.enemies[i].x + 100) > (self.bullets[j].x + 10) && self.bullets[j].y < (self.enemies[i].y + 100)) {
                    // console.log("collision with bullet");
                    // // destroy bullet and decrease the life of the enemy;

                    self.bullets[j].destroyBullet();
                    self.enemies[i].reduceHealth();
                }
            }
        }
    }

    document.onkeydown = function(e) {
        e = e || window.event;

        if (e.keyCode == '37') {
            self.components.player.setPlayerPosition('37');
        } else if (e.keyCode == '39') {
            self.components.player.setPlayerPosition('39');
        }

        if (e.keyCode == '32') {            
            var bullet = new Bullet({
                parent: self,
                x: self.components.player.x,
                y: self.components.player.y,
            });
            bullet.init();
        }
    }
}

/**
 * components of gamescreen
 * 1. scrolling background
 * 2. player
 * 3. enemy container
 * 4. enemy
 * 5. bullet
 * 6. scoreboard
 * 7. pause button
 */

 /**
  * Background scroll class: has own interval
  */
function ScrollingBackground(props) {
    this.parent = props.parent;
    this.marginTop = props.marginTop;
    this.scrollSpeed = props.scrollSpeed || 1;
    this.$backgroundImage = document.createElement("div");

    var self = this;

    this.init = function() {
        self.$backgroundImage.className = "scrolling-background";
        setMarginTop();

        self.parent.components[scrollingBackground] = self;
        self.parent.$gameScreen.appendChild(self.$backgroundImage);
    }

    var resetMargin = function() {
        if (self.marginTop >= -600){
            self.marginTop = -1200;
        }
    }

    var setMarginTop = function() {
        self.$backgroundImage.style.marginTop = self.marginTop + 'px';
    }

    this.updateMarginTop = function() {
        self.marginTop += self.scrollSpeed;
        resetMargin();
        setMarginTop();
    } 
}

function Player(props) {
    this.x = props.x;
    this.y = props.y;
    this.parent = props.parent;
    this.$player = document.createElement('div');

    var self = this;

    this.init = function() {
        self.$player.className = 'player';
        updatePlayerPosition();
        self.parent.pushComponent("player", self);
        self.parent.$gameScreen.appendChild(self.$player);
    }

    var updatePlayerPosition = function() {
        self.$player.style.left = self.x + 'px';
        self.$player.style.top = self.y + 'px';
    }

    this.setPlayerPosition = function(keyCode) {
        if (keyCode == '37') {
            if (self.x <= 0){
                self.x = 0;
            } else {
                self.x -= 150;
            }
        } else if (keyCode = '39') {
            if (self.x >= 300){
                self.x = 300;
            } else {
                self.x += 150;
            }
        }
        updatePlayerPosition();
    }
}

/**
 * Bullet class: has own interval class;
 * @param {*} props 
 */
function Bullet(props){
    this.parent = props.parent;
    this.x = props.x + 45;
    this.y = props.y;
    this.velocity = props.velocity || 1;
    this.$bullet = document.createElement('div');
    this.disabled = false;

    var self = this;

    this.init = function() {
        self.$bullet.className = "bullet";
        setBulletPosition();
        self.parent.bullets.push(self);
        self.parent.$gameScreen.appendChild(self.$bullet);
    }

    var setBulletPosition = function() {
        self.$bullet.style.left = self.x + "px";
        self.$bullet.style.top = self.y + "px";
    }

    this.updatePosition = function() {
        this.y -= self.velocity;
        setBulletPosition();
        if (self.y < -15){
            self.destroyBullet();
        }
    }

    this.destroyBullet = function() {
        var index = self.parent.bullets.indexOf(self);
        self.$bullet.remove();
        self.parent.bullets.splice(index, 1);
    }
}

function Enemy(props) {
    this.parent = props.parent;
    this.health = 100;
    this.x = [0, 150, 300][Math.floor(Math.random() * 3)];
    this.y = -100;
    this.velocity = props.velocity || 1;
    this.$enemy = document.createElement('div');

    var self = this;

    this.init = function() {
        self.$enemy.className = "enemy";
        self.$enemy.style.top = self.y + 'px';
        self.$enemy.style.left = self.x + 'px';
        self.parent.enemies.push(self);
        self.parent.$gameScreen.appendChild(self.$enemy);
    }

    var destroyEnemy = function() {
        var index = self.parent.enemies.indexOf(self);
        self.$enemy.remove();
        self.parent.enemies.splice(index, 1);
        self.parent.addScore();
    }

    this.reduceHealth = function() {
        self.health -= 20;
        if (self.health === 0) {
            destroyEnemy();
        }
    }

    this.changePosition = function() {
        self.y += self.velocity;
        self.$enemy.style.top = self.y + 'px';

        if (self.y > 700){
            destroyEnemy();
        }
    }
}

/**
 * consturctor function for controlling the gameover screen
 * @param {*} props 
 */
function GameOverScreen(props) {
    this.parent = props.parent;
    this.$gameOverScreen = document.createElement('div');

    var self = this;

    this.init = function() {
        self.$gameOverScreen.className = 'gameover-screen';

        var gameOverText = document.createElement('h1');
        gameOverText.innerHTML ="GAME OVER";
        self.$gameOverScreen.appendChild(gameOverText);

        self.parent.$gameScreen.appendChild(self.$gameOverScreen);

    }
    
    this.showGameOverScreen = function() {
        self.$gameOverScreen.style.display = 'block';
    }

    this.hideGameOverScreen = function() {
        self.$gameOverScreen.style.dispay = 'none';
    }
}

/**
 * This class will be used for actual game play,
 * main loop of this game is controlled by this class
 * @param {*} props 
 */
function GameController(props){
    // all necessary components of the game will be here
    this.mainWrapper = props.mainWrapper;
    this.homeScreen = props.homeScreen;
    this.gameScreen = props.gameScreen;
    this.gameOverScreen = props.gameOverScreen;

    // homeScreen components
    this.startButton = props.startButton;

    // gameScreen components
    this.player = props.player;
    this.enemy = props.enemy;
    this.scrollingBackground = props.scrollingBackground;

    this.gamePaused = true;
    this.gameOver = false;

    var self = this;

    this.initHomeScreen = function() {
        self.mainWrapper.init();

        self.homeScreen.init();
        self.startButton.init();

        self.gameOverScreen.init();
        // self.gameOverScreen.init()
    }

    self.startButton.$startButton.onclick = function() {
        self.homeScreen.hideHomeScreen();
        initGameScreen();
        self.gameScreen.showGameScreen();
        startGame();
    }

    var initGameScreen = function() {
        self.gameScreen.init();
        self.scrollingBackground.init();
        self.player.init();
        self.enemy.init();
    }

    var initGameOverScreen = function() {
        self.gameScreen.showGameOverScreen();
    }

    // this.id = null;

    var startGame = function() {
        var id = setInterval(function() {
            self.scrollingBackground.updateMarginTop();
            if (self.gameScreen.bullets.length > 0) {
                self.gameScreen.bullets.forEach(function(bullet) {
                    bullet.updatePosition();
                });
            }

            if (self.gameScreen.enemies.length > 0) {
                self.gameScreen.enemies.forEach(function(enemy) {
                    enemy.changePosition();
                });
            }

            if (self.gameScreen.enemies[self.gameScreen.enemies.length - 1].y > 10) {
                self.gameScreen.generateEnemies();
            }

            var gameOver = self.gameScreen.detectCollisionBetweenPlayerAndEnemy();
            self.gameScreen.detectCollisionBetweenEnemyAndBullet();

            if (gameOver) {
                clearInterval(id);
                // self.gameScreen.hideGameScreen();
                self.gameOverScreen.showGameOverScreen();
            }
        }, 10);
    }
}

// Create a instance of MainWrapper
var mainWrapper = new MainWrapper({
    width: 400,
    height: 600,
    $parent: $body,
});

// Create a instance of HomeScreen
var homeScreen = new HomeScreen({
    parent: mainWrapper,
});

// Create a instance of GameScreen
var gameScreen = new GameScreen({
    parent: mainWrapper,
});

// Create a instance of ScrollingBackground
var scrollingBackground = new ScrollingBackground({
    parent: gameScreen,
    marginTop: -1200,
});

// create a instance of Player
var player = new Player({
    parent: gameScreen,
    x: 150,
    y: 500,
});

// create a instance of Enemy to start with
// this will be created dynamically in the actual game;
var enemy = new Enemy({
    parent: gameScreen,
});

// Create an instance of StartButton to start a game
var startButton = new StartButton({
    parent: homeScreen,
});

var gameOverScreen = new GameOverScreen({
    parent: gameScreen,
});

var gameController = new GameController({
    mainWrapper: mainWrapper,
    startButton: startButton,
    homeScreen: homeScreen,
    gameScreen: gameScreen,
    gameOverScreen: gameOverScreen,
    player: player,
    enemy: enemy,
    scrollingBackground: scrollingBackground,
});

gameController.initHomeScreen();