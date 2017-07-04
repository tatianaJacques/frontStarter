var appSrc  = 'app',
    appDest = 'build',
    bourbon = require('node-bourbon');

module.exports = {
  appSrc: appSrc,
  appDest: appDest,

  styles: {
    watchSrc: appSrc + '/assets/styles/**/*.scss',
    src: appSrc + '/assets/styles/app.scss',
    dest: appDest + '/css/',
    sassOpts: {
      includePaths: [
        bourbon.includePaths,
        'node_modules/foundation-sites/scss'
      ]
    },
    autoprefixerOpts: {
      browsers: ['last 2 versions', 'ie >= 10']
    }
  },

  scripts: {
    src: appSrc + '/assets/scripts/app.js',
    vendorSrc: [appSrc + '/assets/scripts/vendors/jquery-2.1.4.min.js', appSrc + '/assets/scripts/vendors/*.js'],
    dest: appDest + '/js/',
    modernizrOpts: {
      cache: true,
      options: ['setClasses', 'html5shiv'],
      tests: [
        "hashchange",
        "history",
        "inputtypes",
        "requestanimationframe",
        "svg",
        "backgroundsize",
        "bgsizecover",
        "placeholder",
        "localstorage",
        "svgasimg",
        "touchevents",
        "objectfit"
      ]
    }
  },

  twig: {
    src   : ['app/views/**/templates/**/*.+(html|twig)', '!app/views/**/templates/**/_*.+(html|twig)'],
    dist  : 'build/',
    base  : 'app/views/',
    watch : ['app/views/**/*.twig', 'app/datas/**/*.json']
  },

  iconfont: {
    src: appSrc + '/assets/icons/*.svg',
    dest: appSrc + '/assets/fonts/',
    fontSrc: appSrc + '/assets/fonts/icons.*',
    fontDest: appDest + '/fonts/',
    opts: {
      fontName: 'icons',
      path: appSrc + '/assets/styles/base/_icons-tpl.scss',
      targetPath: '../styles/base/_icons.scss',
      fontPath: '../fonts/'
    }
  },

  images: {
    src: appSrc + '/assets/img/**/*.{jpg,png,gif,svg}',
    dest: appDest + '/img/',
    opts: {
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }
  },

  copy: {
    src: [
      appSrc + '/favicon.ico',
      appSrc + '/views/*.json'
    ],
    dest: appDest
  },

  fonts: {
    src: appSrc + '/assets/fonts/*',
    dest: appDest + '/fonts/'
  },

  clean: {
    src: [
      appDest
    ]
  },

  browserSync: {
    server: {
      baseDir: appDest
    }
  }
};
