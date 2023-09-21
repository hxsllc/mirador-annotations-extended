import { VIEWER_CATEGORIES } from "../configs/category"

const getNameByValue = (value) => {
    let cnt = VIEWER_CATEGORIES.length;

    for (let i = 0; i < cnt; i++) {
        if (VIEWER_CATEGORIES[i].value == value)
            return VIEWER_CATEGORIES[i].label;
    }

    return "";
}

export { getNameByValue }