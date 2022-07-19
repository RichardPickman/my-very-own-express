const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];

            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    
                    handler(req, res);
                });
            });
        });
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = "";
        
            req.on('data', (chunk) => {
                body += chunk;
            });
        
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }

                this.middlewares.forEach((func) => func(req, res));
                const emit = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res);
                
                if (!emit) {
                    res.end();
                }
            });
        });
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}
