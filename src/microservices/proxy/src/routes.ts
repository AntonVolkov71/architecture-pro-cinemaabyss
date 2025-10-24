import {NextFunction, Request, Response, Router} from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';
import Config from "./config";

enum Resources {
    MOVIES = 'movies',
    EVENTS = 'events'
}

const router = Router();

router.use((req: Request, res: Response, next) => {
    const originalUrl = req.originalUrl;
    let redirectUrl = Config.monolithUrl()

    if (!Config.gradualMigration()) {
        return proxy(req, res, next, redirectUrl)
    }

    if (routedToNewService()) {
        if (originalUrl.toLowerCase().includes(Resources.MOVIES)) {
            console.info("Redirect to movies");
            redirectUrl = Config.moviesServiceUrl();
        }
    }
    
    if (originalUrl.toLowerCase().includes(Resources.EVENTS)) {
        console.info("Redirect to events");
        redirectUrl = Config.eventServiceUrl();
    }

    console.info("redirect URL:", redirectUrl)

    return proxy(req, res, next, redirectUrl)
});

function routedToNewService(): boolean {
    return Math.random() * 100 < Config.moviesMigrationPercent();
}

function proxy(req: Request, res: Response, next: NextFunction, redirectUrl: string) {
    const dynamicProxy = createProxyMiddleware({
        target: redirectUrl,
        changeOrigin: true,
        pathRewrite: (path, req: Request) => req.originalUrl,
    });

    return dynamicProxy(req, res, next);
}

export default router;