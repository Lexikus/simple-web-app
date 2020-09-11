module.exports = {
    purge: {
        enabled: false,
        content: [
            "./**/*.html",
            "./**/*.js",
            "./**/*.ts"
        ]
    },
    theme: {
        extend: { },
    },
    variants: { },
    plugins: [],
    future: {
        removeDeprecatedGapUtilities: true,
    }
}
