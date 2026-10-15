import type { RequestHandler } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { db } from "@repo/db";
import { AppError } from "../errors/AppError";

export const clerkUserWebhook: RequestHandler = async (req, res, next) => {
  let event;

  try {
    event = await verifyWebhook(req);
  } catch {
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  try {
    if (event.type !== "user.created" && event.type !== "user.updated") {
      res.sendStatus(200);
      return;
    }

    const clerkUser = event.data;
    const primaryEmail = clerkUser.email_addresses.find(
      (email) => email.id === clerkUser.primary_email_address_id,
    )?.email_address;

    if (!primaryEmail) {
      // The local User schema currently requires email.
      return next(
        new AppError(
          422,
          "EMAIL_UNAVAILABLE",
          "A primary email is required for local user provisioning",
        ),
      );
    }

    const name =
      [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(" ") ||
      null;

    await db.orm.public.User.upsert({
      create: {
        clerkUserId: clerkUser.id,
        email: primaryEmail,
        name,
        profilePictureUrl: clerkUser.image_url ?? null,
      },
      update: {
        email: primaryEmail,
        name,
        profilePictureUrl: clerkUser.image_url ?? null,
      },
      conflictOn: { clerkUserId: clerkUser.id },
    });

    res.sendStatus(200);
  } catch (error) {
    // Do not log tokens or the full webhook payload.
    next(error);
  }
};
