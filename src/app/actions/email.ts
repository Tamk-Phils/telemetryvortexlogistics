"use server";

import { sendShipmentCreatedEmail, sendShipmentUpdateEmail } from "@/lib/email";

export async function notifyShipmentCreated(params: {
    to: string;
    adminEmail?: string;
    subject: string;
    trackingNumber: string;
    senderName: string;
    recipientName: string;
    origin: string;
    destination: string;
}) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("Email notification skipped: SMTP credentials not configured");
        return { success: false, error: "SMTP credentials not configured" };
    }
    return await sendShipmentCreatedEmail(params);
}

export async function notifyShipmentUpdate(params: {
    to: string;
    subject: string;
    trackingNumber: string;
    recipientName: string;
    newStatus: string;
    location: string;
    description: string;
}) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("Email notification skipped: SMTP credentials not configured");
        return { success: false, error: "SMTP credentials not configured" };
    }
    return await sendShipmentUpdateEmail(params);
}
