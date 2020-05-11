import { Component, ViewChild } from "@angular/core";

import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";

import { ActionBarService } from "./services/actionbar.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    @ViewChild(RadSideDrawerComponent, { static: true })
    sideDrawerComponent: RadSideDrawerComponent;

    constructor(private actionBarService: ActionBarService) {}

    ngOnInit() {
        this.actionBarService.update(
            this.sideDrawerComponent, null);
    }
}
