import { useFormContext } from "react-hook-form";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  defaultValueText: string;
  options: { value: string; label: string }[];
};

export const Select = ({
  name,
  label,
  defaultValueText,
  options,
  ...rest
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-seabed-green font-semibold">{label}</label>

      <select
        {...rest}
        className={`border bg-secondary rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none placeholder:text-black-zapp placeholder:opacity-50 ${
          rest.className
        } ${
          errors[name]
            ? "border-red-500 focus:ring-red-300"
            : "border-black-zapp focus:ring-seabed-green"
        }`}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        defaultValue={""}
      >
        <option className="text-black-zapp" value="" disabled>
          {defaultValueText}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
