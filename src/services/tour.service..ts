import Tour  from '../models/tour.model';
import * as fileUpload from 'express-fileupload';
import { Files } from '../helpers/file';
import { json } from 'body-parser';

class TourService {

    public async getAllTours () {
        return await Tour.find({});
    }

    public async getTour(id: string) {
        return await Tour.findById(id);
    }

    public async createTour (data: any, files: any) {
        console.log(`files in service - ${files}`)
        if (files) {
            if (files.image) {
                try {
                    const image = await Files.uploadFile('tours', files.image);
                    data['image'] = image;
                    console.log(`image - ${image}`);
                } catch(err) {
                    throw({type: "ERROR", error: err, statusCode: 400});
                }
            }
        }
        return await Tour.create(data);
    }

    public async updateTour(id: string, data: any, files: any) {
        const tour = await this.getTour(id);
        if(tour === null)
            throw({type: 'Tour does not exist'});

        const tourToString = JSON.parse(JSON.stringify(tour));
        
        if (files) {
            if (files.image) {
                try {
                    const image = await Files.uploadFile('tours', files.image);
                    data['image'] = image;
                    if (image != tourToString['image']) {
                        await Files.deleteFile('tours', tourToString['image']);
                        console.log('Old image deleted');
                    }
                    console.log(`image - ${image}`);
                } catch(err) {
                    throw({type: "ERROR", error: err, statusCode: 400});
                }
            }
        }

        return await Tour.findOneAndUpdate({_id: id}, data, {new: true});
    }

    public async deleteTour (id: string) {
        const tour = await this.getTour(id);
        console.log(`tour - ${tour}`)
        if(tour === null)
            throw({type: 'Tour does not exist'});
        
        const tourToString = JSON.parse(JSON.stringify(tour));

        if(tourToString['image']) {
            try {
                await Files.deleteFile('tours', tourToString['image']);
                console.log('Image deleted');
            } catch (err) {
                console.log('image did not delete');
                throw({type: 'Error', error: err})
            }
        }

        return await Tour.findByIdAndDelete(id);
    }

}

export default TourService;
