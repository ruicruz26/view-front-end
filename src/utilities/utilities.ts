export function formPayload(e: EventTarget) {

    const form = e as HTMLFormElement;

    const formData = new FormData(form);

    const payload: any = {};

    formData.forEach((value, key) => payload[key] = value);

    return payload;
}

export function currentDate() {
    
    let date = new Date();
    
    return  `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

export function removeFromLocale(key: string) {
    
    localStorage.removeItem(key);
}

export function serviceErrorHandler(err: any) {
    console.log(err);

    /* removeFromLocale("token");
    removeFromLocale("userId"); */

    window.location.replace("/");
}

export function formatTime(time: number) {

    return Math.floor(time / 60);
}