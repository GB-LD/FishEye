export class SortingObserver {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
        return this;
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    fire(sortby) {
        this.observers.forEach(obs => obs.testOberver(sortby));
    }
}