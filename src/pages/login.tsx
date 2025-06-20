import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Typography } from "../components/ui/typography";
import { Link } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      // Using username as email for login
      await login(values.username, values.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Login to WorkFinder
        </h1>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ali Tuf..."
                    className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••"
                    className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <Link
              to="/forgot"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Log In
          </Button>
        </form>
      </Form>

      {/* Sign Up Link */}
      <div className="text-center">
        <Typography variant="small" className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Signup
          </Link>
        </Typography>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12 border border-red-200 hover:bg-red-50 text-red-600 font-medium rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Log in via Google+</span>
          <span className="sm:hidden">Google+</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12 border border-blue-200 hover:bg-blue-50 text-blue-600 font-medium rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Log in via Facebook</span>
          <span className="sm:hidden">Facebook</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
