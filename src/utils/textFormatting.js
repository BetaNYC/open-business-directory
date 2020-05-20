import DOMPurify from 'dompurify'

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).trim();
}

export function formatPhoneNumber(phoneNumberString){
    //from maerics via https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ')' + match[2] + '-' + match[3]
    }
    return phoneNumberString
}

export function sanitizeString(str = ''){
    return DOMPurify.sanitize(str)
}

//from https://stackoverflow.com/questions/11300906/check-if-a-string-starts-with-http-using-javascript
export function getValidUrl(url = ""){
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if(/^(:\/\/)/.test(newUrl)){
        return `http${newUrl}`;
    }
    if(!/^(f|ht)tps?:\/\//i.test(newUrl)){
        return `http://${newUrl}`;
    }

    return newUrl;
};

export function getValidInstagram(url = ""){
    const pattern = /(instagram\.com|Instagram.com)/;
    if(!pattern.test(url)) {
        return getValidUrl(`https://www.instagram.com/${url}`)
    }
    return getValidUrl(url)
}