import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  firmaId: string;

  constructor(
    private translate: TranslateService,
    private gestorDocumentalService: GestorDocumentalService,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit() {
  }

  public checkFirma() {
    if (!this.firmaId || this.firmaId.length !== 36) {
      return;
    }

    Swal({
      title: 'Por favor espera, cargando documento',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    this.gestorDocumentalService.getOne(this.firmaId)
      .subscribe(async (data: any) => {
        const url = await this.gestorDocumentalService.getUrlFile(data.res[0].file, data.res[0]['file:content']['mime-type']);
        if (url) {
          console.info(url);
          this.doc = this.sanitization.bypassSecurityTrustResourceUrl(url.toString());
        }

        Swal.close();
      });
  }

  public onVolver() {
    this.doc = undefined;
    this.firmaId = '';
  }

}
