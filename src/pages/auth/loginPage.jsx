import { LoginForm } from "@/components/shared/loginForm";


export default function LoginPage() {
    return (
        <div className="min-h-screen flex">
            {/* Image Container */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src="/loginImage.jpg?height=800&width=600"
                    alt="School campus with students learning"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Login Form Container */}
            <div className="flex-1 flex items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}