// import { useFormContext } from "react-hook-form";
// "use client";

import { forwardRef } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

// export const Input = ({ name, label, type, ...rest }: InputProps) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const registerOptions: RegisterOptions = {};

//   if (type === "date") {
//     registerOptions.valueAsDate = true;
//   }

//   return (
//     <div className="flex flex-col gap-2 w-full">
//       {label && (
//         <label className="text-seabed-green font-semibold" htmlFor={name}>
//           {label}
//         </label>
//       )}
//       <input
//         {...rest}
//         type={type}
//         className={`border rounded p-2 focus:ring-2 focus:outline-none ${
//           rest.className
//         }
//           ${
//             errors[name]
//               ? "border-red-500 focus:ring-red-300"
//               : "border-black-zapp focus:ring-seabed-green"
//           }
//         `}
//         {...register(name, registerOptions)}
//         aria-invalid={!!errors[name]}
//         aria-describedby={errors[name] ? `${name}-error` : undefined}
//       />
//       {errors[name] && (
//         <span className="text-red-500 text-sm">
//           {errors[name]?.message as string}
//         </span>
//       )}
//     </div>
//   );
// };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, type, className, ...rest }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const registerOptions: RegisterOptions = {};
    if (type === "date") registerOptions.valueAsDate = true;
    if (type === "number") registerOptions.valueAsNumber = true;
    if (type === "file") registerOptions.required = true;

    // RHF:n register palauttaa omat propit + refin
    const reg = register(name, registerOptions);
    // const { ref: registerRef, ...inputProps } = register(name, registerOptions);

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label htmlFor={name} className="font-semibold text-seabed-green">
            {label}
          </label>
        )}

        <input
          {...reg} // yhdistetään RHF:n register ja ulkopuolelta tullut props
          {...rest}
          id={name}
          type={type}
          /* yhdistetään RHF:n ref ja ulkopuolelta tullut ref */
          ref={(node) => {
            // registerRef(node);
            reg.ref(node);
            if (typeof ref === "function") ref(node);
            else if (ref)
              (ref as React.RefObject<HTMLInputElement | null>).current = node;
          }}
          onChange={(e) => {
            reg.onChange(e);
            // onChange?.(e); // kutsutaan myös ulkopuolelta tullut onChange props
            rest.onChange?.(e); // kutsutaan myös ulkopuolelta tullut onChange props
          }}
          className={`border rounded p-2 focus:ring-2 focus:outline-none ${
            className ?? ""
          } ${
            errors[name]
              ? "border-red-500 focus:ring-red-300"
              : "border-black-zapp focus:ring-seabed-green"
          }`}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />

        {errors[name] && (
          <span id={`${name}-error`} className="text-sm text-red-500">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
