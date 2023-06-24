import { Injectable } from '@angular/core';
import { RequestManager } from '../../managers/requestManager';
import { PopUpManager } from '../../managers/popUpManager';

@Injectable({
  providedIn: 'root',
})
export class GestorDocumentalService {

  constructor(
    private rqManager: RequestManager,
    private pUpManager: PopUpManager,
  ) { }

  getUrlFile(base64, minetype) {
    return new Promise((resolve, reject) => {
      const url = `data:${minetype};base64,${base64}`;
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'File name', { type: minetype });
          const urlF = URL.createObjectURL(file);
          resolve(urlF);
        });
    });
  }

  getOne(firma: string) {
    this.rqManager.setPath('GESTOR_DOCUMENTAL_SERVICE');
    const payload = [
      {
        firma,
      },
    ];
    return this.rqManager.post('document/verify', payload);
  }

}
