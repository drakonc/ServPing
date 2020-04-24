var ping = require('ping');
var nodemailer = require('nodemailer');

var hosts = [
    '172.27.83.194', '172.27.83.195', '172.27.191.227', '172.27.198.66', '172.27.198.69',
    '192.168.200.4', '192.168.200.5', '192.168.200.6', '192.168.200.8', '192.168.200.10',
    '192.168.200.11', '192.168.200.12', '192.168.200.13', '192.168.200.14', '192.168.200.15',
    '192.168.200.16', '192.168.200.17', '192.168.200.18', '192.168.200.19', '192.168.200.20',
    '192.168.200.21', '192.168.200.25', '192.168.200.39', '192.168.200.40', '192.168.200.41',
    '192.168.200.43', '192.168.200.45', '192.168.200.50', '192.168.200.52', '192.168.200.92',
    '192.168.200.116', '192.168.200.230', '192.168.200.251',
];

async function isPing() {
    contenHTML = `
                    <h1>Server Ping Viva1a IPS</h1>
                    <ul>
                `
    for (let host of hosts) {
        let res = await ping.promise.probe(host);
        let isAlive = res.alive
        var msg = isAlive ? `host ${res.host} time = ${res.time} is ${isAlive}` : `host ${res.host} time = ${res.time} is ${isAlive}`;
        contenHTML += `<li>${msg}</li>`
    }

    contenHTML += `
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
        },
        auth: {
            user: 'soporte.ti@viva1a.com.co',
            pass: 'Qwertyuiop0011'
        },
        debug: true,
    });

    var mailOptions = {
        from: 'soporte.ti@viva1a.com.co',
        to: 'cherrera@viva1a.com.co,infraestructura@viva1a.com.co',
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