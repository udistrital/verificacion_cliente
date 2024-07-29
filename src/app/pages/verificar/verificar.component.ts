import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService} from '@ngx-translate/core';
import { FirmaElectronicaService } from '../../helpers/gestor_documental/firmaElectronicaHelper';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { PopUpManager } from '../../managers/popUpManager';

@Component({
  selector: 'ngx-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss'],
})
export class VerificarComponent implements OnInit {

  doc: any;
  firmaId: string;
  base64Output: string;
  fileName: string;
  pdfURL?: any;
  fileSelected?: Blob;
  blob?: Blob;
  fileEqual: any;
  swalAlert = require('sweetalert2');
  constructor(
    private translate: TranslateService,
    private firmaElectronicaService: FirmaElectronicaService,
    private sanitization: DomSanitizer,
    private popUpMan: PopUpManager,
  ) { }

  ngOnInit() {
  }
  // Inicio captura documento
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.convertFile(file).subscribe(base64 => {
        this.base64Output = base64;
        this.loadPdf();
      });
    } else {
      this.base64Output = '';
    }
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(reader.result.toString()));
    return result;
  }
  loadPdf(): void {
    if (this.base64Output) {
      // Mostrar en iframe base 64
      const binary = atob(this.base64Output.replace(/\s/g, ''));
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new Uint8Array(buffer);

      for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([view], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      this.pdfURL = url;
    }
  }
  // fin captura documento
  public checkFirma() {
    if (!this.firmaId || this.firmaId.length !== 36) {
      this.popUpMan.showSignAlert(1);
      return;
    }
    if (this.base64Output == null) {
      this.base64Output = '';
    }
    Swal({
      title: 'Por favor espera, cargando documento',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    if (this.base64Output == null) {
      this.base64Output = '';
    }
    if (this.pdfURL == null) {
      this.pdfURL = '';
    }
    this.firmaElectronicaService.getOne(this.firmaId, this.base64Output, this.pdfURL)
      .subscribe(async (data: any) => {
        const url = await this.firmaElectronicaService.getUrlFile(data.res[0].file, data.res[0]['file:content']['mime-type']);
        this.fileEqual = await data.res[0].fileEqual;
        this.pdfURL = this.sanitization.bypassSecurityTrustResourceUrl(data.res[0].urlFileUp);
        if (url) {
          console.info(url);
          this.doc = this.sanitization.bypassSecurityTrustResourceUrl(url.toString());
        }
        Swal.close();
        if (!this.fileEqual) {
          this.popUpMan.showSignAlert(2);
        } else {
          this.popUpMan.showSignAlert(3);
        }
      });
  }


  public onVolver() {
    this.doc = undefined;
    this.firmaId = '';
    this.fileName = '';
    this.pdfURL = '';
    this.base64Output = '';
  }

}
