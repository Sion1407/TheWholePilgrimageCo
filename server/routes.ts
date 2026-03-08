import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendContactEmail } from "./mail";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);

      // Send email only
      await sendContactEmail(input);

      res.status(201).json({
        success: true,
        message: "Message sent successfully",
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      console.error("Contact submission error:", err);
      res.status(500).json({ message: "Failed to process contact request" });
    }
  });

  return httpServer;
}