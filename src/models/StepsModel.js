import { nanoid } from 'nanoid'

export default class StepsModel {
    constructor(date='',dist='',id=nanoid()) {
        const dataparts = date.split('.');
        this.id = id;
        this.dist = parseFloat(dist);
        this.date = date;
        this.timestamp = Math.round(new Date('20' + dataparts[2], dataparts[1] - 1, dataparts[0]).getTime()) / 1000;
    }
};