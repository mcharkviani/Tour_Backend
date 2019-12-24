import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

export class Files {

    static async uploadFile (folder: string, image: any) {
        const extension = path.extname(image.name);
        let baseName = path.basename(image.name);
        baseName = baseName.slice(0, baseName.lastIndexOf('.'));
        console.log(baseName)

        const fileName = `${Date.now()}_${baseName}${extension}`;
        console.log(`fileName - ${fileName}`);
        

        const result = await image.mv(`./src/public/uploads/${folder}/${fileName}`)
        .then(() => {
            console.log('File uploaded');
            return `${__dirname}/${folder}/${fileName}`;
        }).catch((err: Error) => {
            console.log('File did not upload');
            return('File did not upload')
        });
        return result;
    }

    static async deleteFile(folder: string, path: string) {
        const image = path.slice(Math.max(0, path.lastIndexOf('/')));
        const result = fs.unlink(`${__dirname}/${folder}/${image}`, function(err) {
            if (err) {
                return "Error";
            } else {
                return "Ok";
            }
        });
        return result;
    }

}