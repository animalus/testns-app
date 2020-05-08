import { Component, ViewContainerRef } from "@angular/core";

import { DialogService } from "./services/dialog.service";

@Component({
    templateUrl: "./home.html"
})
export class HomeComponent {
    constructor(
        private dialogService: DialogService,
        private vcRef: ViewContainerRef
    ) {}

    meClicked() {
        this.dialogService.confirm(
            { message: "Do this thing?" },
            { vcRef: this.vcRef }
        );
    }
}
