const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const makepayments = async (req, res) => {

    const { plan, price } = req.body.product; 

    console.log('Product received::::::::::', { plan, price });

    try {
        const lineItems = [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Plan for checkout: ${plan}`, 
                    },
                    unit_amount: parseInt(price, 10) * 100, 
                },
                quantity: 1,
            },
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/courses`, 
            cancel_url: `${process.env.FRONTEND_URL}/paymentfailed`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};




module.exports = makepayments;
