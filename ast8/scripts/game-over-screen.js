class GameOverScreen {
    constructor(props) {
        this.$element = props.$element;
    }

    showGameOverScreen() {
        console.log(this.$element);
        this.$element.style.display = "block";
    }

    hideGameOverScreen() {
        this.$element.style.display = "none";
    }
}