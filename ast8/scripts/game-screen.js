class GameScreen {
    constructor(props) {
        this.$element = props.$element;
        this.score = 0;
    }

    updateScore() {
        this.score += 1;
    }

    showGameScreen() {
        this.$element.style.display = 'block';
    }

    hideGameScreen() {
        thi.$element.style.display = 'none';
    }
}