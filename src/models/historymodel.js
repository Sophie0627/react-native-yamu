export default class HistoryModel {
    title;
    url;
    created;

    constructor() {

    }

    setTitle(title) {
        this.title = title;
    }

    setUrl(url) {
        this.url = url;
    }

    setCreated(date) {
        this.created = date;
    }
}