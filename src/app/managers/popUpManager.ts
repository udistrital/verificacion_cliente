import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class PopUpManager {
    constructor(
        private translate: TranslateService,
    ) { }

    /**
     * showToast
     */

    public showAlert(status: string, text: string, titulo: string = status) {
        return this.showAlertWithOptions({
            type: status,
            title: titulo,
            text: text,
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
    }

    public showAlertWithOptions(options: any) {
        return (Swal as any).fire(options);
    }

    public showSuccessAlert(text) {
        return this.showAlert('success', text,
            this.translate.instant('GLOBAL.operacion_exitosa'));
    }

    public showErrorAlert(text) {
        return this.showAlert('error', text,
            this.translate.instant('GLOBAL.error'));
    }

    public showCautionAlert (text) {
        return this.showAlert('warning', text,
            this.translate.instant('Atención'));
    }

    public showSignAlert (text) {
        let translatedText = '';
        let errorTipo = 'warning';
        let operacionTipo = 'Atención';
        switch (text) {
            case 1:
                translatedText = this.translate.instant('GLOBAL.firmaInvalida');
                break;
            case 2:
                translatedText = this.translate.instant('GLOBAL.docsComp');
                break;
            case 3:
                translatedText = this.translate.instant('GLOBAL.firmaVerificada');
                errorTipo = 'success';
                operacionTipo = 'GLOBAL.operacion_exitosa';
                break;
        }
        return this.showAlert(errorTipo, translatedText,
            this.translate.instant(operacionTipo));
    }
}
