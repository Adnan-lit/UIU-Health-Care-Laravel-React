import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/AuthLayout.jsx';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from "@/Layouts/AuthLayout.jsx";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot Password"/>

            <h1 className="text-[1.8em] font-bold">Forgot Your Password?</h1>
            <p className="text-gray-500 text-[0.8em]">Enter your email address, and we'll send you a link to reset your
                password.</p>


            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form className="w-[70%] mt-10 flex flex-col items-center gap-2" onSubmit={submit}>

                <TextInput type="email" id="email"
                           name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                           isFocused={true}

                       className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
                       placeholder="Email"/>
                <InputError message={errors.email} className="mt-2"/>
                <PrimaryButton
                               disabled={processing}
                        className="bg-[#5145e5] text-white text-sm font-semibold rounded-2xl w-full p-3 h-[40px] mt-4 ">Send
                    Reset Link
                </PrimaryButton>
            </form>


            {/*<form onSubmit={submit}>*/}
            {/*    <TextInput*/}
            {/*        id="email"*/}
            {/*        type="email"*/}
            {/*        name="email"*/}
            {/*        value={data.email}*/}
            {/*        className="mt-1 block w-full"*/}
            {/*        isFocused={true}*/}
            {/*        onChange={(e) => setData('email', e.target.value)}*/}
            {/*    />*/}

            {/*    <InputError message={errors.email} className="mt-2"/>*/}

            {/*    <div className="mt-4 flex items-center justify-end">*/}
            {/*        <PrimaryButton className="ms-4" disabled={processing}>*/}
            {/*            Email Password Reset Link*/}
            {/*        </PrimaryButton>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </AuthLayout>
    );
}
