import { createPosition } from "../Helper/helper";

export const initGameState={
    position:[createPosition()],
    turn:"w",
    candidateMoves:[]
}