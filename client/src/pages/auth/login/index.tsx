import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useApi } from "@/hooks/useApi"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { toast } from "sonner"
import { useGoogleLogin } from "@react-oauth/google"
import { handleGoogleError } from "@/utils/googleAuth"

const Login = () => {
    const {post, loading} = useApi();
    const navigate = useNavigate();
    const {setUser} = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Send access token to backend, which will verify with Google
                const res = await post('/api/auth/google-login', {
                    body: { access_token: tokenResponse.access_token }
                });
                
                if (res.success) {
                    localStorage.setItem('token', res.data.token);
                    setUser(res.data.user);
                    navigate('/');
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                handleGoogleError();
            }
        },
        onError: handleGoogleError
    })

    const handleLogin = async () => {
        console.log(formData)
        const res = await post('/api/auth/login', {
            body: {
                email: formData.email,
                password: formData.password
            }
        })
        console.log(res)
        if(res.success){
          localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
            toast.success(res.message)
        }else{
          toast.error(res.message)
        }
    }

  return (
    <div className="h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
            <Link to='/signup'>
            <Button variant="link">Sign Up</Button>
            </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={loading || formData.email === '' || formData.password === ''} type="submit" className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outline" className="w-full" onClick={() => googleLogin()}>
        <svg width="800px" height="800px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg> Login with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Login