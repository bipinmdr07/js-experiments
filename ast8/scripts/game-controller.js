const $mainWrappper = document.getElementById('main-wrapper');
const $homeScreen = document.getElementById('home-screen');
const $startBtn = document.getElementById('start-btn');
const $gameScreen = document.getElementById('game-screen');
const $gameOverScreen = document.getElementById('gameover-screen');
const $bird = document.getElementsByClassName('bird')[0];

const WALL_SPACE = 125;

class GameController {
    constructor(props) {
        this.startGameLoop = false;
        this.walls = [];
        this.init();  
    }

    init() {
        this.homeScreen = new HomeScreen({
            $element: $homeScreen
        });

        this.gameScreen = new GameScreen({
            $element: $gameScreen
        });

        this.gameOverScreen = new GameOverScreen({
            $element: $gameOverScreen
        });

        this.bird = new Bird({
            x: 20,
            y: 250,
            $element: $bird
        });

        this.startGame();
    }

    startGame() {
        $startBtn.onclick = () => {
            this.homeScreen.hideHomeScreen();
            this.gameScreen.showGameScreen();

            this.startGameLoop = true;
        }

        let id = setInterval(() => {
            if (this.startGameLoop) {
                // console.log(this.walls);

                if (this.walls.length === 0 || this.walls[this.walls.length - 1].x < 600) {
                    this.generateObstacles();
                }

                let indices = [];

                this.walls.map((wall) => {
                    wall.updateWallPosition();
                    wall.renderWall();

                    if (wall.x < -50) {
                        indices.push(this.walls.indexOf(wall));
                        wall.destroyWall();
                        this.walls.splice(this.walls.indexOf(wall), 1);
                    }
                });
            }
        }, 10);
        // this.generateObstacles();

        // clearInterval(id);
    }

    generateObstacles() {
        let upperWallHeight = Math.floor(Math.random() * 300) + 100;
        let lowerWallHeight = 600 - upperWallHeight - WALL_SPACE;
        let lowerWallY = upperWallHeight + WALL_SPACE;
        let upperWall = new UpperWall({
            x: 1000,
            y: 0,
            velocity: 1,
            width: 50,
            height: upperWallHeight,
            $parent: $gameScreen 
        });

        console.log(this);
        upperWall.pushSelfToWalls(this.walls);

        let lowerWall = new LowerWall({
            x: 1000,
            y: lowerWallY,
            velocity: 1,
            width: 50,
            height: lowerWallHeight,
            $parent: $gameScreen
        });

        lowerWall.pushSelfToWalls(this.walls);
    }

    pauseGame() {

    }

    resumeGame() {

    }

    restartGame() {

    }

    exitGame() {

    }
}

gameController = new GameController();