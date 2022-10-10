const emailParties = require('../mailer/mailer')

const response = {
    status: '',
    contactMe: {
        status: ''
    },
    replyToUser: {
        status: ''
    }
}

const sendMail = async (req, res) => {

    const { contact_ok, confirm_ok } = await emailParties(req);

    if (contact_ok === true & confirm_ok === true) {
        response.status = 'ok';
        response.contactMe.status = 'ok';
        response.replyToUser.status = 'ok';
        res.status(200).send(response);
        return;
    }

    if (contact_ok === false & confirm_ok === false) {
        response.status = 'failure';
        response.contactMe.status = 'failed';
        response.replyToUser.status = 'failed';
        res.status(500).send(response);
        return;
    }

    response.status = 'partial failure';
    response.contactMe.status = contact_ok === true ? 'ok' : 'failed';
    response.replyToUser.status = confirm_ok === true ? 'ok' : 'failed';
    res.status(500).send(response);

}


module.exports = sendMail;