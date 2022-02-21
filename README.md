# test-2fa-nest

An testing nestjs application for 2fa using otplib https://github.com/yeojz/otplib

runs on http://localhost:3000

To Start:

1. cd nest2fa
2. npm install
3. npm run start

Routes:

1. localhost:3000/qrv1

- return QR Code image for google authenticator via response.send an html element

2. localhost:3000/qrv2

- return QR Code image for google authenticator via filestream

3. localhost:3000/check/:token

- uses token from google authenticator as query string to see if the 2fa is working.
