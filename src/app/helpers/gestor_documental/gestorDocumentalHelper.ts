import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Documento } from '../../@core/data/models/documento';
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


  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  getOne(id: number) {
    const payload = 'query=Id:' + id;
    this.rqManager.setPath('GESTOR_DOCUMENTAL_SERVICE');
    return this.rqManager.get('document?' + payload);
    // .subscribe(async (f: any) => {
    //   const url = await this.getUrlFile(f.file, f['file:content']['mime-type']);
    //   console.log('sss', url);
    //   // if (documentos.length === files.length) {
    //   //   documentsSubject.next(documentos);
    //   // }
    // });
    // const documentsSubject = new Subject<Documento[]>();
    // const documents$ = documentsSubject.asObservable();
    // const documentos = [];

    // files.map(async (file, index) => {
    //   const payload = 'query=Id:'
    //   this.rqManager.setPath('GESTOR_DOCUMENTAL_SERVICE');
    //   this.rqManager.get('document?' + file.Id)
    //     .pipe(mergeMap((doc: any) => {
    //       documentos.push(doc);

    //       this.rqManager.setPath('GESTOR_DOCUMENTAL_SERVICE');
    //       return this.rqManager.get('document/' + doc.Enlace);
    //     }),
    //     )
    //     .subscribe(async (f: any) => {
    //       const url = await this.getUrlFile(f.file, f['file:content']['mime-type']);
    //       documentos[index] = { ...documentos[index], ...{ url: url } };
    //       if (documentos.length === files.length) {
    //         documentsSubject.next(documentos);
    //       }
    //     });
    // });
    // return documents$;
  }

  downloadFile(base64: any, fileName: any) {
    const src = `data:text/xsls;base64,${base64}`;
    const link = document.createElement('a');
    link.href = src;
    link.download = fileName;
    link.click();
    link.remove();
  }

}
