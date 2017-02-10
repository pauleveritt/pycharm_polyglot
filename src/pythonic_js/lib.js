export default class Incrementer {
    constructor () {
        this.items = [];
    }

    add (number) {
        this.items.push(number);
    }

    toHtml () {
        // Return a string of <li> nodes
        return this.items
            .map(
                (item) => `
                <li>
                  Number: ${item}
                </li>
                `
            )
            .join('\n');
    }
}
