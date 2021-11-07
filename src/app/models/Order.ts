export interface Order{
    createdAt:Date;
    orderNo: number;
    totalSamples:number;
    laboratory:Laboratory;
}

export interface Laboratory{
    name:string;
    contact:string;
}