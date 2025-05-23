"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { CLASH_ITEMS_URL } from "@/lib/apiEndPoints";
import { Button } from "@/Components/ui/button";
import { ClashItemForm } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { toast } from "sonner";

const AddClashItems = ({
    token,
    clashId
}: {
    token: string;
    clashId: string;
}) => {

    const [items, setItems] = useState<Array<ClashItemForm>>([
        { image: null },
        { image: null }
    ]);

    const [urls, setUrls] = useState<Array<string>>(["", ""]);

    const [errors, setErrors] = useState<Array<string>>([]);

    const imgRef1 = useRef<HTMLInputElement | null>(null);

    const imgRef2 = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {

        const file = event.target.files?.[0];

        if (file) {

            const updatedItems = [...items];

            updatedItems[index].image = file;

            setItems(updatedItems);

            const imageUrl = URL.createObjectURL(file);

            const updatedUrls = [...urls];

            updatedUrls[index] = imageUrl;

            setUrls(updatedUrls);

        }

    };

    const handleSubmit = async () => {

        try {

            const formData = new FormData();

            formData.append("id", clashId);

            items.map((item) => {

                if (item.image) formData.append(`images[]`, item.image);

            });

            if (formData.get("images[]")) {

                setLoading(true);

                const { data } = await axios.post(CLASH_ITEMS_URL, formData, {
                    headers: {
                        Authorization: token
                    }
                });

                if (data?.message) {

                    toast.success("Items Added Successfully!");

                    setTimeout(() => { router.replace("/dashboard"); }, 1000);
                }

                setLoading(false);

            } else {

                toast.warning("Please Upload Both Images");

            }

        } catch (error) {

            setLoading(false);

            if (error instanceof AxiosError) {

                if (error.response?.status === 422) {

                    setErrors(error.response?.data?.errors);

                } else if (error.response?.status === 404) {

                    toast.error(error.response?.data?.message);

                }

            } else {

                toast.error("Something Went Wrong...");

            }

        }

    };

    return (
        <div className="mt-10">
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                    <input
                        onChange={(e) => handleImageChange(e, 0)}
                        ref={imgRef1}
                        className="hidden"
                        accept="image/*"
                        type="file"
                    />

                    <div
                        className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
                        onClick={() => { imgRef1?.current?.click() }}
                    >
                        {urls.length > 0 && urls?.[0] !== "" ? (
                            <Image
                                className="w-full h-[300px] object-contain"
                                alt="preview-1"
                                src={urls?.[0]}
                                width={500}
                                height={500}
                            />
                        ) : (
                            <h1 className="flex space-x-2 text-xl">
                                <Upload /> <span>Upload file</span>
                            </h1>
                        )}
                    </div>

                    <span className="text-red-500">
                        {errors?.[0]}
                    </span>
                </div>

                <div className="flex w-full lg:w-auto justify-center items-center">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                        VS
                    </h1>
                </div>

                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                    <input
                        onChange={(e) => handleImageChange(e, 1)}
                        className="hidden"
                        accept="image/*"
                        type="file"
                        ref={imgRef2}
                    />

                    <div
                        className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
                        onClick={() => { imgRef2?.current?.click() }}
                    >
                        {urls.length > 0 && urls?.[1] !== "" ? (
                            <Image
                                className="w-full h-[300px] object-contain"
                                alt="preview-1"
                                src={urls?.[1]}
                                width={500}
                                height={500}
                            />
                        ) : (
                            <h1 className="flex space-x-2 text-xl">
                                <Upload /> <span>Upload file</span>
                            </h1>
                        )}
                    </div>

                    <span className="text-red-500">
                        {errors?.[1]}
                    </span>
                </div>
            </div>

            <div className="text-center mt-4">
                <Button className="w-52" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Processing.." : "Submit"}
                </Button>
            </div>
        </div>
    )
};

export default AddClashItems;