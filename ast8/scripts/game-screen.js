class GameScreen {
    constructor(props) {
        this.$element = props.$element;
        this.$score = this.$element.children[0];
        this.score = 0;
        this.$score.innerHTML = "Score: " + this.score;
    }

    updateScore() {
        this.score += 1;
        this.$score.innerHTML = "Score: " + this.score;
    }

    showGameScreen() {
        this.$element.style.display = 'block';
    }

    hideGameScreen() {
        thi.$element.style.display = 'none';
    }
}