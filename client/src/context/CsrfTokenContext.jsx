import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
const secretToken = import.meta.env.VITE_SECRET_TOKEN

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

console.log("secret token ***", secretToken)

export const CsrfTokenContext = createContext()
export const GetCsrfTokenContext = createContext()

export const CsrfTokenProvider = (children) => {

    console.log("COOKIE ====> ", document.cookie)

    // Ensure that it's only executed once when the component is initially rendered.
    const [cookieValue, setCookieValue] = useState(() => {
        // splits the document.cookie string into an array of individual cookies, ';' is the separator 
        // trims each cookie, and finds the one that starts with the specified name.
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        // console.log("cookies", cookies)

        const targetCookie = cookies.find(cookie => cookie.startsWith(`${secretToken}=`));
        console.log("targetCookie", targetCookie)

        // If the target cookie is found, it extracts and decodes the value, which becomes the initial state.
        if (targetCookie) {
            const [, value] = targetCookie.split('=');
            return decodeURIComponent(value);
        }

        // If the target cookie is not found, it returns null as the initial state.
        return null;
    });

    return (
        <CsrfTokenProvider value={cookieValue}>
            {children}
        </CsrfTokenProvider>
    );
}

export const GetCsrfTokenProvider = (children) => {
    const [csrfToken, setCsrfToken] = useState(secretToken)

    useEffect(() => {
        const getCSRFToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_csrf/', { withCredentials: true });
                const newCsrfToken = response.data.CSRFToken;
                setCsrfToken(newCsrfToken)
                console.log("RESPONSE from DB", response.data.CSRFToken)
                // Set the CSRF token in the headers for subsequent requests
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        getCSRFToken();
    }, []);

}


