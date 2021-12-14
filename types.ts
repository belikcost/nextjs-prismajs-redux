import { StatusEnum } from "./enums";


interface StateInterface {
    status: StatusEnum | null,
}

type ColorType =
    '#DB3333'
    | '#DB6F33'
    | '#DBC033'
    | '#69DB33'
    | '#33DB9E'
    | '#33C7DB'
    | '#3376DB'
    | '#3633DB'
    | '#7D33DB'
    | '#D833DB';

export type { StateInterface, ColorType };