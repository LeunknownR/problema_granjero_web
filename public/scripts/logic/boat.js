import { EDGES, FORBIDDEN_EDGE_STATES } from "./constants.js";

export class Boat {
    #startEdgeState;
    #endEdgeState;
    constructor(startEdgeState) {
        this.#startEdgeState = [...startEdgeState];
        this.#endEdgeState = [];
    }
    start = movements => {
        movements.forEach((item, idx) => this.navigate(item, character => movements[idx].dead = character));
    }
    navigate = ({
        boat,
        edge
    }, setDeadCharacter) => {
        const log = this.#getLog(boat, edge);
        if (edge === EDGES.START) {
            this.#checkIfAForbiddenState(this.#startEdgeState, setDeadCharacter);
            this.#manageStartEdge(boat, log);
        }
        if (edge === EDGES.END) {
            this.#checkIfAForbiddenState(this.#endEdgeState, setDeadCharacter);
            this.#manageEndEdge(boat, log);   
        }
        // this.#showLog(log);
    }
    #getLog = (boat, edge) => {
        return [
            "",
            `BOTE ${this.#getRepresentationStringCharacterGroup([boat])} ${edge}`,
            "",
            ""
        ];
    }
    #showLog = log => {
        console.log(log.join("\n") + " \n");
    }
    #manageStartEdge = (boat, log) => {
        log[0] = `ORILLA_INICIAL ${this.#getRepresentationStringCharacterGroup(this.#startEdgeState)}`;
        if (!this.#endEdgeState.includes(boat)) 
            throw "Alguno de los personajes no está en la orilla final";
        this.#startEdgeState = [...this.#startEdgeState, boat];
        this.#endEdgeState = this.#endEdgeState.filter(CH => CH != boat);
        log[2] = `ORILLA_FINAL ${this.#getRepresentationStringCharacterGroup(this.#endEdgeState)}`;
        log[4] =`ORILLA_INICIAL_RESULTADO ${this.#getRepresentationStringCharacterGroup(this.#startEdgeState)}`;
    }
    #manageEndEdge = (boat, log) => {
        log[2] = `ORILLA_FINAL ${this.#getRepresentationStringCharacterGroup(this.#endEdgeState)}`;
        if (!this.#startEdgeState.includes(boat)) 
            throw "Alguno de los personajes no está en la orilla inicial";
        this.#startEdgeState = this.#startEdgeState.filter(CH => CH != boat);
        this.#endEdgeState = [...this.#endEdgeState, boat];
        log[0] = `ORILLA_INICIAL ${this.#getRepresentationStringCharacterGroup(this.#startEdgeState)}`;
        log[4] =`ORILLA_FINAL_RESULTADO ${this.#getRepresentationStringCharacterGroup(this.#endEdgeState)}`;
    }
    #checkIfAForbiddenState = (edge, setDeadCharacter) => {
        const edgeForbiddenFound = FORBIDDEN_EDGE_STATES
            .find(state => state.CHARACTERS.every(CH => edge.includes(CH)));
        if (!edgeForbiddenFound) return;
        setDeadCharacter(edgeForbiddenFound.DEAD_CHARACTER);
        throw edgeForbiddenFound.MESSAGE;
    }
    #getRepresentationStringCharacterGroup = characters => {
        return `["${characters.join(`", "`)}"]`;
    }
}