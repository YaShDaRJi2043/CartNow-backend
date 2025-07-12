const users = require("../../../model/useShcema");
const BuyItem = require("../../../model/buyItemShcema");
const Cart = require("../../../model/cartShcema");
const electronics = require("../../../model/data/electronicShcema");
const homekitchen = require("../../../model/data/home&kitchenShcema");
const men = require("../../../model/data/mensShcema");
const mobile = require("../../../model/data/mobileShcema");
const women = require("../../../model/data/womensSchema");

const sendMail = require("../../../helper/sendMail");

exports.addToBuy = async (req, res) => {
  const { product, deliveryAddress, totalAmount } = req.body;

  try {
    if (!product || !deliveryAddress || !totalAmount) {
      return res.status(400).json({
        status: 400,
        message: "Product, delivery address, and total amount are required",
      });
    }

    // Find the logged-in user
    const user = await users.findById(req.userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Get all product models
    const allProducts = [mobile, electronics, men, women, homekitchen];

    // Create array to hold populated products
    let populatedProducts = [];

    // Populate product details for each item
    for (const item of product) {
      for (const model of allProducts) {
        const foundProduct = await model.findById(item.productId);
        if (foundProduct) {
          populatedProducts.push({
            ...item,
            productDetails: foundProduct.toObject(),
          });
          break;
        }
      }
    }

    // Create new BuyItem document with populated products
    const buyItemData = await BuyItem.create({
      userEmail: user.email,
      items: populatedProducts,
      deliveryAddress: deliveryAddress,
      totalAmount: totalAmount,
      paymentStatus: "paid",
    });

    // Remove purchased items from user's cart
    await Cart.deleteMany({
      userId: req.userId,
    });

    // Prepare items for email template
    const emailItems = populatedProducts.map((item) => ({
      shortTitle: item.productDetails.shortTitle,
      mrp: item.productDetails.mrp,
      cost: item.productDetails.cost,
      discount: item.productDetails.discount,
      url: item.productDetails.url,
      quantity: item.quantity,
    }));

    // Send confirmation email with complete order data
    const mailResult = await sendMail({
      to: user.email,
      slug: "purchase-confirmation",
      data: {
        name: user.name,
        order: {
          _id: buyItemData._id,
          createdAt: buyItemData.createdAt,
          items: emailItems,
          deliveryAddress: deliveryAddress,
          totalAmount: totalAmount,
        },
      },
    });

    if (!mailResult.success) {
      console.error("Email sending failed:", mailResult.error);
    }

    return res.status(201).json({
      status: 201,
      message:
        "Purchase successful, cart cleared" +
        (mailResult.success ? ", and email sent" : ""),
      buyItemData,
    });
  } catch (error) {
    console.error("Error in BuyItem add:", error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const user = await users.findById(req.userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const allProducts = [mobile, electronics, men, women, homekitchen];

    // Find all orders for the user and populate product details
    const orders = await BuyItem.find({ userEmail: user.email })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        model: allProducts,
      })
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No orders found for this user",
        orders: [],
      });
    }

    // Transform the orders to include complete product details
    const enrichedOrders = orders.map((order) => {
      const enrichedItems = order.items.map((item) => {
        return {
          ...item.toObject(),
          product: item.productId, // Move populated product to 'product' field
          productId: undefined, // Remove the duplicate productId reference
        };
      });

      return {
        ...order.toObject(),
        items: enrichedItems,
      };
    });

    return res.status(200).json({
      status: 200,
      message: "Orders retrieved successfully",
      count: enrichedOrders.length,
      orders: enrichedOrders,
    });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong while fetching orders",
      error: error.message,
    });
  }
};
