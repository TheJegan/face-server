module.exports = function (grunt) {
  grunt.file.setBase(__dirname);

  grunt.initConfig({
    githooks: {
      all: {
        'pre-commit': 'test'
      }
    },
    clean: {
      dist: ['dist']
    },
    copy: {
      config: {
        files: [
          {
            expand: true,
            src: 'lib/**/*.js',
            dest: 'dist'
          }
        ]
      },
      html: {
        files: [
          {src: 'public/*', dest: 'dist/'}
        ]
      }
    },
    ts: {
      default: {
        tsconfig: true
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: [
          '**/*.ts',
          '!node_modules/**/*.ts',
          '!typings/**/*.ts',
          '!lib/**/*.ts'
        ]
      }
    },
    mochaTest: {
      test: {
        src: ['dist/test/**/*.js'],
        options: {
          clearRequireCache: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('build', ['ts', 'copy']);
  grunt.registerTask('test', ['clean', 'build', 'mochaTest']);
  grunt.registerTask('default', ['clean', 'build']);
};
