const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = '') => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const { 
        name: nombre,
        email: correo
    } = ticket.getPayload();

    return { nombre,correo };

}

module.exports = googleVerify;