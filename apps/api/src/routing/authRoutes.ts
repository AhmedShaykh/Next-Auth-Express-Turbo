import { loginSchema, registerSchema } from "../validations/authValidation.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";
import { Router, Response, Request } from "express";
import { formatError } from "../helper.js";
import prisma from "../config/prisma.js";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", authLimiter, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const body = req.body;

        const payload = registerSchema.parse(body);

        let user = await prisma.user.findUnique({
            where: { email: payload.email }
        });

        if (user) {

            return res.status(422).json({
                errors: {
                    email: "Email already taken! please use another one."
                }
            });

        }

        const salt = await bcrypt.genSalt(10);

        payload.password = await bcrypt.hash(payload.password, salt);

        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password
            }
        });

        return res.json({ message: "User Created Successfully!" });

    } catch (error) {

        console.log("The error is ", error);

        if (error instanceof ZodError) {

            const errors = formatError(error);

            res.status(422).json({ message: "Invalid data", errors });

        }

        return res.status(500).json({ error: "Something went wrong.please try again!", data: error });

    }

});

router.post("/login", authLimiter, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const body = req.body;

        const payload = loginSchema.parse(body);

        let user = await prisma.user.findUnique({
            where: { email: payload.email }
        });

        if (!user) {

            return res.status(404).json({ message: "No user found with this email." });

        }

        const compare = await bcrypt.compare(payload.password, user.password);

        if (!compare) {

            return res.status(422).json({
                errors: {
                    email: "Invalid Credentials."
                }
            });

        }

        const JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: "365d"
        });

        const resPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            token: `Bearer ${token}`
        };

        return res.json({
            message: "Logged In Successfully!",
            data: resPayload
        });

    } catch (error) {

        console.log("The error is ", error);

        if (error instanceof ZodError) {

            const errors = formatError(error);

            res.status(422).json({ message: "Invalid login data", errors });

        }

    }

});

router.post("/check/login", authLimiter, async (req: Request, res: Response): Promise<void | any> => {

    try {

        const body = req.body;

        const payload = loginSchema.parse(body);

        let user = await prisma.user.findUnique({
            where: { email: payload.email }
        });

        if (!user) {

            return res.status(422).json({
                errors: {
                    email: "No user found with this email."
                }
            });

        }

        if (!bcrypt.compareSync(payload.password, user.password)) {

            return res.status(422).json({
                errors: {
                    email: "Invalid Credentials."
                }
            });

        }

        return res.json({
            message: "Logged In Successfully!",
            data: null
        });

    } catch (error) {

        console.log("The error is ", error);

        if (error instanceof ZodError) {

            const errors = formatError(error);

            res.status(422).json({ message: "Invalid login data", errors });

        }

    }

});

router.get("/user", authMiddleware, async (req: Request, res: Response): Promise<any> => {

    const user = req.user;

    return res.json({ message: "Fetched User", user });

});

export default router;