export default class Tracker {
    public values: number[] = [];

    public setValue(value: number) {
        this.values.push(value);
    }

    // returns the minimum value or undefined if there are no values
    public getMin() {
        if (this.values.length === 0) {
           return undefined;
        }

        return Math.min(...this.values);
    }

    // returns the maximum value or undefined if there are no values
    public getMax() {
        if (this.values.length === 0) {
            return undefined;
        }

        return Math.max(...this.values);
    }

    // returns the mean value or undefined if there are no values
    public getMean() {
        if (this.values.length === 0) {
            return undefined;
        }

        let total = 0;
        for (const value of this.values) {
            total += value;
        }

        return total / this.values.length;
    }

    // returns the mode value or undefined if there are no values
    public getMode() {
        if (this.values.length === 0) {
            return undefined;
        }

        let bestValue = NaN;
        let bestCount = 0;

        const occurrenceCount = new Map<number, number>();

        for (const value of this.values) {
            // convert to an integer to make the mode more meaningful
            const normalizedValue = Math.round(value);
            let count = occurrenceCount.get(normalizedValue) || 0;
            count += 1;
            occurrenceCount.set(normalizedValue, count);

            if (count > bestCount) {
                bestValue = normalizedValue;
                bestCount = count;
            }
        }

        return bestValue;
    }
}
