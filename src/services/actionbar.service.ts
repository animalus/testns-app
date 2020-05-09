import { Injectable } from "@angular/core";

import { ReplaySubject } from "rxjs";

import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";

@Injectable()
export class ActionBarService {
    subject: ReplaySubject<any> = new ReplaySubject(1);

    update(sideDrawerComponent: RadSideDrawerComponent, defaultTitle: string) {
        this.subject.next({ sideDrawerComponent, defaultTitle });
    }
}
