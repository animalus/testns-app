# testns-app

This is a test Nativescript app for testing out certain things for upgrading to angular 9 using nativescript. This was generated from Nathan Walker's suggested work-around to the fact that NativeScript team is not merging the Ivy compatible code making upgrades to angular 9 problematic and less than ideal. That pull request with work-around code is found [here](https://github.com/NativeScript/nativescript-angular/pull/2124).

First off, it seems to be that everybody who contributed to the discussion on this pull request is by default an iOS person. Because after struggling for a while trying to get the work-around working for me, a default android developer using linux, I finally just decided to switch over to my MAC to try it out on iOS and it worked just as recorded. So that was a bit of a relief but not completely helpful in the long run. :)

Turns out that the main problem was the suggested flag `--env.aot`. If I remove that it works for me using linux/android. In addition, I don't seem to need it on the mac/ios either. So either, there is something in their test apps that need it that I'm not running into or it is not actually needed. In addition, the `--no-hmr` flag does not affect this test app. So the suggested method of running, namely`tns run android --env.aot --no-hmr` (technically the method was ios and not android but...), does not work for me with android. But if I simply do ...

```
tns run android
```

... it works.

UPDATE: I'm confused. Now I can get it to work with either the flag set OR the flag not set. But now I do have a proper ngcc.config.js file which I think needs to be both there for when you run an `npm i` AND run your own build? I don't know, but I did find it now necessary (for the nativescript-ui-sidedrawer) and now after getting it in place I can run with or without the aot flag.

What I **think** was happening before is at some point I had the ngcc.config file in there. Did a full clean so that npm reinstalled and then in testing thought I could remove it because my subsequent tests I think I didn't go back to a full clean again and thus thought it was unnecessary.

## What WAS happening when the --env.aot flag wasn't work for android was this

With the `--env.aot` flag I get the following error at compilation time ...

```
ERROR in node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directives.d.ts:79:22 - error NG6002: Appears in the NgModule.imports of AppModule, but could not be resolved to an NgModule class.

This likely means that the library (nativescript-ui-sidedrawer/angular) which declares NativeScriptUISideDrawerModule has not been processed correctly by ngcc, or is not compatible with Angular Ivy. Check if a newer version of the library is available, and update if so. Also consider checking with the library's authors to see if the library is expected to be compatible with Ivy.

79 export declare class NativeScriptUISideDrawerModule {
```

... and no addition of an `ngcc.config.js` file fixes the problem. NOTE: **No** `ngcc.config.js` file is currently needed in this test app (not even for the `nativescript-ui-sidedrawer` plugin), if the `--env.aot` flag is **not** set. The file I did try is in the repo but disabled by being renamed `ngcc.config.DISABLED.js`.

## Ivy-less

Go Ivy-less by adding the following to the tns.config.json file...

```
    "angularCompilerOptions": {
        "enableIvy": false
    }
```

... and then it **works** with the `--env.aot` flag but does _not_ work without it. i.e. the opposite of with Ivy. Without it I get...

```
System.err: An uncaught Exception occurred on "main" thread.
System.err: Unable to start activity ComponentInfo{org.nativescript.nativescriptivy/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: Error: Can't resolve all parameters for ApplicationModule: (?).
System.err:
System.err: StackTrace:
System.err: java.lang.RuntimeException: Unable to start activity ComponentInfo{org.nativescript.nativescriptivy/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: Error: Can't resolve all parameters for ApplicationModule: (?).
System.err: 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3555)
System.err: 	at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3707)
System.err: 	at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:83)
System.err: 	at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:135)
System.err: 	at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:95)
System.err: 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2220)
System.err: 	at android.os.Handler.dispatchMessage(Handler.java:107)
System.err: 	at android.os.Looper.loop(Looper.java:237)
System.err: 	at android.app.ActivityThread.main(ActivityThread.java:8016)
System.err: 	at java.lang.reflect.Method.invoke(Native Method)
System.err: 	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493)
System.err: 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1076)
System.err: Caused by: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: Error: Can't resolve all parameters for ApplicationModule: (?).
System.err: 	at com.tns.Runtime.callJSMethodNative(Native Method)
System.err: 	at com.tns.Runtime.dispatchCallJSMethodNative(Runtime.java:1286)
System.err: 	at com.tns.Runtime.callJSMethodImpl(Runtime.java:1173)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1160)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1138)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1134)
System.err: 	at com.tns.NativeScriptActivity.onCreate(NativeScriptActivity.java:19)
System.err: 	at android.app.Activity.performCreate(Activity.java:7957)
System.err: 	at android.app.Activity.performCreate(Activity.java:7946)
System.err: 	at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1307)
System.err: 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3530)
System.err: 	... 11 more
```

