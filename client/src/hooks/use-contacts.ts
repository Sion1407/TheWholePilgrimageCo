import { useMutation } from "@tanstack/react-query";
import { api, type ContactInput } from "@shared/routes";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const validated = api.contacts.create.input.parse(data);
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contacts.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }

      return api.contacts.create.responses[201].parse(await res.json());
    },
  });
}
