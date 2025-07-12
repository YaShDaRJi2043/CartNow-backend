module.exports = {
  "reset-password": ({ name, link }) => ({
    subject: "Reset Your Password",
    text: `Hi ${name},\n\nWe received a request to reset your password...`, // keep your existing text version
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
    </style>
</head>
<body>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Please click the button below to proceed:</p>
    <p><a href="${link}" class="button">Reset Password</a></p>
    <p>For your security, this link will expire in 2 minutes.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,<br>The Support Team</p>
</body>
</html>`,
  }),

  "purchase-confirmation": ({ name, order }) => ({
    subject: `Order Confirmation #${order._id}`,
    text: `Hi ${name},\n\nThank you for your order #${order._id}...`, // Basic text version
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Your email styles */
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .order-item { display: flex; padding: 15px; border-bottom: 1px solid #eee; }
        .item-image { width: 80px; margin-right: 15px; }
        .item-details { flex-grow: 1; }
        .item-title { font-weight: bold; }
        .item-price { color: #27ae60; font-weight: bold; }
        /* Add more styles as needed */
    </style>
</head>
<body>
    <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
        <h1>Thank you for your order, ${name}!</h1>
        <p>Order #${order._id}</p>
    </div>

    <div style="margin: 20px 0;">
        <h3>Order Details</h3>
        <p>Order Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Estimated Delivery: 2-3 business days</p>
    </div>

    <div style="border: 1px solid #eee; border-radius: 8px; margin-bottom: 20px;">
        ${order.items
          .map(
            (item) => `
        <div class="order-item">
            <div class="item-image">
                <img src="${item.url}" alt="" width="80" style="max-width: 100%;">
            </div>
            <div class="item-details">
                <div class="item-title">${item.shortTitle}</div>
                <div class="item-price">
                    ₹${item.cost} <span style="text-decoration: line-through; color: #777;">₹${item.mrp}</span>
                    <span style="color: #e74c3c;"> (${item.discount} off)</span>
                </div>
                <div>Quantity: ${item.quantity}</div>
            </div>
        </div>
        `
          )
          .join("")}
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <div style="width: 48%;">
            <h3>Delivery Address</h3>
            <p>${order.deliveryAddress.house}, ${order.deliveryAddress.area}</p>
            <p>${order.deliveryAddress.city}, ${order.deliveryAddress.state}</p>
            <p>PIN: ${order.deliveryAddress.pin}</p>
        </div>
        <div style="width: 48%;">
            <h3>Order Summary</h3>
            <div style="display: flex; justify-content: space-between;">
                <span>Items:</span>
                <span>₹${order.totalAmount}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>Delivery:</span>
                <span>Free</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;">
                <span>Total:</span>
                <span>₹${order.totalAmount}</span>
            </div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa;">
        <p>We appreciate your business!</p>
        <p>If you have any questions, please contact our support team.</p>
    </div>
</body>
</html>`,
  }),
};
