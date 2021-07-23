export default class Movie {
    id_movies?: number;
    name: string = "";
    description: string = "";
    classification: number= 0;
    release_date: string = "1900-01-01";
    duration: number= 0;

    constructor(row: any = null) {
        if (row) {
            this.id_movies = row.id_movies;
            this.name = row.name;
            this.description = row.description;
            this.classification = row.classification;
            this.release_date = row.release_date;
            this.duration = row.duration;
        }
    }
}