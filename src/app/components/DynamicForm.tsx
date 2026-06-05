"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Car,
  User,
  Calendar,
  Hash,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

type Field = {
  type: string;
  name: string;
  label: string;
  required: boolean;
  options?: string[];
};

type Schema = {
  stepId: string;
  title: string;
  fields: Field[];
};

interface Props {
  schema: Schema;
  onSubmit: (data: Record<string, string>) => void;
}

function fieldIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("zip") || n.includes("location") || n.includes("state"))
    return MapPin;
  if (
    n.includes("vehicle") ||
    n.includes("make") ||
    n.includes("model") ||
    n.includes("year")
  )
    return Car;
  if (n.includes("age") || n.includes("driver") || n.includes("name"))
    return User;
  if (n.includes("date")) return Calendar;
  return Hash;
}

export default function DynamicForm({ schema, onSubmit }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  useEffect(() => {
    setFormData({});
    setErrors({});
    setTouched({});
  }, [schema]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    schema.fields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    setTouched(
      schema.fields.reduce(
        (acc, f) => ({ ...acc, [f.name]: true }),
        {} as Record<string, boolean>,
      ),
    );
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
      <div className="pb-1 border-b border-neutral-100">
        <h3 className="text-xl font-bold text-neutral-800">{schema.title}</h3>
        <p className="text-sm text-neutral-500 mt-1">
          Fields marked with * are required
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schema.fields.map((field) => {
          const hasError = !!errors[field.name] && touched[field.name];
          const Icon = fieldIcon(field.name);

          const inputClasses = `w-full pl-11 pr-4 py-3 rounded-xl border bg-neutral-50/80 text-neutral-800 text-sm transition input-focus-ring ${
            hasError
              ? "border-red-300 bg-red-50/30"
              : "border-neutral-200 hover:border-neutral-300"
          }`;

          return (
            <div key={field.name} className="space-y-1.5">
              <label
                htmlFor={field.name}
                className={`text-sm font-semibold flex items-center gap-1 ${
                  hasError ? "text-red-600" : "text-neutral-700"
                }`}
              >
                {field.label}
                {field.required && <span className="text-brand">*</span>}
              </label>

              <div className="relative">
                <Icon
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    hasError ? "text-red-400" : "text-neutral-400"
                  }`}
                />

                {field.type === "dropdown" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className={inputClasses}
                  />
                )}
              </div>

              {hasError && (
                <p className="flex items-center gap-1 text-red-500 text-xs font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="group btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-200"
      >
        Continue
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}
