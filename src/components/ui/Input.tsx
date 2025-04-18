type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};
// import clsx from "clsx"; // Used for conditional class names if needed example clsx("bg-red-500", "text-white")

export const Input = ({ label, error, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-seabed-green">
        {label}
      </label>

      <input
        {...props}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`border rounded p-2 focus:ring-2  focus:outline-none ${
          props.className
        } ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-black-zapp focus:ring-seabed-green"
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
