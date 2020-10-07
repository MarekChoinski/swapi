export interface Planet {
    "name": string,
    "rotationPeriod": number,
    "orbitalPeriod": number,
    "diameter": number,
    "climates": string[],
    "surfaceWater": number,
    "population": number
};

export const planetLabels = {
    "name": "Planet Name",
    "rotationPeriod": "Rotation period",
    "orbitalPeriod": "Orbital period",
    "diameter": "Diameter",
    "climates": "Climate",
    "surfaceWater": "Surface",
    "population": "Population"
}
