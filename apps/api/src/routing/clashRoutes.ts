import { formatError, imageValidator, removeImage, uploadImage } from "../helper.js";
import { clashSchema } from "../validations/clashValidation.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { FileArray, UploadedFile } from "express-fileupload";
import { Router, Request, Response } from "express";
import prisma from "../config/prisma.js";
import { ZodError } from "zod";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const clashs = await prisma.clash.findMany({
            where: { user_id: req.user?.id }
        });

        return res.json({ message: "Data Fetched", data: clashs });

    } catch (error) {

        console.log("The error is ", error);

        res.status(500).json({ error: "Something Went Wrong.", data: error });

    }

});

router.get("/:id", authMiddleware, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const { id } = req.params;

        const clash = await prisma.clash.findUnique({
            where: { id: Number(id) },
            include: {
                ClashItem: {
                    select: {
                        image: true,
                        id: true,
                        count: true
                    }
                },
                ClashComments: {
                    select: {
                        id: true,
                        comment: true,
                        created_at: true
                    },
                    orderBy: {
                        id: "desc"
                    }
                }
            }
        });

        return res.json({ message: "Data Fetched", data: clash });

    } catch (error) {

        console.log("The error is ", error);

        res.status(500).json({ error: "Something Went Wrong.", data: error });

    }

});

router.post("/", authMiddleware, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const body = req.body;

        const payload = clashSchema.parse(body);

        if (req.files?.image) {

            const image: UploadedFile = req.files.image as UploadedFile;

            const validMsg = imageValidator(image?.size, image?.mimetype);

            if (validMsg) {

                return res.status(422).json({ errors: { image: validMsg } });

            }

            payload.image = uploadImage(image);

        } else {

            return res.status(422).json({ errors: { image: "Image field is required." } });

        }

        await prisma.clash.create({
            data: {
                title: payload.title,
                description: payload?.description,
                image: payload?.image,
                user_id: req.user?.id!,
                expire_at: new Date(payload.expire_at)
            }
        });

        return res.json({ message: "Clash Created Successfully!", data: payload });

    } catch (error) {

        console.log("The error is ", error);

        if (error instanceof ZodError) {

            const errors = formatError(error);

            res.status(422).json({ message: "Invalid data", errors });

        }

    }

});

router.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const { id } = req.params;

        const body = req.body;

        const payload = clashSchema.parse(body);

        if (req.files?.image) {

            const image: UploadedFile = req.files.image as UploadedFile;

            const validMsg = imageValidator(image?.size, image?.mimetype);

            if (validMsg) {

                return res.status(422).json({ errors: { image: validMsg } });

            }

            const clash = await prisma.clash.findUnique({
                select: { id: true, image: true },
                where: { id: Number(id) }
            });

            if (clash?.image) removeImage(clash?.image);

            payload.image = uploadImage(image);

        }

        await prisma.clash.update({
            where: { id: Number(id) },
            data: {
                ...payload,
                expire_at: new Date(payload.expire_at)
            }
        });

        return res.json({ message: "Clash Updated Successfully!", data: payload });

    } catch (error) {

        console.log("The error is ", error);

        if (error instanceof ZodError) {

            const errors = formatError(error);

            res.status(422).json({ message: "Invalid data", errors });

        }

    }

});

router.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const { id } = req.params;

        const clash = await prisma.clash.findUnique({
            select: { image: true, user_id: true },
            where: { id: Number(id) }
        });

        if (clash.user_id !== req.user?.id) {

            return res.status(401).json({ message: "Un Authorized" });

        }

        if (clash.image) removeImage(clash.image);

        const clashItems = await prisma.clashItem.findMany({
            select: {
                image: true,
            },
            where: {
                clash_id: Number(id)
            }
        });

        if (clashItems.length > 0) {

            clashItems.forEach((item) => {

                removeImage(item.image);

            });

        }

        await prisma.clash.delete({
            where: { id: Number(id) }
        });

        return res.json({ message: "Clash Deleted Successfully!" });

    } catch (error) {

        console.log("The error is ", error);

        res.status(500).json({ error: "Something Went Wrong.", data: error });

    }

});

router.post("/items", authMiddleware, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const { id } = req.body;

        const files: FileArray | null = req.files;

        let imgErros: Array<string> = [];

        const images = files?.["images[]"] as UploadedFile[];

        if (images.length >= 2) {

            images.map((img) => {

                const validMsg = imageValidator(img?.size, img?.mimetype);

                if (validMsg) {

                    imgErros.push(validMsg);

                }

            });

            if (imgErros.length > 0) {

                return res.status(422).json({ errors: imgErros });

            }

            let uploadedImages: string[] = [];

            images.map((img) => {

                uploadedImages.push(uploadImage(img));

            });

            uploadedImages.map(async (item) => {
                await prisma.clashItem.create({
                    data: {
                        image: item,
                        clash_id: Number(id)
                    }
                });
            });

            return res.json({ message: "Clash Items Updated Successfully!" });

        }

        return res.status(404).json({ message: "Please select at least 2 images for clashing." });

    } catch (error) {

        console.log("The error is ", error);

        return res.status(500).json({ message: "Something Went Wrong..." });

    }

});

export default router;