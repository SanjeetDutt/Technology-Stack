export const JWTDecode = <R extends {}>(token: string):R|null=>{
    const [header, payload, signature] = token.split(".")
    if(!header || !payload || !signature){
        return null
    }

    var jsonPayload = decodeURIComponent(window.atob(payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload) as R;
}