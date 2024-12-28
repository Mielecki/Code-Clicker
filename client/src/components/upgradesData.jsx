import keyboard from "./assets/keyboard.png"
import book from "./assets/book.png"

const upgradeData = {
    keyboard: {
        progressName: "keyboard",
        type: "click",
        icon: keyboard,
        multiplier: 0.1,
        baseCost: 10,
    },
    book: {
        progressName: "book",
        type: "auto",
        icon: book,
        multiplier: 0.1,
        baseCost: 20,
    }
}

export default upgradeData