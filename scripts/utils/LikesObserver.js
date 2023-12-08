export class LikesObserver {
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

    fire(likes, action) {
        this.observers.forEach(obs => obs.updateNumberOfLikes(likes, action));
    }
}