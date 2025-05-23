import prisma from "./config/prisma.js";
import { Server } from "socket.io";

export function setupSocket(io: Server) {

    io.on("connection", (socket) => {

        console.log("A User Connected:", socket.id);

        socket.on("disconnect", () => {

            console.log("A user disconnected:", socket.id);

        });

        socket.onAny(async (eventName: string, data: any) => {

            if (!data) {

                console.warn(`Received event "${eventName}" with no data`);

                return;

            }

            if (eventName.startsWith("clashing-")) {

                try {

                    if (!data?.clashItemId || !data?.clashId) {

                        throw new Error("Missing clashItemId or clashId");

                    }

                    await prisma.clashItem.update({
                        where: {
                            id: Number(data.clashItemId)
                        },
                        data: {
                            count: {
                                increment: 1
                            }
                        }
                    });

                    socket.broadcast.emit(`clashing-${data.clashId}`, data);

                } catch (error) {

                    console.error("Error updating clashItem count:", error);

                }

            } else if (eventName.startsWith("clashing_comment")) {

                try {

                    if (!data?.comment || !data?.id) {

                        throw new Error("Missing comment or id");

                    }

                    await prisma.clashComments.create({
                        data: {
                            comment: data.comment,
                            clash_id: Number(data.id)
                        }
                    });

                    socket.broadcast.emit(`clashing_comment-${data.id}`, data);

                } catch (error) {

                    console.error("Error creating clash comment:", error);

                }

            }

        });

    });

};