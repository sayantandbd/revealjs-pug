module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    assemble: {
      options: {
        flatten: true,
        layoutdir: 'layouts',
        layoutext: '.hbs',
        layout: 'main'
      },
      site: {
        files: [{
            cwd: './decks',
            dest: './dist',
            expand: true,
            src: ['**/*.hbs']
        }]
      }
    },

    copy: {
      main: {
        cwd: 'node_modules/reveal.js/', 
        src: ['**'],
        expand: true,
        dest: 'dist/assets/reveal.js/',
      },
      assets: {
        cwd: 'assets/', 
        src: ['**'],
        expand: true,
        dest: 'dist/assets/',
      },
    },

    run: {
      options: {
        itterable: true
      },
      main: {
        cmd: 'node',
        args: [
          'main.js'
        ]
      }
    }
  });

  // Load the Assemble plugin.
  grunt.loadNpmTasks('assemble');

  // The default task to run with the `grunt` command.
  grunt.registerTask('default', ['run','assemble','copy']);

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-run');
};
