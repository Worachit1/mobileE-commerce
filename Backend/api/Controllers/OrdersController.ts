import { Request, Response } from 'express';
import { PRODUCTS } from '../Models/ProductModels';
import { ordersParams } from '../dto/Oders';
import { USERLOG } from '../Models/UserModel';
import { ORDERSLOG } from '../Models/OrdersModel';

export const addOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, cartItem, totalPrice, shippingAddress, paymentMethod } = req.body as ordersParams;
        const user = await USERLOG.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const productObj = cartItem.map((item) => ({
            name: item.name,
            id: item._id,
            quantity: item.quantity,
            price: item.price,
            images: item?.images
        }));

        // Create new Order
        const addNewOrder = new ORDERSLOG({
            user: userId,
            Products: productObj,
            totalPrice,
            shippingAddress,
            paymentMethod
        });

        await addNewOrder.save();

        // Update product quantities
        await Promise.all(
            cartItem.map(async (item) => {
                await PRODUCTS.findByIdAndUpdate(item._id, { $inc: { quantity: -item.quantity } });
            })
        );

        res.status(200).json({ message: 'Order created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Failed to create order: ${err}` });
    }
};

export const getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const orders = await ORDERSLOG.find({ user: userId });

        if (!orders || orders.length === 0) {
            res.status(404).json({ message: 'No orders found for this user' });
            return;
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Failed to fetch orders: ${err}` });
    }
};
