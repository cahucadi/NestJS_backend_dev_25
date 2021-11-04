import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHelloMethod(): string {
    return 'Hola Mano!';
  }


}
