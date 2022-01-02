const { rmSync } = require('fs');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.post('/my/courses/:cid/progress/:aid', (req, res) => {
    console.log(req.params);
    res.status(200);
    res.send();
});

server.post('/my/courses/:id/enroll', (req, res) => {
    const courses = router.db.get(`courses`).value();
    console.log(req.params.id);
    console.log(courses.map((course) => {
        if (course.id === +req.params.id)
            course.users = [ 1 ];
        return course;
    }));
    router.db.set(`courses`, courses.map((course) => {
        if (course.id === req.params.id)
            course.users = [ 1 ];
        return course;
    }));
    router.db.write();
    res.send('OK'); 
});

server.use((req, res, next) => {
    const field = require('url').parse(req.originalUrl, true).query['attachtrue']
    if (field && req.method === 'POST') {
        if (!typeof req.body === 'object')
            req.body = {};
        req.body[field] = true;
    }
    next();
});
server.use((req, res, next) => {
    const _send = res.send
    res.send = function (body) {
      if (require('url').parse(req.originalUrl, true).query['singular']) {
        try {
			const json = JSON.parse(body)
			if (Array.isArray(json)) {
				if (json.length === 1) {
				return _send.call(this, JSON.stringify(json[0]))
				} else if (json.length === 0) {
				return _send.call(this, '{}', 404)
				}
			}
        } catch (e) {}
      }
      return _send.call(this, body)
    }
    next()
});
server.use((req, res, next) => {
    const _send = res.send;
    res.send = function (body) {
        const field = require('url').parse(req.originalUrl, true).query['_singularize'];
        if (field) {
            try {
                const json = JSON.parse(body);
                const val = json[field];
                if (Array.isArray(val)) {
                    json[field] = val.length > 0 ? val[0] : {};
                    return _send.call(this, JSON.stringify(json));
                }
            } catch (e) {}
        }
        return _send.call(this, body);
    };
    next();
});
server.use(jsonServer.rewriter({
    "/courses/:id": "/courses/:id?_expand=instructor&_embed=activities&_embed=progress&_singularize=progress",
    "/courses/:cid/activities/:aid/content": "/content?courseId=:cid&activityId=:aid&singular=1",
    "/my/user": "/users/1?_embed=courses",
    "/courses/:cid/activities/:aid": "/activities/:aid"
}));
server.use(router);
server.listen(2000, () => {
 	console.log('JSON Server is running')
})