import { CHARACTERS, EDGES } from "./logic/constants.js";
import { Boat } from "./logic/boat.js";
import { render } from "./ui/ui.js";
import { initCaseMenu, initStart } from "./ui/actions.js";

const tryWith = async movements => {
    const startEdge = [
        CHARACTERS.HAWK,
        CHARACTERS.PARROT,
        CHARACTERS.BASKET_OF_WALNUTS
    ];
    const boat = new Boat(startEdge);
    try {
        boat.start(movements);
    }
    catch (err) {
        // console.log(`xxx Error: ${err} xxx`);
    }
    await render(movements);
}

const cases = [
    {
        id: "solution-case",
        movements: [
            {
                boat: CHARACTERS.PARROT,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.HAWK,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.PARROT,
                edge: EDGES.START
            },
            {
                boat: CHARACTERS.BASKET_OF_WALNUTS,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.PARROT,
                edge: EDGES.END
            }
        ]
    },
    {
        id: "parrot-eaten-case",
        movements: [
            {
                boat: CHARACTERS.PARROT,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.HAWK,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.BASKET_OF_WALNUTS,
                edge: EDGES.END
            }
        ]
    },
    {
        id: "walnuts-eaten-case",
        movements: [
            {
                boat: CHARACTERS.PARROT,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.BASKET_OF_WALNUTS,
                edge: EDGES.END
            },
            {
                boat: CHARACTERS.HAWK,
                edge: EDGES.END
            }
        ]
    }
];

const game = async () => {
    await initStart();
    await initCaseMenu(cases.map(({ id, movements }) => ({
        id,
        onInit: () => tryWith(movements) 
    })));
}
game();