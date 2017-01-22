require('dotenv').config();

const nodemailer = require('nodemailer');

exports.emailInvite = (req, res) => {
const gameLink = req.body.link;
  const email = req.body.email;
  const link = `${gameLink}&email=${email}`;
   var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSW,
        }
    });


const mailOptions = {
    from: 'mariam@gmail.com',
    to: req.body.email,
    subject: 'Invitation to join CFH Game',
    html: `<h3> Cards for Humanity(CFH) </h3><br/><hr/>
    You have been invited by <a>${req.user.name}</a> 
    to join a game in cards for humanity<br/>It is a 
    gracious way to give back to the human race.<br/>
    click on this link <a href="${link}">here</a> to join the game now.<br/>
    <strong>Cards For Humanity</strong>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ status: 'error' });
      console.log('mail not sent');
     
    } else {
      res.json({ status: info.response, user: req.user });
      console.log('mail sent successfully');
    
      
    }
  });
};