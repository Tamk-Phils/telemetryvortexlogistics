import nodemailer from 'nodemailer';

// Initialize the SMTP transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.spacemail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

interface BaseEmailParams {
    to: string;
    subject: string;
    trackingNumber: string;
    recipientName: string;
}

interface NewShipmentParams extends BaseEmailParams {
    senderName: string;
    origin: string;
    destination: string;
}

interface UpdateShipmentParams extends BaseEmailParams {
    newStatus: string;
    location: string;
    description: string;
}

const getTrackingLink = () => `${process.env.NEXT_PUBLIC_APP_URL || "https://vortex-global.io"}/tracking`;

export async function sendShipmentCreatedEmail({
    to,
    subject,
    trackingNumber,
    senderName,
    recipientName,
    origin,
    destination
}: NewShipmentParams) {
    const trackingLink = getTrackingLink();

    const htmlContent = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px; background-color: #ffffff;">
            <div style="background-color: #050508; padding: 30px; text-align: center; border-radius: 4px 4px 0 0;">
                <h1 style="color: #0070F3; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">VORTEX GLOBAL</h1>
                <p style="color: #ffffff; margin: 5px 0 0; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; opacity: 0.5;">Operational Data</p>
            </div>
            <div style="padding: 40px; background-color: #ffffff;">
                <h2 style="color: #0f172a; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; margin-bottom: 20px;">System Initiated: New Shipment</h2>
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; font-weight: 500;">
                    IDENTIFIER: <strong>${recipientName}</strong>,
                </p>
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; font-weight: 500;">
                    A new transit protocol has been established by <strong>${senderName}</strong>. Your asset is now being tracked across the Vortex Express network.
                </p>
                
                <div style="background-color: #f8fafc; padding: 25px; border-radius: 4px; margin: 30px 0; border: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; font-size: 9px; margin: 0 0 10px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Tracking Signature</p>
                    <p style="color: #0070f3; font-family: monospace; font-size: 28px; font-weight: 900; margin: 0;">
                        ${trackingNumber}
                    </p>
                </div>

                <div style="margin: 30px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                                <span style="color: #94a3b8; font-size: 9px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Origin Node</span><br/>
                                <strong style="color: #0f172a; font-size: 14px; text-transform: uppercase;">${origin}</strong>
                            </td>
                            <td style="padding: 15px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                                <span style="color: #94a3b8; font-size: 9px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Destination Node</span><br/>
                                <strong style="color: #0f172a; font-size: 14px; text-transform: uppercase;">${destination}</strong>
                            </td>
                        </tr>
                    </table>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="${trackingLink}" style="background-color: #0070F3; color: white; padding: 18px 36px; text-decoration: none; border-radius: 2px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Enter Portal</a>
                </div>
            </div>
            <div style="text-align: center; padding: 30px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                <p>&copy; 2026 Vortex Express Logistics. Systems Operational.</p>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"${process.env.FROM_NAME || "Vortex Express"}" <${process.env.FROM_EMAIL}>`,
            to,
            subject,
            html: htmlContent,
        });
        return { success: true };
    } catch (error) {
        console.error("Nodemailer Error:", error);
        return { success: false, error };
    }
}

export async function sendShipmentUpdateEmail({
    to,
    subject,
    trackingNumber,
    recipientName,
    newStatus,
    location,
    description
}: UpdateShipmentParams) {
    const trackingLink = getTrackingLink();

    const htmlContent = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px; background-color: #ffffff;">
            <div style="background-color: #050508; padding: 30px; text-align: center; border-radius: 4px 4px 0 0;">
                <h1 style="color: #0070F3; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">VORTEX GLOBAL</h1>
                <p style="color: #ffffff; margin: 5px 0 0; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; opacity: 0.5;">Operational Data</p>
            </div>
            <div style="padding: 40px; background-color: #ffffff;">
                <h2 style="color: #0f172a; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; margin-bottom: 20px;">Data Update</h2>
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; font-weight: 500;">
                    IDENTIFIER: <strong>${recipientName}</strong>,
                </p>
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; font-weight: 500;">
                    Delivery signature <strong>${trackingNumber}</strong> has been updated in the global ledger.
                </p>
                
                <div style="background-color: #f8fafc; padding: 25px; border-radius: 4px; margin: 30px 0; border: 1px solid #e2e8f0;">
                    <div style="margin-bottom: 20px;">
                        <p style="color: #94a3b8; font-size: 9px; margin: 0 0 5px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">New Status</p>
                        <p style="color: #0070f3; font-size: 18px; font-weight: 900; margin: 0; text-transform: uppercase;">${newStatus}</p>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p style="color: #94a3b8; font-size: 9px; margin: 0 0 5px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Current Node</p>
                        <p style="color: #0f172a; font-size: 14px; margin: 0; font-weight: 700; text-transform: uppercase;">${location || "In Delivery"}</p>
                    </div>
                    <div>
                        <p style="color: #94a3b8; font-size: 9px; margin: 0 0 5px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">System Details</p>
                        <p style="color: #64748b; font-size: 12px; margin: 0; font-weight: 500; line-height: 1.5;">${description || "No additional variance reported."}</p>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="${trackingLink}" style="background-color: #0070F3; color: white; padding: 18px 36px; text-decoration: none; border-radius: 2px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Enter Portal</a>
                </div>
            </div>
            <div style="text-align: center; padding: 30px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                <p>&copy; 2026 Vortex Express Logistics. Systems Operational.</p>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"${process.env.FROM_NAME || "Vortex Express"}" <${process.env.FROM_EMAIL}>`,
            to,
            subject,
            html: htmlContent,
        });
        return { success: true };
    } catch (error) {
        console.error("Nodemailer Error:", error);
        return { success: false, error };
    }
}
