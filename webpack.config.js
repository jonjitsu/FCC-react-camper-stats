var path = require('path');

module.exports = {
    context: __dirname,
    entry: [
      './src/main.js',
      'file?name=index.html!jade-html!./src/index.jade'
    ],
    output: {
        path: './build/dev',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    plugins:[],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                  path.resolve(__dirname, "src")
                ],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.scss$/, exclude: /node_modules/, loader:'style!css!sass' },
            { test: /\.css$/, loader: "style!css" }
            // { test: /\.css$/, loader: "style-loader!css-loader" }
            // { test: /\.jade$/, loader:'jade' }
        ]
    }
}
