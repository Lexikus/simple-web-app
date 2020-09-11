// to add libraries to global scope in the webpack config a ProvidePlugin is required.
// Example:
// {
//    ...
//    plguins: [
//         ...,
//         new webpack.ProvidePlugin({
//             $: 'jquery',
//             jQuery: 'jquery'
//         })
//    ],
//    ...
// }