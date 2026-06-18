import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const SIZES = [
  "Solo or home-based",
  "1 to 3 employees",
  "3 to 5 employees",
  "5 to 10 employees",
  "10 to 20 employees",
  "20 or more employees",
] as const;

const INTERESTS = [
  "Visiting a meeting",
  "Applying for membership",
  "Asking a question",
  "Future branch information",
  "Speaking or contributing to Equipping Time",
] as const;

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  businessName: z.string().min(1, "Required"),
  websiteOrSocial: z.string().optional(),
  businessSize: z.enum(SIZES, { message: "Choose a size" }),
  interest: z.enum(INTERESTS, { message: "Choose an option" }),
  message: z.string().min(1, "Add a short message"),
  consent: z.literal(true, { message: "Please confirm to continue" }),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { consent: undefined as unknown as true },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/public/membership-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-refined-gold/40 bg-river-pale p-10 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-deep-waters text-refined-gold">
          <CheckCircle2 className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-serif text-2xl text-deep-waters">
          Thank you. Your message has been received.
        </h3>
        <p className="mt-3 text-deep-waters/75">
          Someone from Grafted will follow up soon.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const businessSize = watch("businessSize");
  const interest = watch("interest");
  const consent = watch("consent");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message}>
          <Input {...register("firstName")} />
        </Field>
        <Field label="Last name" error={errors.lastName?.message}>
          <Input {...register("lastName")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" {...register("email")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input type="tel" {...register("phone")} />
        </Field>
        <Field label="Business name" error={errors.businessName?.message}>
          <Input {...register("businessName")} />
        </Field>
        <Field
          label="Website or social link"
          error={errors.websiteOrSocial?.message}
        >
          <Input {...register("websiteOrSocial")} placeholder="https://" />
        </Field>
      </div>

      <Field label="Business size" error={errors.businessSize?.message}>
        <Select
          value={businessSize ?? ""}
          onValueChange={(v) =>
            setValue("businessSize", v as FormValues["businessSize"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            {SIZES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="I am interested in" error={errors.interest?.message}>
        <Select
          value={interest ?? ""}
          onValueChange={(v) =>
            setValue("interest", v as FormValues["interest"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            {INTERESTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <Textarea rows={5} {...register("message")} />
      </Field>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={!!consent}
            onCheckedChange={(v) =>
              setValue(
                "consent",
                v === true ? true : (undefined as unknown as true),
                { shouldValidate: true },
              )
            }
          />
          <Label
            htmlFor="consent"
            className="text-sm font-normal leading-snug text-deep-waters/85"
          >
            I understand Grafted is faith-forward and includes prayer,
            scripture, and business conversation.
          </Label>
        </div>
        {errors.consent?.message && (
          <p className="text-sm text-destructive">{errors.consent.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-deep-waters font-eyebrow text-xs uppercase tracking-[0.2em] text-river-sand hover:bg-still-pool md:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {submitError && (
        <p className="text-sm text-destructive">{submitError}</p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-eyebrow text-[11px] uppercase tracking-[0.18em] text-deep-waters/70">
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}