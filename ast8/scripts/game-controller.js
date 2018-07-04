// const $mainWrappper = document.getElementById('main-wrapper');
// const $homeScreen = document.getElementById('home-screen');
// const $startBtn = document.getElementById('start-btn');
// const $gameScreen = document.getElementById('game-screen');
// const $gameOverScreen = document.getElementById('gameover-screen');
// const $bird = document.getElementsByClassName('bird')[0];

// const WALL_SPACE = 125;

class GameController {
    constructor(props) {
        this.startGameLoop = false;
        this.walls = [];
        this.wallSpace = 125;
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

        this.startGame();

        window.onkeydown = (e) => {
            let key = e.keyCode ? e.keyCode : e.which;

            if (key === 32 && !this.gamePaused) {
                this.bird.setUpwardAcceleration();
            }
        }
    }

    startGame() {
        this.getStartBtn().onclick = () => {
            this.homeScreen.hideHomeScreen();
            this.gameScreen.showGameScreen();

            this.startGameLoop = true;
            this.gamePaused = false;
        }

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
                    }
                });


            }

            if (this.gamePaused) {
                clearInterval(id);
            }

            if (this.bird.checkCollision(this.walls)){
                this.gamePaused = true;
                console.log("hello");
            }

            // if (!this.startGameLoop){
            //     clearInterval(id);
            // }
        }, 10);
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

    pauseGame() {
        this.gamePaused = true;
    }

    resumeGame() {
        this.gamePaused = false;
    }

    restartGame() {

    }

    exitGame() {

    }

    // getters
    getMainWrapper() {
        return document.getElementById('main-wrapper');
    }

    getHomeScreen() {
        return document.getElementById('home-screen');
    }

    // const $startBtn = document.getElementById('start-btn');
    getStartBtn() {
        return document.getElementById('start-btn');
    }

    // const $gameScreen = document.getElementById('game-screen');
    getGameScreen() {
        return document.getElementById('game-screen');
    }

    // const $gameOverScreen = document.getElementById('gameover-screen');
    getGameOverScreen() {
        return document.getElementById('gameover-screen');
    }

    // const $bird = document.getElementsByClassName('bird')[0];
    getBird() {
        return document.getElementsByClassName('bird')[0];
    }

    getBorderBox() {
        return document.getElementsByClassName('border-box')[0];
    }
}

gameController = new GameController();