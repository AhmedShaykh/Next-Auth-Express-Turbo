"use client";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { getImageUrl } from "@/lib/utils";
import { ClashType } from "@/lib/types";
import { ThumbsUp } from "lucide-react";
import CountUp from "react-countup";
import socket from "@/lib/socket";
import Image from "next/image";
import { toast } from "sonner";

const Clashing = ({ clash }: { clash: ClashType }) => {

    const [hideVote, setHideVote] = useState(false);

    const [clashItems, setClashItems] = useState(clash.ClashItem);

    const [clashComments, setClashComments] = useState(clash.ClashComments);

    const [comment, setComment] = useState("");

    const handleVote = (id: number) => {

        if (clashItems) {

            setHideVote(true);

            updateCounter(id);

            socket.emit(`clashing-${clash.id}`, {
                clashId: clash.id,
                clashItemId: id
            });

        }

    };

    const updateCounter = (id: number) => {

        if (clashItems) {

            const items = [...clashItems];

            const findIndex = clashItems.findIndex((item) => item.id === id);

            if (findIndex !== -1) {

                items[findIndex].count += 1;

            }

            setClashItems(items);

        }

    };

    const updateComment = (payload: any) => {

        if (clashComments && clashComments.length > 0) {

            setClashComments([payload, ...clashComments!]);

        } else {

            setClashComments([payload]);

        }

    };

    const handleSubmit = (event: FormEvent) => {

        event.preventDefault();

        if (comment.length > 2) {

            const payload = {
                id: clash.id,
                comment: comment,
                created_at: new Date().toDateString()
            };

            socket.emit(`clashing_comment-${clash.id}`, payload);

            updateComment(payload);

            setComment("");

        } else {

            toast.warning("Please type at least 2 words 😊");

        }

    };

    useEffect(() => {

        socket.on(`clashing-${clash.id}`, (payload) => {

            updateCounter(payload?.clashItemId);

        });

        socket.on(`clashing_comment-${clash.id}`, (payload) => {

            updateComment(payload);

        });

    }, []);

    return (
        <div className="mt-10">
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
                {clashItems && clashItems.length > 0 &&
                    clashItems.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                                    <div className="w-full flex justify-center items-center  p-2 h-[300px]">
                                        <Image
                                            className="w-full h-[300px] object-contain rounded-xl"
                                            src={getImageUrl(item.image)}
                                            alt="preview-1"
                                            width={500}
                                            height={500}
                                        />
                                    </div>

                                    {hideVote ? (
                                        <CountUp
                                            className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                                            end={item.count}
                                            duration={5}
                                            start={0}
                                        />
                                    ) : (
                                        <Button
                                            onClick={() => { handleVote(item.id); }}
                                            className="mt-6"
                                        >
                                            <span className="mr-2 text-lg">Vote</span> <ThumbsUp />
                                        </Button>
                                    )}
                                </div>

                                {index % 2 === 0 && (
                                    <div className="flex w-full lg:w-auto justify-center items-center">
                                        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                                            VS
                                        </h1>
                                    </div>
                                )}
                            </Fragment>
                        );
                    })}
            </div>

            <form className="mt-4 w-full" onSubmit={handleSubmit}>
                <Textarea
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type your suggestions 😊"
                    value={comment}
                />

                <Button className="w-full my-5">
                    Submit Comment
                </Button>
            </form>

            <div className="mt-4">
                {clashComments && clashComments.length > 0 &&
                    clashComments.map((item, index) => (
                        <div
                            className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4"
                            key={index}
                        >
                            <p className="font-bold">
                                {item.comment}
                            </p>

                            <p>
                                {new Date(item.created_at).toDateString()}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    )
};

export default Clashing;