import { EDGES } from "../logic/constants.js";
import { RESOLVE, TRANSITION } from "./constants.js";
import { waitFor } from "./functions.js";
import { CHARACTER_ELEMENTS } from "./constants.js";

export const initStart = async () => {
    await waitFor(2);
    document.getElementById("start").classList.add("hidden");
    await waitFor(2);
}
export const initCaseMenu = cases => {
    const $caseMenu = document.getElementById("case-menu");
    cases.forEach(({
        id, onInit
    }) => {
        $caseMenu
            .querySelector(`#${id}`)
            .addEventListener("click", async () => {
                $caseMenu.classList.add("hidden");
                await waitFor(1);
                onInit();
            })
    });
}
export const moveToEndEdge = async character => {
    character.classList.add("fast");
    character.classList.add("in-boat-start-edge");

    CHARACTER_ELEMENTS.farmer.classList.add("fast");
    CHARACTER_ELEMENTS.farmer.classList.add("in-boat-start-edge");

    await waitFor(TRANSITION.FAST);

    character.classList.remove("fast");
    character.classList.remove("in-boat-start-edge");
    character.classList.add("low");
    character.classList.add("in-boat-end-edge");

    CHARACTER_ELEMENTS.farmer.classList.remove("fast");
    CHARACTER_ELEMENTS.farmer.classList.remove("in-boat-start-edge");
    CHARACTER_ELEMENTS.farmer.classList.add("low");
    CHARACTER_ELEMENTS.farmer.classList.add("in-boat-end-edge");

    CHARACTER_ELEMENTS.boat.classList.add("end-edge");
    
    await waitFor(TRANSITION.LOW);

    character.classList.remove("low");
    character.classList.remove("in-boat-end-edge");
    character.classList.add("fast");
    character.classList.add("end-edge");

    await waitFor(TRANSITION.FAST);
}
export const moveToStartEdge = async character => {
    character.classList.remove("end-edge");
    character.classList.add("in-boat-end-edge");
    
    await waitFor(TRANSITION.FAST);

    character.classList.remove("fast");
    character.classList.remove("in-boat-end-edge");
    character.classList.add("low");
    character.classList.add("in-boat-start-edge");

    CHARACTER_ELEMENTS.farmer.classList.remove("fast");
    CHARACTER_ELEMENTS.farmer.classList.remove("in-boat-end-edge");
    CHARACTER_ELEMENTS.farmer.classList.add("low");
    CHARACTER_ELEMENTS.farmer.classList.add("in-boat-start-edge");

    CHARACTER_ELEMENTS.boat.classList.remove("end-edge");
    CHARACTER_ELEMENTS.boat.classList.add("start-edge");

    await waitFor(TRANSITION.LOW);

    character.classList.remove("low");
    character.classList.remove("in-boat-start-edge");
    character.classList.add("fast");
    character.classList.add("start-edge");
    
    await waitFor(TRANSITION.FAST);
}
export const boatMoveTo = async edge => {
    switch (edge) {
        case EDGES.START:
            CHARACTER_ELEMENTS.boat.classList.remove("start-edge");
            CHARACTER_ELEMENTS.boat.classList.add("end-edge");

            CHARACTER_ELEMENTS.farmer.classList.remove("fast");
            CHARACTER_ELEMENTS.farmer.classList.remove("in-boat-start-edge");
            CHARACTER_ELEMENTS.farmer.classList.add("low");
            CHARACTER_ELEMENTS.farmer.classList.add("in-boat-end-edge");
            break;
        case EDGES.END: 
            CHARACTER_ELEMENTS.boat.classList.remove("end-edge");
            CHARACTER_ELEMENTS.boat.classList.add("start-edge");

            CHARACTER_ELEMENTS.farmer.classList.remove("fast");
            CHARACTER_ELEMENTS.farmer.classList.remove("in-boat-end-edge");
            CHARACTER_ELEMENTS.farmer.classList.add("low");
            CHARACTER_ELEMENTS.farmer.classList.add("in-boat-start-edge");
            break;
    }
    await waitFor(TRANSITION.LOW);
}
//#region Dead
const killCharacter = (characterName) => {
    CHARACTER_ELEMENTS[characterName].classList.add("dead");
}
export const showResolve = (type, action = "add") => {
    RESOLVE[type].classList[action]("visible");
}
export const dead = async (characterName) => {
    killCharacter(characterName);
    await waitFor(TRANSITION.FAST);
    showResolve("ERROR");
}
//#endregion
//#region Done
const goDownToTheFarmer = () => {
    CHARACTER_ELEMENTS.farmer.classList.remove("in-boat-end-edge");
    CHARACTER_ELEMENTS.farmer.classList.add("fast");
    CHARACTER_ELEMENTS.farmer.classList.add("end-edge");
}
export const done = async () => {
    goDownToTheFarmer();
    await waitFor(TRANSITION.FAST);
    showResolve("SUCCESS");
}
//#endregion