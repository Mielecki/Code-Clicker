import keyboard from "./assets/keyboard.png"
import book from "./assets/book.png"
import online_course from "./assets/online_course.png"

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
    },
    onlineCourse: {
        progressName: "onlineCourse",
        type: "auto",
        icon: online_course,
        multiplier: 0.5,
        baseCost: 200,
    }
}

export default upgradeData