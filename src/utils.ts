export const sortByKey = (array: any[], key: string, ascending: boolean) => {
    return array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        if (ascending) {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        else {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}