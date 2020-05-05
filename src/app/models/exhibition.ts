export class Exhibition{
    private id: string;
    private date: string;
    private url: string;

    constructor() {

    }

    set _id(_id: string) {
        this.id = _id;
    }

    get _id() {
        return this.id;
    }

    set _date(_date: string) {
        this._date = _date;
    }

    get _date() {
        return this.date;
    }

    get _url() {
        return this.url;
    }

    set _url(_url: string) {
        this.url = _url;
    }

}