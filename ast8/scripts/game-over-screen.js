class GameOverScreen {
    consturctor(props) {
        this.$element = props.$element;
    }

    showGameOverScreen() {
        this.$element.style.display = "block";
    }

    hideGameOverScreen() {
        this.$element.style.display = "none";
    }
}