const API_URL = 'http://localhost:5000';

// Sends sign up details of user to server
async function httpSignUp(signUpDetails) {
    try {
        return await fetch(`${API_URL}/signup`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpDetails)
        });
    } catch (err){
        return {
            ok: false
        };
    };
}

// Sends sign in details of user to server to verify whether they are existing users or not
async function httpSignIn(signInDetails) {
    try {
        return await fetch(`${API_URL}/signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInDetails)
        }).then(res => res.json())
          .then(object => localStorage.setItem('token',object.token))
    } catch (err){
        return {
            ok: false
        };
    };
}

// Sends new password to server
async function httpSettings(settingsDetails) {
    try {
        return await fetch(`${API_URL}/settings`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassword: settingsDetails.newPassword,
                token: localStorage.getItem('token') 
            })
        });
    } catch (err){
        return {
            ok: false
        };
    };
}

export {
    httpSignUp,
    httpSignIn,
    httpSettings
};