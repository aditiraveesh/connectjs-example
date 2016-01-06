module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: 'potato',
                    keepalive: true,
                    open: true,
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                        return middlewares;
                    }
                },
                proxies: [
                    {
                        context: '/remote/',
                        host: 'tomato',
                        port: 3001,
                        changeOrigin: true
                    }
                ],
            },
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'configureProxies:server',
            'connect:server',
        ]);
    });
};

