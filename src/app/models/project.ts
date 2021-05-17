export class Project {
    id: number;
    title: string;
    description: string;
    isDone: boolean;

    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.isDone = false;
    }
}
