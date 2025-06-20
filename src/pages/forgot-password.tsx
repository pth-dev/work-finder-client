import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Typography } from "../components/ui/typography";
import { Link } from "react-router-dom";
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

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPasswordPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log("Forgot password form values:", values);
    // TODO: Implement forgot password logic
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Forgot Password</h1>
        <Typography variant="small" className="text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </Typography>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reset Password Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Send Reset Link
          </Button>
        </form>
      </Form>

      {/* Back to Login Link */}
      <div className="text-center">
        <Typography variant="small" className="text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Login
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
