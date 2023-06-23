import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { GestorDocumentalService } from '../../helpers/gestor_documental/gestorDocumentalHelper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss'],
})
export class VerificarComponent implements OnInit {

  doc: any;
  constructor(
    private translate: TranslateService,
    private gestorDocumentalService: GestorDocumentalService,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit() {
    this.downloadFile();
  }

  public downloadFile() {
    Swal({
      title: 'Por favor espera, cargando documento',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const filesToGet = [{
      Id: 146897,
    }];

    this.gestorDocumentalService.getOne(146897)
      .subscribe(async (data: any) => {
        // console.log(data.Data[0].Nuxeo)
        const url = await this.gestorDocumentalService.getUrlFile(data.Data[0].Nuxeo.file, data.Data[0].Nuxeo['file:content']['mime-type']);
        if (url) {
          this.doc = this.sanitization.bypassSecurityTrustResourceUrl(url.toString());
        }

        Swal.close();
      });
  }

}
