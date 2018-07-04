class HomeScreen {
    constructor(props) {
        this.$element = props.$element;
    }

    showHomeScreen() {
        this.$element.style.display = "block";
    }

    hideHomeScreen() {
        this.$element.style.display = "none";
    }
}