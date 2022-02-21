import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { toFileStream, toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';

const secret = authenticator.generateSecret(); // to be a constant
const user = 'test@gmail.com';
const appname = '2fa-nest';
const otpuri = authenticator.keyuri(user, appname, secret);

@Controller()
export class AppController {
  constructor() {}

  //generate qr code image
  @Get('/qrv1')
  @Header('content-type', 'text/html')
  getToken(@Res() response: Response) {
    return toDataURL(otpuri, (err, imageUrl) => {
      if (err) {
        console.log('Error with QR');
        return;
      }
      return response.send(`<img src="${imageUrl}">`);
    });
  }

  // generate qr code
  @Get('/qrv2')
  getTokenFileStream(@Res() response: Response) {
    return toFileStream(response, otpuri);
  }

  // function to verify the google authentication token
  @Get('/check/:token')
  isValid(@Param() params) {
    const isValid = authenticator.check(params.token, secret);
    if (isValid) {
      return 'Valid';
    }
    return 'not valid';
  }
}
