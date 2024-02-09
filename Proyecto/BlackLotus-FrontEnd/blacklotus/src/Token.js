
export function getCookie(name) {
    let cookieValue = null;


    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
}

export function getToken()
{
    if(localStorage.getItem('token')){
        return localStorage.getItem('token');
    }
    else {
        changeUser(0)
        return localStorage.getItem('token')
    }
}

export function changeUser(id)
{
    
    switch(id) {
        case 0:
            localStorage.setItem('token', "3ed3a7e39a081e5cc7768911358781896c4aec29");//bee lluis123
            
            break;
        case 1:
            localStorage.setItem('token', "cbf8d5911ab8eb6579f0cfa91714174fb1c4dc82");//llpfdc lluis123
            
            break;
        
        case 2: 
            localStorage.setItem('token', "e0dd4257259a99ecfab0c8e40d60b0307a2d7b8a");//admin admin
            
            break;
        
        default:
            localStorage.setItem('token', "3ed3a7e39a081e5cc7768911358781896c4aec29");
            
            break;
    }
}

export function getUsername() {
    
    switch(localStorage.getItem('token')) {
        case "3ed3a7e39a081e5cc7768911358781896c4aec29":
            return "bee";
        case "cbf8d5911ab8eb6579f0cfa91714174fb1c4dc82":
            return "llpfdc"
        case "e0dd4257259a99ecfab0c8e40d60b0307a2d7b8a": 
            return "admin";
    }
}

export function getIdUser() {
    switch(localStorage.getItem('token')) {
        case "3ed3a7e39a081e5cc7768911358781896c4aec29":
            return 0;
        case "cbf8d5911ab8eb6579f0cfa91714174fb1c4dc82":
            return 1;        
        case "e0dd4257259a99ecfab0c8e40d60b0307a2d7b8a": 
            return 2;
    }
}

export function getUsernameId(id){
    switch (id) {
        case 1:
            return "admin"
        case 2:
            return "bee"
        case 3:
            return "llpfdc"
    }
}