
function buildConfig(env) {
    // console.log('buildConfig', require('./webpackconf/' + env + '.js')(env));
    return require('./webpackenv/' + env + '.js')(env)
}

module.exports = buildConfig;

