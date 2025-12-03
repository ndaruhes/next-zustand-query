"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { useLogin } from "@/modules/auth/hooks/use-login";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { z } from "zod";
import { validateSchema, ValidationError } from "@/shared/utils/validate-schema";

const LoginSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});
type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginPage() {
    const login = useLogin();
    const setToken = useAuthStore((s) => s.setToken);

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const form = e.currentTarget;
        const values = {
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            password: (form.elements.namedItem("password") as HTMLInputElement).value,
        };

        try {
            const validated = validateSchema<LoginSchemaType>(LoginSchema, values);

            login.mutate(validated, {
                onSuccess: (res) => {
                    setToken(res.data.token);
                    alert("Login success!");
                },
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                const f = err.formatted;

                setErrors({
                    email: f.email?._errors[0],
                    password: f.password?._errors[0],
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">

                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="********" />
                            {errors.password && (
                                <p className="text-red-600 text-sm">{errors.password}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Masuk
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Belum punya akun?{" "}
                        <Link href="/register" className="text-blue-600 font-medium hover:underline">
                            Daftar sekarang
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
