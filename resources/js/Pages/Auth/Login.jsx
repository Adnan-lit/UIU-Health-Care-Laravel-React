import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/AuthLayout.jsx';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from "@/Layouts/AuthLayout.jsx";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in"/>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <h1 className="text-[1.8em] font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-[0.8em]">
                Sign in to continue accessing UIU Healthcare services.
            </p>

            <form className="w-[70%] mt-10 flex flex-col items-center gap-2" onSubmit={submit}>
                <TextInput
                    type="email"
                    id="email"
                    name="email"
                    isFocused={true}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Email"
                />
                <InputError message={errors.email} className="mt-2" />
                <TextInput
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-4"
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
                <Link className="text-[#5145e5] self-end text-sm mt-2" href="/forgot-password">
                    Forgot Password?
                </Link>
                <button
                    type="submit"
                    className="bg-[#5145e5] text-white text-sm font-semibold rounded-2xl w-full p-2.5 mt-4"
                >
                    Login
                </button>
            </form>
            <p className="mt-4">
                Don’t have an account?{" "}
                <Link className="text-[#5145e5]" href="/register">
                    Sign Up
                </Link>
            </p>

            {/*<form onSubmit={submit}>*/}
            {/*    <div>*/}
            {/*        <InputLabel htmlFor="email" value="Email" />*/}

            {/*        <TextInput*/}
            {/*            id="email"*/}
            {/*            type="email"*/}
            {/*            name="email"*/}
            {/*            value={data.email}*/}
            {/*            className="mt-1 block w-full"*/}
            {/*            autoComplete="username"*/}
            {/*            isFocused={true}*/}
            {/*            onChange={(e) => setData('email', e.target.value)}*/}
            {/*        />*/}

            {/*        <InputError message={errors.email} className="mt-2" />*/}
            {/*    </div>*/}

            {/*    <div className="mt-4">*/}
            {/*        <InputLabel htmlFor="password" value="Password" />*/}

            {/*        <TextInput*/}
            {/*            id="password"*/}
            {/*            type="password"*/}
            {/*            name="password"*/}
            {/*            value={data.password}*/}
            {/*            className="mt-1 block w-full"*/}
            {/*            autoComplete="current-password"*/}
            {/*            onChange={(e) => setData('password', e.target.value)}*/}
            {/*        />*/}

            {/*        <InputError message={errors.password} className="mt-2" />*/}
            {/*    </div>*/}

            {/*    <div className="mt-4 block">*/}
            {/*        <label className="flex items-center">*/}
            {/*            <Checkbox*/}
            {/*                name="remember"*/}
            {/*                checked={data.remember}*/}
            {/*                onChange={(e) =>*/}
            {/*                    setData('remember', e.target.checked)*/}
            {/*                }*/}
            {/*            />*/}
            {/*            <span className="ms-2 text-sm text-gray-600">*/}
            {/*                Remember me*/}
            {/*            </span>*/}
            {/*        </label>*/}
            {/*    </div>*/}

            {/*    <div className="mt-4 flex items-center justify-end">*/}
            {/*        {canResetPassword && (*/}
            {/*            <Link*/}
            {/*                href={route('password.request')}*/}
            {/*                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
            {/*            >*/}
            {/*                Forgot your password?*/}
            {/*            </Link>*/}
            {/*        )}*/}

            {/*        <PrimaryButton className="ms-4" disabled={processing}>*/}
            {/*            Log in*/}
            {/*        </PrimaryButton>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </AuthLayout>
    );
}
