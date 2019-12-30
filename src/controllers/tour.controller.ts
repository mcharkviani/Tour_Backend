import { Files } from '../helpers/file';
import { Request, Response } from 'express';
import ContactService from '../services/tour.service.';
import * as Joi from '@hapi/joi';
import TourService from '../services/tour.service.';
import { tourSchema } from '../validators/tour.validator';
import { connection } from 'mongoose';

const tourService: TourService = new TourService();
export class TourController{

    public async getImage(req: Request, res: Response) {
        try {
            return res.writeHead(200, {
                'Content-Type': 'image/jpg'
            });
        } catch (err) {
            return res.status(404).json({message: 'not found', error: err})
        }
    }
    
    public async getTours (req: Request, res: Response) {
        try {
            const tours = await tourService.getAllTours();
            return res.status(200).json({message: 'success', data: tours})
        } catch (err) {
            return res.status(404).json({message: 'not found', error: err})
        }
    }
    public async getTour (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const tour = await tourService.getTour(id);
            if(tour === null)
                throw({type: 'Tour does not exist'});
            console.log(`id = ${id}, tour - ${tour}`);
            // return res.status(200).json({message: 'success', data: contact});
            return res.status(200).send(tour);
        } catch (err) {
            return res.status(404).json({message: 'not found', error: err})
        }
    }

    public async addNewTour (req: Request, res: Response) {
        console.log(`data - ${req.body.firstName}`)
        console.log(`files - ${req.files}`)
        try {
            const request: any = {
                company: req.body.company,
                email:req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                country: req.body.country,
                description: req.body.description,
                price: req.body.price,
                rating: req.body.rating,
                image: req.files
            }

            console.log(`request - ${request.image}`)

            const validation = tourSchema.validate(request);
            const {value, error} = validation;
            if (error) { 
                return res.status(422).json({ 
                  message: 'Invalid request', 
                  error: error.message
                }) 
            } else { 
                const newTour = await tourService.createTour(req.body, req.files); 
                return res.status(200).json({ message: 'Tour successfully created', data: newTour }) 
            } 
        } catch (error) {
            return res.status(404).json(error.message)
        }
    }


    public async updateTour(req: Request, res: Response) {
        try {
            const id = req.params.contactId;
            const request: any = {
                company: req.body.company,
                email:req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                country: req.body.country,
                description: req.body.description,
                price: req.body.price,
                rating: req.body.rating,
                image: req.files
            }

            const validation = tourSchema.validate(request);
            const {value, error} = validation;
            if (error) { 
                return res.status(422).json({ 
                  message: 'Invalid request', 
                  error: error.message
                }) 
              } else { 
                    const newTour = await tourService.updateTour(id, req.body, req.files); 
                    return res.status(200).json({ message: 'Tour successfully updated', data: newTour }) 
              } 
            // return res.status(200).send(newTour)
            // return res.status(200).json({message: 'success', data: newTour})
        } catch (err) {
            return res.status(404).json({message: 'not found', error: err})
        }
    }

    public async deleteTour (req: Request, res: Response) {
        try {
            const id = req.params.id;
            await tourService.deleteTour(id);
            return res.status(200).json({message: 'success', data: {}})
        } catch (err) {
            return res.status(404).json({message: 'not found', error: err})
        }
    }

}
