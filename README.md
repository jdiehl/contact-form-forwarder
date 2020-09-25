# Contact Form Forwarder

Contact Form Forwarder is a simple server that sends anything it receives as an email to a predefined recipient.

## Installation

Install node packages `npm install`, set up environment variabels (see below), and start the server `npm start`.

## Usage

Simple set your form action to this server:

```html
<form action="http://localhost:3000">
  ...
</form>
```

## Configuration

`MAIL_HOST`: SMTP Host
`MAIL_USER`: SMTP Username
`MAIL_PASS`: SMTP Password
`MAIL_FROM`: Email address to send from (default: MAIL_USER)
`MAIL_TO`: Email address to send to
`MAIL_SUBJECT`: Email subject line
`MAIL_REDIRECT`: URL to redirect the sender to after submission
`PORT`: Listening port (default: 3000)
