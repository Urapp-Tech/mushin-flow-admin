/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { authLogin } from '@/services/auth.service';
import { useUserStore } from '@/stores/user.store';
import promiseHandler from '@/utilities/promise-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'email is required')
    .max(100, `email cannot exceed 100 characters`)
    .email('email is invalid'),
  password: z
    .string()
    .min(1, 'password is required')
    .min(8, 'password must be at least 8 characters long'),
});

type FormSchema = z.infer<typeof formSchema>;

function SignIn() {
  const { user, setUser } = useUserStore();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const onSubmit = useCallback(
    async (data: FormSchema) => {
      const payload = {
        email: data.email,
        password: data.password,
      };
      setIsLoading(true);
      const promise = authLogin(payload);
      const [error, result, ok] = await promiseHandler(promise);
      setIsLoading(false);
      if (!ok) {
        toast(error.data.message);
        return;
      }
      if (result.success) {
        setUser(result.user);
      }
    },
    [setUser]
  );

  return (
    <div className="tw:flex tw:min-h-screen tw:w-full tw:flex-col tw:items-center tw:justify-center">
      <form
        className="tw:flex tw:w-lg tw:flex-col tw:gap-y-6 tw:rounded-lg tw:border tw:border-solid tw:border-[#E5E5E5] tw:p-4 tw:shadow-sm"
        onSubmit={handleSubmit(onSubmit, (error) =>
          console.error('form error :>> ', error)
        )}
      >
        <div className="tw:w-full">
          <p className="tw:font-inter tw:text-center tw:text-base tw:font-bold tw:text-yellow-600">
            Mushin Flow
          </p>
          <p className="tw:font-inter tw:text-center tw:text-sm tw:font-normal tw:text-[#303D50]">
            Please sign-in to your account to continue
          </p>
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="tw:w-full">
              <Label className="tw:mb-1" htmlFor={field.name}>
                Email
              </Label>
              <div className="tw:relative">
                <Input
                  className="tw:h-8"
                  id={field.name}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder="admin@example.com"
                  ref={field.ref}
                  type="email"
                  value={field.value}
                />
                <span
                  className={cn(
                    'tw:ml-2 tw:text-xs tw:text-red-400 tw:opacity-0',
                    fieldState.error && 'tw:opacity-100'
                  )}
                >
                  {fieldState.error?.message}
                </span>
              </div>
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <div className="tw:w-full">
              <Label className="tw:mb-1" htmlFor={field.name}>
                Password
              </Label>
              <div className="tw:relative">
                <Input
                  className="tw:h-8"
                  id={field.name}
                  name={field.name}
                  endAdornment={{
                    type: 'button',
                    icon: isPasswordVisible ? Eye : EyeOff,
                    onClick: () => setIsPasswordVisible((v) => !v),
                  }}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder="********"
                  ref={field.ref}
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={field.value}
                />
                <span
                  className={cn(
                    'tw:ml-2 tw:text-xs tw:text-red-400 tw:opacity-0',
                    fieldState.error && 'tw:opacity-100'
                  )}
                >
                  {fieldState.error?.message}
                </span>
              </div>
            </div>
          )}
        />

        <Button
          className="tw:cursor-pointer"
          disabled={isLoading}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
