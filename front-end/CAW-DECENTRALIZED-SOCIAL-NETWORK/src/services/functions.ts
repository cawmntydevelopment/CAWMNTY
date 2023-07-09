import {MESSAGES} from "../config/customData";

export const current = (route: string) => {

    if (route === "/") {
        return "home"
    }

    if (route === "/notifications") {
        return "notifications"
    }

    if (route === "/explore") {
        return "explore"
    }

    if (route === "/settings") {
        return "settings"
    }

    if (route === "/bookmarks") {
        return "bookmarks"
    }

    if (route === "/caw-direct") {
        return "caw-direct"
    }

    if (route === "/profile") {
        return "profile"
    }

    if (route === "/crypto-center") {
        return "CryptoCenter"
    }



    return "none"
}

export const activeWidth = (route: string) => {
    if (route === "home") {
        return {width: "130px"}
    }

    if (route === "notifications") {
        return {width: "190px"}
    }

    if (route === "explore") {
        return {width: "150px"}
    }

    if (route === "settings") {
        return {width: "160px"}
    }

    if (route === "CryptoCenter") {
        return {width: "185px"}
    }

    if (route === "caw-direct") {
        return {width: "170px"}
    }

    if (route === "profile") {
        return {width: "158px"}
    }

    return {width: "0px"}
}

export function avatar(username: string) {
    const oneCharecter = username.substring(0, 1);
    const orta = Math.floor((username.length / 2));
    const twoCharecter = username.substring(orta, (orta + 1))

    return (oneCharecter + twoCharecter).toUpperCase()
}

export const randomNumber = Math.floor(Math.random() * 10000000);

export const shuffleColor = () => {
    const colors = ["#734222", "#308446", "#497E76", "#3E3B32", "#6A5F31", "#755C48", "#E1CC4F", "#102C54", "#343E40"];
    const randomColor = Math.floor(Math.random() * colors.length)
    return colors[randomColor];
}

export const shuffleBotMessage = (myMessage: string) => {
    const findMessageArray = ["hello", "hi", "hello!", "hi", "selam", "merhaba"];

    if (findMessageArray.includes(myMessage.toLowerCase())) return "Hello! It is nice to meet you. How are you?";

    const messages = [
        "What do you do?",
        "How’s (summer) treating you?",
        "What have you been up to lately?",
        "Long time, no see! Any updates since we last saw each other?",
        "What do you do when you’re not working?",
        "Would you mind giving me a hand with this?",
        "What sort of stuff do you do on the weekends?",
        "What’s your take on (the latest movie)?"
    ];
    const randomMessage = Math.floor(Math.random() * messages.length)
    return messages[randomMessage];
}

export function isActiveSettings(page: string) {
    const pages = ["settings-1", "settings-2", "settings-3", "settings-4", "settings-5", "settings-6","settings-7"];
    if (pages.includes(page)) {
        return "active";
    } else {
        return "noactive";
    }
}

export function isActiveChat(id: string) {
    const messages: any = [];

    const push = () => {
        MESSAGES.map((chat) => messages.push(chat.chatId))
    };

    push()

    if (messages.includes(id)) {
        return "active";
    } else {
        return "noactive";
    }
}

export const messageSubstr = (msg: string) => {
    if (msg.length > 120) {
        return msg.substring(0, 120) + "...";
    }

    return msg
}


export function toFixed(x : any) {

    if(x) {
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10,e-1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } else {
            var e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10,e);
                x += (new Array(e+1)).join('0');
            }
        }
        return x;
    }

}



export const humanNotZeroUsd = (num?: number) => {


    const number = toFixed(num);

    const one = number?.toString()?.split(".");
    const two = one[1]?.match(/^0+/);
    const delLength = two ? two[0]?.length : 0;
    const deletes = one[1]?.substring(delLength)

    return [one[0], delLength , deletes]

};
