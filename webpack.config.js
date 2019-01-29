const path = require('path');

module.exports = {
    entry: './index.jsx',
    output:{
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    //devtool: '#eval-source-map',
    
    
    plugins: [
        
        
    ],
    module:{
        rules:[{
            test: /\.jsx?$/,
            use:[{                
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                options: {
                    presets: ['es2015','react']
                }
            }],
            exclude: /(node_modules|bower_components)/
        }]
    }

}