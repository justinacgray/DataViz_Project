import React, {useState, useEffect} from 'react';
import axios from 'axios';
// https://www.techiediaries.com/django-react-forms-csrf-axios/

/* 
This line sets the default name of the cookie that Axios will use to store the CSRF token.
The value 'csrftoken' is the default name used by Django for the CSRF token cookie. This should match the name you set in your Django project.
*/
axios.defaults.xsrfCookieName = 'csrftoken'

/* 
This line sets the default name of the header that Axios will use to include the CSRF token in HTTP requests.
The value 'X-CSRFToken' is the default header name expected by Django to contain the CSRF token.
*/
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


/* 
By configuring these defaults, you don't need to explicitly provide the CSRF token and header in each Axios request. 
Axios will automatically include the CSRF token from the specified cookie in the header with the specified name.

For example, when you make a POST request with Axios, it will include the CSRF token in the request headers using the 
name 'X-CSRFToken', and Django will recognize it for CSRF protection.
 */

const CsrfToken = (name) => {

    console.log("COOKIE ====> ", document.cookie)
    // Ensure that it's only executed once when the component is initially rendered.
    const [cookieValue, setCookieValue] = useState(() => {
        // splits the document.cookie string into an array of individual cookies, ';' is the separator 
        // trims each cookie, and finds the one that starts with the specified name.
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        // console.log("cookies", cookies)

        const targetCookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
        console.log("targetCookie", targetCookie)

        // If the target cookie is found, it extracts and decodes the value, which becomes the initial state.
        if (targetCookie) {
            const [, value] = targetCookie.split('=');
            return decodeURIComponent(value);
        }
        
        // If the target cookie is not found, it returns null as the initial state.
        return null;
    });
    
    return cookieValue;
}

export default CsrfToken