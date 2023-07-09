export interface IPOSTDATA {
    username: string,
    date:string,
    image: boolean,
    data:string,
    like:number,
    comment:number,
    userImage:string,
    cawet : number,
    share:number,
    video:boolean,
    description?:string
}

export interface IMODALSETUP {
    "90px": {
        level: number,
        go:boolean,
        back:boolean,
        disconnect?:boolean,
        mint?:boolean
    },
    "180px": {
        level: number,
        go:boolean,
        back:boolean,
        disconnect?:boolean,
        mint?:boolean
    },
    "270px": {
        level: number,
        go:boolean,
        back:boolean,
        disconnect?:boolean,
        mint?:boolean
    },
    "360px": {
        level: number,
        go:boolean,
        back:boolean,
        disconnect?:boolean,
        mint?:boolean
    },
}
