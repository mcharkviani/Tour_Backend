import { Router } from "express";
import { TourController } from "../../controllers/tour.controller";

const router: Router = Router();
const tourController: TourController = new TourController();

router.route('/')
    .get(tourController.getTours)
    .post(tourController.addNewTour);


router.route('/:id')
    .get(tourController.getTour)
    .put(tourController.updateTour)
    .delete(tourController.deleteTour);


export const tourRoutes: Router = router;