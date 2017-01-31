const helper = require('sendgrid').mail;

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

exports.emailInvite = (req, res) => {
  const gameLink = req.body.link;
  const email = req.body.email;
  const link = `${gameLink}&email=${email}`;
  const fromEmail = new helper.Email('info@temari-cfh.com');
  const toEmail = new helper.Email(email);
  const subject = 'Invitation to join Temari-cfh game!';
  const data = `<img src="https://goo.gl/aN3NWR" height="50"
  width="300"><hr/>You have been invited by <strong><a>${req.user.name}</a>
  </strong> to join a game in cards for humanity<br/><br/>Cards for Humanity is
  a fast-paced online version of the popular card game,Cards Against Humanity,
  that gives you the opportunity to donate to children in need - all while
  remaining as despicable and awkward as you naturally are.<br/> <h3>Click on
  this link <a href="${link}">here</a> to join the game now.<h3><br/>`;
  const content = new helper.Content('text/html', data);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);


  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, (error, response) => {
    if (error) {
      res.json({ status: error });
      return;
    }
    res.json({ status: response.response });
  });
};
