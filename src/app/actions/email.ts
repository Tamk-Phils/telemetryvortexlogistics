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
    return await sendShipmentUpdateEmail(params);
}
