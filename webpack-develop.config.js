const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const config = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/app.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /tailwind.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                tailwindcss("./tailwind-develop.config.js"),
                                autoprefixer
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: [
                                    "src/styles"
                                ]
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash].[ext]",
                            outputPath: "assets/",
                            publicPath: "assets/"
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: false,
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/public",
                    to: "assets"
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css",
            chunkFilename: "[name]-[hash].css"
        })
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier()
                            .split("/")
                            .reduceRight(item => item)
                            .replace(/.(js)|(css)/, "")
                            .replace(".", "-")
                            .replace(/ /g, "");
                        const allChunksNames = chunks.map((item) => item.name)
                            .join("-")
                            .replace(/ /g, "-");
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@configs": path.resolve(__dirname, "src/configs"),
            "@utils": path.resolve(__dirname, "src/utils")
        },
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "[name]-[hash].js",
        chunkFilename: "[name]-[hash].js",
        path: path.resolve(__dirname, "dist")
    }
};

if (fs.existsSync("./src/assets/favicon.png")) {
    config.plugins = [
        ...config.plugins,
        new FaviconsWebpackPlugin({
            logo: "./src/assets/favicon.png"
        })
    ]
}

module.exports = config;
