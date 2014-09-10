module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        style: "expanded"
      },

      frame: {
        files: [{
          'build/frame/total.css': 'src/frame/styles/total.scss',
        }]
      },

      ext: {
        files: [{
          'build/ext-css.css': 'src/ext-css.scss',
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },

      frameScss: {
        files: ['src/frame/styles/**/*.scss'],
        tasks: ['sass:frame'],
      },

      extScss: {
        files: ['ext-css.scss'],
        tasks: ['sass:ext']
      },

      frameHtml: {
        files: 'src/frame/index.html',
        tasks: ['copy:frameHtml']
      },

      extJs: {
        files: 'src/ext.js',
        tasks: ['copy:extJs']
      },

      frameJs: {
        files: ['src/frame/scripts/**/*.js', 'src/frame/scripts/**/*.hbs'],
        tasks: ['browserify'],
      }
    },

    copy: {
      frameHtml: {
        src: 'src/frame/index.html',
        dest: 'build/frame/index.html'
      },

      extJs: {
        src: 'src/ext.js',
        dest: 'build/ext.js'
      }
    },

    browserify: {
      options: {
        debug: true,
        transform: ['hbsfy']
      },

      dev: {
        src:['src/frame/scripts/main.js', 'src/frame/scripts/**/*.hbs'],
        dest: 'build/frame/main.js'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['copy', 'sass', 'browserify', 'watch']);
};