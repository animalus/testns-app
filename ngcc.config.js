module.exports = {
    packages: {
        "@nativescript/angular": {
            entryPoints: {
                ".": {
                    override: {
                        main: "./index.js",
                        typings: "./index.d.ts"
                    },
                    ignoreMissingDependencies: true
                }
            }
        },
        "nativescript-ui-sidedrawer": {
            entryPoints: {
                angular: {
                    override: {
                        main: "./side-drawer-directives.js",
                        typings: "./side-drawer-directives.d.ts"
                    },
                    ignoreMissingDependencies: true
                }
            }
        }
    }
};
