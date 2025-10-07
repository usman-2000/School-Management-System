import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, AlertCircle } from "lucide-react"
// import { useAuth } from "@/hooks/useAuth"
import { useLogin } from '@/hooks/useAuth';

export function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const { handleLogin, isLoading } = useLogin();
    const [error, setError] = useState("")

    // const { login, isLoading } = useAuth()

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await handleLogin({ username, password }, rememberMe);
    if (!result.success) {
      setError(result.error);
    }
  };

    return (
        <Card className="w-full shadow-lg border-0 bg-card">
            <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-primary-foreground" />
                    </div>
                </div>
                <div>
                    <CardTitle className="text-2xl font-bold text-foreground">Greenwood Academy</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">School Management System</CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {error && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-card-foreground font-medium">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="h-11 bg-input border-border focus:ring-ring"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-card-foreground font-medium">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-11 bg-input border-border focus:ring-ring"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked)}
                            disabled={isLoading}
                        />
                        <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                            Remember me
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <div className="text-center">
                    <Button variant="link" className="text-accent hover:text-accent/80 p-0 h-auto font-normal">
                        Forgot your password?
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}