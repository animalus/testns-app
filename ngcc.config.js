module.exports = {
    packages: {
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
