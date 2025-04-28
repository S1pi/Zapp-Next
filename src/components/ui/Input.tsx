// import { useFormContext } from "react-hook-form";
// "use client";

import { useFormContext } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

export const Input = ({ name, label, ...rest }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-seabed-green font-semibold" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`border rounded p-2 focus:ring-2 focus:outline-none ${
          rest.className
        }
          ${
            errors[name]
              ? "border-red-500 focus:ring-red-300"
              : "border-black-zapp focus:ring-seabed-green"
          }
        `}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
