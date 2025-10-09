import { Router, Request, Response } from 'express';
import Config from "./config";

const router = Router();

// enum Resources {
//     MOVIES='movies'
// }

router.get('/:resource', (req: Request, res: Response) => {
    const resource = req.params.resource;
    console.log('resource',resource)
    const urlMovies= Config.moviesServiceUrl()

    res.redirect(urlMovies)
    // switch (resource) {
    //     case Resources.MOVIES:
    //         proxyMovies(req,res )
    //         break
    // }
    // const data = {
    //     data: "hello"
    // }
    //
    // res.json(data);
});

// function proxyMovies(req: Request, res: Response){
//     res.redirect(urlMovies)
// }

export default router;