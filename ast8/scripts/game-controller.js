class GameController {
    constructor(props) {
        this.startGameLoop = false;
        this.gamePaused = true;
        this.walls = [];
        this.wallSpace = 125;
        this.scoreUpdated = false;
        this.init();  
    }

    init() {
        this.homeScreen = new HomeScreen({
            $element: this.getHomeScreen()
        });

        this.gameScreen = new GameScreen({
            $element: this.getGameScreen()
        });

        this.gameOverScreen = new GameOverScreen({
            $element: this.getGameOverScreen()
        });

        this.bird = new Bird({
            x: 20,
            y: 250,
            height: 30,
            width: 30,
            $element: this.getBorderBox(),
            $bird: this.getBird()
        });

        this.getResetButton().onclick = () => {
            this.resetGame();
        }

        

        this.getStartBtn().onclick = () => {
            this.startGame();
        }

        this.startHomeScreen();

        window.onkeydown = (e) => {
            let key = e.keyCode ? e.keyCode : e.which;
            console.log(e);

            if (key === 32 && !this.gamePaused) {
                this.bird.setUpwardAcceleration();
            }

            if (key === 27 && !this.gamePaused) {
                this.pauseGame();
            }

            if (key === 27 && this.gamePaused) {
                this.resumeGame();
            }
        }
    }

    startHomeScreen() {
        this.homeScreen.showHomeScreen();
        this.gameOverScreen.hideGameOverScreen();
        this.gameOverScreen.hideGameOverScreen();
    }

    startGame() {
        this.homeScreen.hideHomeScreen();
        this.gameScreen.showGameScreen();
        this.bird.y = 250;
        this.bird.yVelocity = 0;

        this.gamePaused = false;
        this.intervalManager(true);
    }

    intervalManager(flag) {
        if (flag) {
            let id = setInterval(() => {
                if (!this.gamePaused) {
                    this.bird.updateBirdPosition();
    
                    if (this.walls.length === 0 || this.walls[this.walls.length - 1].x < 600) {
                        this.generateObstacles();
                    }
    
                    this.walls.map((wall) => {
                        wall.updateWallPosition();
                        wall.renderWall();
    
                        if (wall.x < -50) {
                            wall.destroyWall();
                            this.walls.splice(this.walls.indexOf(wall), 1);
                            this.scoreUpdated = false;
                        }
                    });
        
                    if (this.bird.checkCollision(this.walls)){
                        this.gamePaused = true;
                        // case of game over
                        this.gameOverScreen.showGameOverScreen();
                        // console.log(this.gameOverScreen)
                        // console.log(this.gameScreen);
                    }

                    if (this.walls[0].x + this.walls[0].width < this.bird.x && this.walls[1].x + this.walls[1].width < this.bird.x && !this.scoreUpdated && !this.scoreUpdated ) {
                        this.gameScreen.updateScore();
                        this.scoreUpdated = !this.scoreUpdated;
                    }
                }
            }, 10);
        } else {
            clearInterval(id);
        }
    }

    generateObstacles() {
        let upperWallHeight = Math.floor(Math.random() * 300) + 100;
        let lowerWallHeight = 600 - upperWallHeight - this.wallSpace;
        let lowerWallY = upperWallHeight + this.wallSpace;
        let upperWall = new UpperWall({
            x: 1000,
            y: 0,
            velocity: 1,
            width: 50,
            height: upperWallHeight,
            $parent: this.getGameScreen()
        });

        upperWall.pushSelfToWalls(this.walls);

        let lowerWall = new LowerWall({
            x: 1000,
            y: lowerWallY,
            velocity: 1,
            width: 50,
            height: lowerWallHeight,
            $parent: this.getGameScreen()
        });

        lowerWall.pushSelfToWalls(this.walls);
    }

    resetGame() {
        this.gamePaused = true;
        this.walls.map((wall) => {
            wall.$element.remove();
        });
        this.walls = [];
        this.startHomeScreen();
    }

    // getters
    getMainWrapper() {
        return document.getElementById('main-wrapper');
    }

    getHomeScreen() {
        return document.getElementById('home-screen');
    }

    getStartBtn() {
        return document.getElementById('start-btn');
    }

    getGameScreen() {
        return document.getElementById('game-screen');
    }

    getGameOverScreen() {
        return document.getElementById('gameover-screen');
    }

    getBird() {
        return document.getElementsByClassName('bird')[0];
    }

    getBorderBox() {
        return document.getElementsByClassName('border-box')[0];
    }

    getResetButton() {
        return document.getElementById('reset-btn');
    }
}

gameController = new GameController();