import { sortByKey } from '../utils';

describe("Utils for sorting by key", () => {

    const data = [
        {
            name: "Cab",
            value: "3",
        },
        {
            name: "Aab",
            value: "1",
        },
        {
            name: "Bab",
            value: "34",
        },
    ];

    it("Should sort by key 'name' in ascending order", () => {
        expect(sortByKey(data, "name", true))
            .toEqual([
                {
                    name: "Aab",
                    value: "1",
                },
                {
                    name: "Bab",
                    value: "34",
                },
                {
                    name: "Cab",
                    value: "3",
                },
            ]);
    });

    it("Should sort by key 'name' in descending order", () => {
        expect(sortByKey(data, "name", false))
            .toEqual([
                {
                    name: "Cab",
                    value: "3",
                },
                {
                    name: "Bab",
                    value: "34",
                },
                {
                    name: "Aab",
                    value: "1",
                },
            ]);
    });

    it("Should sort by key 'value' in ascending order", () => {
        expect(sortByKey(data, "value", true))
            .toEqual([
                {
                    name: "Aab",
                    value: "1",
                },
                {
                    name: "Cab",
                    value: "3",
                },
                {
                    name: "Bab",
                    value: "34",
                },
            ]);
    });

});