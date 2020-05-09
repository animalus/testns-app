import { Component, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { ActionBarService } from "./services/actionbar.service";
import { DialogService } from "./services/dialog.service";

@Component({
    templateUrl: "./home.html"
})
export class HomeComponent {
    sub: Subscription;
    sideDrawerComponent: RadSideDrawerComponent;

    constructor(
        private dialogService: DialogService,
        private vcRef: ViewContainerRef,actionBarService: ActionBarService) {
        this.sub = actionBarService.subject.subscribe(value => {
            this.sideDrawerComponent = value.sideDrawerComponent;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    meClicked() {
        this.dialogService.confirm(
            { message: "Do this thing?" },
            { vcRef: this.vcRef }
        );
    }

    openDrawer() {
        this.sideDrawerComponent.sideDrawer.toggleDrawerState();
    }
}
