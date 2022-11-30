import { EDGES } from "../logic/constants.js";
import { CHARACTER_ELEMENTS, TRANSITION } from "./constants.js";
import { 
    boatMoveTo, 
    dead, 
    done, 
    moveToEndEdge, 
    moveToStartEdge, 
    showResolve} from "./actions.js";
import { waitFor } from "./functions.js";

export const render = async (movements) => {
    try {
        const movementsWithBack = movements.map((movement, idx) => {
            const nextMovement = movements[idx + 1];
            let back = false;
            if (nextMovement)
                back = movement.edge === nextMovement.edge;
            return {
                ...movement,
                back
            };
        });
        for (const movement of movementsWithBack) {
            const character = CHARACTER_ELEMENTS[movement.boat];
            if (movement?.dead) {
                dead(movement.dead);
                return;
            }
            const moveToEdge = ({
                [EDGES.START]: moveToStartEdge,
                [EDGES.END]: moveToEndEdge
            })[movement.edge];
            await moveToEdge(character);
            if (!movement.back) continue;
            await boatMoveTo(movement.edge);
        }
        done();
    }
    finally {
        await waitFor(2.5);
        resetUI();
    }
}

export const resetUI = async () => {
    showResolve("ERROR", "remove");
    showResolve("SUCCESS", "remove");
    await waitFor(0.4);
    const CHARACTER_ELEMENTS_ARRAY = Object.values(CHARACTER_ELEMENTS);
    const isLow = CHARACTER_ELEMENTS.boat.classList.contains("end-edge");
    CHARACTER_ELEMENTS_ARRAY.forEach((CHARACTER) => {
        let className = "character";
        className += CHARACTER === CHARACTER_ELEMENTS.boat ? " low" : " fast";
        CHARACTER.className = className;
    });
    await waitFor(isLow ? TRANSITION.LOW : TRANSITION.FAST);
    document.getElementById("case-menu").classList.remove("hidden");
}