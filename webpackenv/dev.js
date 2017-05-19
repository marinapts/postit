const path = require('path')
const webpack = require('webpack');
const util = require('util');

module.exports = function (env) {
    return {
        entry: {
            app: './app/app.jsx'
        },
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery'
            }),

        ],
        output: {
            path: path.resolve(__dirname,'.././public/'),
            filename: 'bundle.js'
        },
        resolve: {
            alias: {

                // Libraries
                JqueryValidate: path.resolve(__dirname,'.././app/js/jquery.validate.min.js'),
                Materialize: path.resolve(__dirname,'.././app/js/materialize.min.js'),
                Interact: path.resolve(__dirname,'.././app/js/interact.min.js'),

                // Components
                Dashboard: path.resolve(__dirname,'.././app/components/Dashboard.jsx'),
                Navbar: path.resolve(__dirname,'.././app/components/Navbar.jsx'),

                app: path.resolve(__dirname,'.././app/'),

            },
            extensions: ['.js', '.jsx', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                          presets: ['react', 'es2015', 'stage-3'],
                        }
                    }],
                },
         
            // Loaders for other file types can go here

            // load materialize fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader?limit=800000!name=public/fonts/roboto/[name].[ext]',
                }],      
            }
          ]
        },

        devtool: 'cheap-module-eval-source-map'       // for deployment - faster building
    }
};