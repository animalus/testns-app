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
