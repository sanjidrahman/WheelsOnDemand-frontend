import { Injectable } from '@angular/core';

@Injectable()
export class ScriptLoaderService {
  constructor() { }
  loadScript(scripturl: string, callback: () => void): void {
    if (window.google && window.google.maps) {
      if (callback) {
        callback();
      }
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scripturl;
    script.onload = () => {
      if (callback) {
        callback();
      }
    };
    document.body.appendChild(script);
  }
}