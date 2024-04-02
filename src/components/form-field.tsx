import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { ErrorMessage, Field } from "formik";
import { cn } from "@/lib/utils";

export function FormField({
    error,
    name,
    label,
    type,
    placeholder,
    inputClassName,
    containerClassName,
    labelClassName,
    errorMessageClassName,
}: {
    error?: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    inputClassName?: string;
    containerClassName?: string;
    labelClassName?: string;
    errorMessageClassName?: string;
}) {
    return (
        <div
            className={cn(
                "grid w-full items-start gap-1.5",
                containerClassName
            )}
        >
            <div className="flex items-center justify-between">
                <Label htmlFor={name} className={labelClassName}>
                    {label}
                </Label>
                {error && error}
                <ErrorMessage
                    name={name}
                    render={(msg) => {
                        return (
                            <span
                                className={cn(
                                    "text-xs text-red-500",
                                    errorMessageClassName
                                )}
                            >
                                {msg}
                            </span>
                        );
                    }}
                />
            </div>
            <Field
                as={Input}
                className={cn("", inputClassName)}
                id={name}
                placeholder={placeholder}
                type={type}
                name={name}
            />
        </div>
    );
}
