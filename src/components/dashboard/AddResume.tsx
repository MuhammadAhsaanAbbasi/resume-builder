"use client";

import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { PlusSquare } from "lucide-react";
import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { resumeSchema } from "@/schema/resume";
import FormSuccess from "../shared/FormSuccess";
import FormError from "../shared/FormError";
import { useUser } from "@clerk/nextjs";
import { generateResume } from "@/lib/actions/resume.actions";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isLoading, startTransition] = useTransition();

    const { user } = useUser();
    const router = useRouter();

    const UserId = user?.id as string;
    const UserName = user?.fullName as string;

    const form = useForm<z.infer<typeof resumeSchema>>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            title: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof resumeSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            generateResume(UserId, UserName, values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.messege);
                    if (data?.error) {
                        toast({
                            title: "Failed",
                            description: data?.error,
                            variant: "destructive",
                            duration: 2000,
                        });
                    }
                    if (data?.success) {
                        toast({
                            title: "Successfully Created",
                            description: data.messege,
                            duration: 2000,
                            action: (
                                <ToastAction altText="Update Resume!!">Update Now!</ToastAction>
                            ),
                        });
                        router.push(`/dashboard/resume/${data.success}/edit`);
                    }
                })
                .finally(() => {
                    form.reset();
                    setOpenDialog(false);
                });
        });
    };

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button
                        className="p-10 px-20 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed text-black"
                        onClick={() => setOpenDialog(true)} // Open the dialog on click
                    >
                        <PlusSquare className="h-14 w-14" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title for your new resume
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            className=""
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="my-3">
                                        <FormLabel htmlFor="title">Resume Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="title"
                                                disabled={isLoading}
                                                placeholder="Ex. Full Stack Developer Resume"
                                                className="w-full my-3"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Error/Success Messages */}
                            {error && <FormError message={error} />}
                            {success && <FormSuccess message={success} />}

                            <DialogFooter className="my-3">
                                <div className="flex gap-5 justify-end">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => setOpenDialog(false)}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? "Generating..." : "Generate Form"}
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddResume;