## Other Issues/Observations

### entryComponents in Ivy not needed?

In my test here of one dialog component I'm going to postulate that Ivy doesn't seem to need entryComponents defined in the module? If I don't declare ConfirmDialog in the app module nor declare it an entryComponent the app still works fine! But without Ivy it errors with either ...

```
System.err: An uncaught Exception occurred on "main" thread.
System.err: Unable to start activity ComponentInfo{org.nativescript.nativescriptivy/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: Error: Can't resolve all parameters for ApplicationModule: (?).
System.err:
System.err: StackTrace:
System.err: java.lang.RuntimeException: Unable to start activity ComponentInfo{org.nativescript.nativescriptivy/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: Error: Can't resolve all parameters for ApplicationModule: (?).
System.err: 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3555)
System.err: 	at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3707)
System.err: 	at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:83)
System.err: 	at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:135)
System.err: 	at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:95)
System.err: 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2220)
System.err: 	at android.os.Handler.dispatchMessage(Handler.java:107)
System.err: 	at android.os.Looper.loop(Looper.java:237)
System.err: 	at android.app.ActivityThread.main(ActivityThread.java:8016)
System.err: 	at java.lang.reflect.Method.invoke(Native Method)
System.err: 	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493)
System.err: 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1076)
System.err: Caused by: com.tns.NativeScriptException: Calling js method onCreate failed
System.err: Error: Can't resolve all parameters for ApplicationModule: (?).
System.err: 	at com.tns.Runtime.callJSMethodNative(Native Method)
System.err: 	at com.tns.Runtime.dispatchCallJSMethodNative(Runtime.java:1286)
System.err: 	at com.tns.Runtime.callJSMethodImpl(Runtime.java:1173)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1160)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1138)
System.err: 	at com.tns.Runtime.callJSMethod(Runtime.java:1134)
System.err: 	at com.tns.NativeScriptActivity.onCreate(NativeScriptActivity.java:19)
System.err: 	at android.app.Activity.performCreate(Activity.java:7957)
System.err: 	at android.app.Activity.performCreate(Activity.java:7946)
System.err: 	at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1307)
System.err: 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3530)
System.err: 	... 11 more
```

or

```
ERROR in Cannot determine the module for class ConfirmDialog in /home/ken/dev/animalus/test/testns-app/src/services/confirm.dialog.ts! Add ConfirmDialog to the NgModule to fix it.
```

... depending on whether or not `--env.aot` is set. The former being without.

### Something else I ran into at some point

Some other issues I got along the way in various test incarnations of settings was the following:

```
ERROR in The target entry-point "side-drawer-directives" has missing dependencies:
 - ./..
```

github user `kmmccafferty96` pointed me to this [post](https://github.com/NativeScript/nativescript-ui-feedback/issues/1355#issuecomment-585782902). Whice led me to edit the `node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directive.js` and `node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directive.d.ts` and replacing all (2 in each) occurrences of "./.." with "nativescript-ui-sidedrawer"

When I did that I got the same error as above (i.e. same error that I get when I turn on the `--env.aot` flag).
