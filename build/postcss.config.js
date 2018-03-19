module.exports = {
    // parser: 'sugarss',
    // sourceMap: true,
    ident: 'postcss',
    plugins: (loader) => [
        require('autoprefixer')({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ]
        })
    ]

    // plugins: {
    //   'postcss-import': {},
    //   'postcss-cssnext': {},
    //   'cssnano': {}
    // }
}