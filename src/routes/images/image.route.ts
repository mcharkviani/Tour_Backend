import { Router } from "express";
import { TourController } from "../../controllers/tour.controller";

const router: Router = Router();
const tourController: TourController = new TourController();

router.route('/image')
    .get(tourController.getImage);

export const imageRoutes: Router = router;