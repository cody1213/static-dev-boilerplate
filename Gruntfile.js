module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'jade',
                    src: ["*.jade"],
                    dest: 'www',
                    ext: '.html'
                }]
            }
        },
        less: {
            development: {
                options: {
                    paths: ["www/assets/styles"],
                    yuicompress: false
                },
                files: {
                    "www/assets/styles/css/style.css": "less/style.less"
                }
            }
        },
        watch: {
            jade: {
                files: ['jade/**/*.jade'],
                tasks: ['jade']
            },
            less: {
                files: ['www/assets/styles/less/*.less', 'less/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', 'watch');

};