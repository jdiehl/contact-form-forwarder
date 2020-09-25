const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_TO, MAIL_SUBJECT, MAIL_REDIRECT } = process.env
const MAIL_FROM = process.env.MAIL_FROM || MAIL_USER
const PORT = process.env.PORT || 3000

if (!MAIL_HOST) throw new Error('MAIL_HOST missing')
if (!MAIL_USER) throw new Error('MAIL_USER missing')
if (!MAIL_PASS) throw new Error('MAIL_PASS missing')
if (!MAIL_TO) throw new Error('MAIL_TO missing')
if (!MAIL_SUBJECT) throw new Error('MAIL_SUBJECT missing')
if (!MAIL_REDIRECT) throw new Error('MAIL_REDIRECT missing')

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 587,
  auth: { user: MAIL_USER, pass: MAIL_PASS }
})

// sendmail function
async function sendmail (body) {
  const subject = MAIL_SUBJECT
  const html = Object.keys(body).map(key => `<p><b>${key}</b><br/>${body[key]}</p>`).join('')
  await transporter.sendMail({ from: MAIL_FROM, to: MAIL_TO, subject, html })
  return 'ok'
}

// set up express app
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// Heartbeat
app.get('/', (req, res) => {
  res.send('OK')
})

// send mail
app.post('/', async (req, res) => {
  console.log(`SENDMAIL: ${JSON.stringify(req.body)}`)
  await sendmail(req.body)
  res.redirect(MAIL_REDIRECT)
})

app.listen(PORT, () => {
  console.log(`contact-form-forwarder listening on port ${PORT}`)
})
