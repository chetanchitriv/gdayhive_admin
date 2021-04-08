import { Injectable, EventEmitter, ErrorHandler } from '@angular/core';

@Injectable()

export class GlobalErrorHandler implements ErrorHandler {

  handleError(error) {
    console.error("I will handle error myself");
    throw error;
  }
}
