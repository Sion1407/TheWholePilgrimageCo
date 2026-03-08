import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { ContactInput } from "@shared/routes";
import { useCreateContact } from "@/hooks/use-contacts";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function ContactForm() {
  const { toast } = useToast();
  const createContact = useCreateContact();

  const form = useForm<ContactInput>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactInput) {
    createContact.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message sent",
          description: "Thank you for reaching out. We will get back to you soon.",
          className: "bg-background border-border text-foreground font-sans",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2 relative">
          <input
            {...form.register("firstName")}
            placeholder="First Name"
            className="editorial-input"
            disabled={createContact.isPending}
          />
          {form.formState.errors.firstName && (
            <span className="text-xs text-red-800/80 absolute -bottom-5 left-0">
              {form.formState.errors.firstName.message}
            </span>
          )}
        </div>
        <div className="space-y-2 relative">
          <input
            {...form.register("lastName")}
            placeholder="Last Name"
            className="editorial-input"
            disabled={createContact.isPending}
          />
          {form.formState.errors.lastName && (
            <span className="text-xs text-red-800/80 absolute -bottom-5 left-0">
              {form.formState.errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 relative">
        <input
          {...form.register("email")}
          type="email"
          placeholder="Email Address"
          className="editorial-input"
          disabled={createContact.isPending}
        />
        {form.formState.errors.email && (
          <span className="text-xs text-red-800/80 absolute -bottom-5 left-0">
            {form.formState.errors.email.message}
          </span>
        )}
      </div>

      <div className="space-y-2 relative">
        <textarea
          {...form.register("message")}
          placeholder="Your Message"
          rows={4}
          className="editorial-input resize-none"
          disabled={createContact.isPending}
        />
        {form.formState.errors.message && (
          <span className="text-xs text-red-800/80 absolute -bottom-5 left-0">
            {form.formState.errors.message.message}
          </span>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={createContact.isPending}
        className="
          w-full sm:w-auto px-10 py-4 
          bg-foreground text-background 
          font-sans tracking-wide text-sm uppercase
          hover:bg-foreground/90 transition-colors
          disabled:opacity-70 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
      >
        {createContact.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </form>
  );
}
