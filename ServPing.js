var ping = require('ping');
var nodemailer = require('nodemailer');

var hosts = [
    '192.168.200.4', '192.168.200.10', '192.168.200.18', '192.168.200.21', '192.168.200.37',
    '192.168.200.39', '192.168.200.40', '192.168.200.50'
];

const mensaje = [];

async function isPing() {
    for (let host of hosts) {
        let res = await ping.promise.probe(host);
        let isAlive = res.alive
        var msg = isAlive ? `host ${res.host} time = ${res.time} is ${isAlive}` : `host ${res.host} time = ${res.time} is ${isAlive}`;
        let dato = { msg: msg }
        mensaje.push(dato)
    }
    contenHTML = `
        <h1>Server Ping</h1>
        <ul>
            ${mensaje.map((d) => '<li>' + d.msg + '</li>')}
        </ul>
    `
    sendMail(contenHTML)
}
console.log('Realizando Ping...')
isPing()

function sendMail(mensajeHTML) {
    console.log("Creating transport...");
    var transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        requireTLS: true,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        },// true for 465, false for other ports
        auth: {
            user: 'jcastro@viva1a.com.co',
            pass: 'Panamericano06'
        },
        debug: true,
    });

    var mailOptions = {
        from: 'jcastro@viva1a.com.co',
        to: 'pgelvez@viva1a.com.co,rojito@viva1a.com.co, cherrera@viva1a.com.co,jcastro@viva1a.com.co',
        subject: 'Server Ping',
        html: `${mensajeHTML}`
    };

    console.log("sending email", mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        console.log("senMail returned!");
        if (error) {
            console.log("ERROR!!!!!!", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log("End of Script");
}