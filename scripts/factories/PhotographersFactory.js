import { Photographer } from "../models/Photographer";
import { Media } from "../models/Media";

export class PhotographersFactory {
    static create(data, type) {
        if (type === 'photographer') {
            return new Photographer(data);
        } else if (type === 'media') {
            return new Media(data);
        } else {
            throw new Error ('erreur du paramètre type');
        }
    }
}