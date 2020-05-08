# testns-app

This is a test Nativescript app for testing out certain things for upgrading to angular 9 using nativescript.

The master branch works and has some code for just opening a basic dialog.

`tns run android --env.aot --no-hmr`

But if you check out the "side-drawer" branch...

```
git checkout side-drawer
```

... and then super clean the project ...

```
rm -rf platforms/ hooks/ node_modules/ package-lock.json webpack.config.js
```

... and then rerun the above command you should get as I do ...

```
ERROR in The target entry-point "side-drawer-directives" has missing dependencies:
 - ./..
```

... even though I believe I have followed all the recommendations in [here](https://github.com/NativeScript/nativescript-angular/pull/2124#issue-376409005).

## UPDATE

github user `kmmccafferty96` pointed me to `https://github.com/NativeScript/nativescript-ui-feedback/issues/1355#issuecomment-585782902`. This led me to edit the `node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directive.js` and `node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directive.d.ts` and replacing all (2 in each) occurrences of "./.." with "nativescript-ui-sidedrawer"

and then I get ...

```
ERROR in node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directives.d.ts:79:22 - error NG6002: Appears in the NgModule.imports of AppModule, but could not be resolved to an NgModule class.

This likely means that the library (nativescript-ui-sidedrawer/angular) which declares NativeScriptUISideDrawerModule has not been processed correctly by ngcc, or is not compatible with Angular Ivy. Check if a newer version of the library is available, and update if so. Also consider checking with the library's authors to see if the library is expected to be compatible with Ivy.

79 export declare class NativeScriptUISideDrawerModule {
```

so I added ...

```
    "angularCompilerOptions": {
        "enableIvy": false
    }
```

... to my tsconfig.tns.json file and I get ...

```
ERROR in Cannot determine the module for class ConfirmDialog in /home/ken/dev/animalus/test/testns-app/src/services/confirm.dialog.ts! Add ConfirmDialog to the NgModule to fix it.
```

... which led me to remember that I had commented out the usual adding of the ConfirmDialog component to the `app.module` declarations and entryComponents. **_Wait, Ivy doesn't need these defined to run (see master branch)?_**. So I un-commented the code so that the ConfirmDialog gets added to these properties (see app.module.ts) but now I get ...

```
System.err: java.lang.RuntimeException: Unable to start activity ComponentInfo{org.nativescript.nativescriptivy/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: TypeError: Cannot read property 'nativeView' of undefined
System.err: 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2913)
System.err: 	at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3048)
System.err: 	at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78)
System.err: 	at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108)
System.err: 	at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68)
System.err: 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1808)
System.err: 	at android.os.Handler.dispatchMessage(Handler.java:106)
System.err: 	at android.os.Looper.loop(Looper.java:193)
System.err: 	at android.app.ActivityThread.main(ActivityThread.java:6669)
System.err: 	at java.lang.reflect.Method.invoke(Native Method)
System.err: 	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493)
System.err: 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:858)
System.err: Caused by: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: TypeError: Cannot read property 'nativeView' of undefined
System.err: 	at com.tns.Runtime.callJSMethodNative(Native Method)
System.err: 	at com.tns.Runtime.dispatchCallJSMethodNative(Runtime.java:1286)
System.err: 	at com.tns.Runtime.callJSMethodImpl(Runtime.java:1173)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1160)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1138)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1134)
System.err: 	at com.tns.NativeScriptActivity.onCreate(NativeScriptActivity.java:19)
System.err: 	at android.app.Activity.performCreate(Activity.java:7136)
System.err: 	at android.app.Activity.performCreate(Activity.java:7127)
System.err: 	at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1271)
System.err: 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2893)
System.err: 	... 11 more
```
