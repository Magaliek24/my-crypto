const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const app = express();
const path = require("path");
require("dotenv").config();
const { fetch_data } = require("./public/assets/js/lib/functions.js");

app.set("view engine", "ejs");

const images = fetch_data({
  api: "https://api.unsplash.com",
  route: "/photos",
  options: {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
    },
    params: { per_page: 50 }, //indiqué dans la doc de Unsplash
  },
}).then((data) => {
  return data;
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(helmet()); // on ne doit garder que ça en prod et supprimer ce qui suit

app.use(
  // on supprime ça en prod (autorise tous les accès)
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://images.unsplash.com/",
          "https://media.rawg.io/",
        ],
        connectSrc: [
          "'self'",
          "https://api.unsplash.com/",
          "https://api.rawg.io/",
        ],
      },
    },
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/gallerie", async (req, res) => {
  try {
    const images_data = await images;
    console.log(images_data);
    res.render("pages/masonry", { images: images_data });
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { images: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// envoie message
app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, email, subject, message } = req.body;
  const html_content = `
  <h1>Nouveau message de contact</h1>
  <p><strong>Objet :</strong> ${subject}</p>
  <p><strong>Nom :</strong> ${name}</p>
  <p><strong>Email :</strong> ${email}</p>
  <p><strong>Message :</strong> ${message}</p>
  `;

  try {
    let test_account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: test_account.smtp.host,
      port: test_account.smtp.port,
      secure: test_account.smtp.secure, // port 465
      auth: {
        user: test_account.user, // contact@monsite.com
        pass: test_account.pass, //mdp
      },
      tls: {
        rejectUnauthorized: false, // authorise tout A SUPPRIMER EN PROD
      },
    });

    let mail_options = {
      from: `"Contact my crypto" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject,
      html: html_content,
    };

    let info = await transporter.sendMail(mail_options);

    // récupération de l'URL de la boite de messagerie locale - ON NE FAIT PAS AVEC UN CLIENT MAIL
    console.log("Message envoyé : %s", info.messageId);
    console.log(
      "URL de prévisualisation : %s",
      nodemailer.getTestMessageUrl(info)
    );
    res.status(200).json({
      message: "Votre message a été envoyé avec succès",
      preview_url: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erreur lors de l'envoi de votre message",
    });
  }
});
