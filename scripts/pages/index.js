import { PhotographersApi } from "../api/Api";

export class App {
    constructor() {
        this.$mainWrapper = document.querySelector("#main");
        this.photographersApi = new PhotographersApi ('/data/photographers.json');
    }

    async main() {
        const photographersData = await this.photographersApi.get();

        console.log("hello api");
        console.log(photographersData);
    }
}

const app = new App();
app.main();