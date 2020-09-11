module.exports = {
    purge: {
        enabled: true,
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
