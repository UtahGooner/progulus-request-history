import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'node:path';
import process from "node:process";

export default merge(common, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        historyApiFallback: true,
        static: [
            {directory: path.join(process.cwd(), 'public'), watch: false},
            {directory: process.cwd(), watch: false}
        ],
        hot: true,
        watchFiles: 'src/**/*',
        proxy: [
            {context: '/api', target: 'https://progulus.com', changeOrigin: true},
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        // new BundleAnalyzerPlugin(),
    ]
});
