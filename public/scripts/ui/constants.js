import { CHARACTERS } from "../logic/constants.js";

export const TRANSITION = {
    LOW: 3,
    FAST: 0.8
};
export const CHARACTER_ELEMENTS = {
    [CHARACTERS.HAWK]: document.getElementById("hawk"),
    [CHARACTERS.PARROT]: document.getElementById("parrot"),
    [CHARACTERS.BASKET_OF_WALNUTS]: document.getElementById("basket_of_walnuts"),
    farmer: document.getElementById("farmer"),
    boat: document.getElementById("boat")
};
export const RESOLVE = {
    ERROR: document.getElementById("error"),
    SUCCESS: document.getElementById("success")
};