import { Injectable } from "@angular/core";

import {
    ModalDialogService,
    ModalDialogOptions
} from "nativescript-angular/modal-dialog";

import { DialogContext, DialogOptions, ConfirmOptions } from "./types";
import { ConfirmDialog } from "./confirm.dialog";

@Injectable()
export class DialogService {
    constructor(private dialog: ModalDialogService) {}

    openDialog<T, K = any>(
        component: any,
        config: K = null,
        options: DialogOptions = {},
        data: T = null
    ): Promise<T> {
        let mdo: ModalDialogOptions = {
            viewContainerRef: options.vcRef,
            context: { data, config, options } as DialogContext<T, K>,
            fullscreen: false
        };
        return this.dialog.showModal(component, mdo);
    }

    async confirm(options: ConfirmOptions, dialogOptions: DialogOptions = {}) {
        return this.openDialog<boolean, ConfirmOptions>(
            ConfirmDialog,
            options,
            dialogOptions
        );
    }
}
