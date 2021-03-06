const nodemailer = require('nodemailer');
messagesEmailController = {};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    //email que envia los msg
    auth: {
        user: 'comunicaciones.abracol@abracol.com',
        pass: 'Abr4col2020'
    }
});

messagesEmailController.post =  (req, res) => {
    const { email } = req.body

    //Step 2
    let mailOptions = {
        from: 'comunicaciones.abracol@abracol.com', //de 
        to: email, //hacia
        subject: 'Pedidos Abracol En Proceso',
        text: 'Abracol te informa que tienes un pedido asignado en proceso por favor revisar, muchas gracias'
    };
    result(mailOptions, res)
    return res.status(200).json({
        message: 'Mensaje enviado Exitosamente 📩'
    })
}

messagesEmailController.postMessages =  (req, res) => {   
    const { email , subject, text } = req.body

    if(! validateEmail(email)) { 
        return res.status(500).json({
            message: 'Campos vacios o  Invalido'
        })
    }else{
        //Step 2
        let mailOptions = {
            from: 'comunicaciones.abracol@abracol.com', //de 
            to: "contacto@abracol.com", //hacia
            subject,
            text: `
                correo del usuario : ${email}
                Descripcion : ${text}
            `
        };
        result(mailOptions, res)
        return res.status(200).json({
            message: 'Mensaje enviado Exitosamente 📩'
        })
    }

}

//Step 3
const result = (mailOptions, res) => {
    transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            return res.status(500).json({
                error,
                messange: 'Error al enviar el correo'
            });
        }else{
            return res.status(200).json({
                message: "Correo Enviado Correctamente"
            });
        }
    })
}

module.exports = messagesEmailController;

