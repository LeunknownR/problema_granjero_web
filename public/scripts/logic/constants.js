export const CHARACTERS = {
    HAWK: "Halcón",
    PARROT: "Loro",
    BASKET_OF_WALNUTS: "Cesta de nueces"
};
export const EDGES = {
    START: "<-",
    END: "->"
};
export const FORBIDDEN_EDGE_STATES = [
    {
        MESSAGE: "¡El halcón se comió al loro D'x!",
        CHARACTERS: [CHARACTERS.HAWK, CHARACTERS.PARROT],
        DEAD_CHARACTER: CHARACTERS.PARROT
    },
    {
        MESSAGE: "¡El loro se ha comido la cesta de nueces! >:u",
        CHARACTERS: [CHARACTERS.PARROT, CHARACTERS.BASKET_OF_WALNUTS],
        DEAD_CHARACTER: CHARACTERS.BASKET_OF_WALNUTS
    }
];