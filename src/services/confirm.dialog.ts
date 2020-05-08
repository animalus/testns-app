import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    templateUrl: "./confirm.dialog.html"
})
export class ConfirmDialog {
    constructor(private params: ModalDialogParams) {}

    close(value?: boolean) {
        this.params.closeCallback(value);
    }
}
