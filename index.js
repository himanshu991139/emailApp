const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");

const route = express.Router();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "***********",
    pass: "*********",
  },
});

app.get("/", (req, res) => {
  res.send("Hello From server");
});
app.post("/sendmail", (req, res) => {
  // console.log(req)

  const message = {
    from: `*****`, // Sender address
    to: "********", // List of recipients
    subject: `${req.body.subject}`, // Subject line
    html: `<b>Email:- ${req.body.email}</b><br>${req.body.message}`, // html body
  };
  //   res.json(req.body);

  transport.sendMail(message, function (err, info) {
    if (err) {
      res.send({ code: "400", message: err });
    } else {
      res.send({ code: "200", message: "Mail Sended Successfully" });
    }
  });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
