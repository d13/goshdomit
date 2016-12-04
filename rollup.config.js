export default {
    entry: 'index.js',
    format: 'es',
    moduleName: 'goshdomit',
    targets: [
        { dest: 'build/goshdomit.cjs.js', format: 'cjs' },
        { dest: 'build/goshdomit.umd.js', format: 'umd' },
        { dest: 'build/goshdomit.es.js', format: 'es' }
    ]
};