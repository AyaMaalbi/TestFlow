import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
    Button,
    Label,
    Select,
    TextInput,
    Card,
    Navbar,
    NavbarBrand,
} from "flowbite-react";
import { Mail, Lock, User } from "react-feather";

export const Login = function () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [role, setRole] = useState("tester");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (role === "tester") {
            const responseTester = await axios.post(
                "http://127.0.0.1:8000/api/testers/authenticate",
                { email, password }
            );

            if (responseTester.status === 200) {
                setSearchParams({ id: responseTester.data.tester.id });
                navigate(`/test_cases?id=${responseTester.data.tester.id}`);
            } else {
                alert("error tester");
            }
        } else if (role === "responsible") {
            const responseResponsible = await axios.post(
                "http://127.0.0.1:8000/api/responsibles/authenticate",
                { email, password }
            );

            if (responseResponsible.status === 200) {
                setSearchParams({
                    id: responseResponsible.data.responsible.id,
                });
                navigate(
                    `/responsibles?id=${responseResponsible.data.responsible.id}`
                );
            } else {
                alert("password or email is incorrect");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Modern Navbar */}

            {/* Centered Login Card */}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <Card className="border-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex justify-center space-x-4">
                                <img
                                    src="images/logo2.png"
                                    className="h-10"
                                    alt="Company Logo"
                                />
                                <img
                                    src="images/logo3.png"
                                    className="h-10"
                                    alt="Company Logo"
                                />
                                <img
                                    src="images/logo1.png"
                                    className="h-10"
                                    alt="Partner Logo 1"
                                />
                            </div>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div>
                                    <Label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Select your role
                                    </Label>
                                    <Select
                                        id="role"
                                        icon={User}
                                        required
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value="tester">Tester</option>
                                        <option value="responsible">
                                            Responsible
                                        </option>
                                    </Select>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </Label>
                                    <TextInput
                                        type="email"
                                        id="email"
                                        icon={Mail}
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </Label>
                                    <TextInput
                                        type="password"
                                        id="password"
                                        icon={Lock}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        {/* Remember me checkbox could be added here */}
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    isProcessing={isLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
