import { Planet } from "./Planet.interface";

export interface Film {
    "data": {
        "film": {
            "planetConnection": {
                "planets": Planet[],
            }
        }
    }
}