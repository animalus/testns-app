import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DialogService } from "./services/dialog.service";
import { ActionBarService } from "./services/actionbar.service";
import { ConfirmDialog } from "./services/confirm.dialog";
import { HomeComponent } from "./home.component";

//
// This was simply added to test a problem I was having in another repo with the
// compiler seemingly grabbing the wrong version of nativescript ui color. It
// turned out to be an issue with the path in tsconfig.json. The entry ...
//     "*": ["./node_modules/*"]
// ... turned out to lead to the error. Simply removing the entry fixed the problem.
//
import { HtmlView } from "@nativescript/core";
console.log(HtmlView);

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        // NativeScriptFormsModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, ConfirmDialog, HomeComponent],
    providers: [ActionBarService, DialogService],
    entryComponents: [ConfirmDialog],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
