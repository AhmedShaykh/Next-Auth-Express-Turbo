import { supportedMimes } from "./config/filesystem.js";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import fs from "fs";

export const formatError = (error: ZodError): any => {

    let errors: any = {};

    error.errors?.map((issue) => {

        errors[issue.path?.[0]] = issue.message;

    });

    return errors;

};

export const imageValidator = (size: number, mime: string) => {

    if (bytesToMb(size) > 2) {

        return "Image size must be less than 2 MB";

    } else if (!supportedMimes.includes(mime)) {

        return "Image must be type of png,jpg,jpeg,svg,webp,gif..";

    }

    return null;

};

export const bytesToMb = (bytes) => {

    return bytes / (1024 * 1024);

};

export const generateRandomNum = () => {

    return uuidv4();

};

export const removeImage = (imageName: string) => {

    const path = process.cwd() + "/public/images/" + imageName;

    if (fs.existsSync(path)) {

        fs.unlinkSync(path);

    }

};

export const uploadImage = (image: UploadedFile) => {

    const imgExt = image?.name.split(".");

    const imageName = generateRandomNum() + "." + imgExt[1];

    const uploadPath = process.cwd() + "/public/images/" + imageName;

    image.mv(uploadPath, (err) => {

        if (err) throw err;

    });

    return imageName;

};