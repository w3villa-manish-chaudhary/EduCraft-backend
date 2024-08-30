const Subscription = require('../../database/models/subscription'); 

const addSubscription = async (req, res) => {
    try {
        const {amount, subscription_type, description } = req.body;

        console.warn([amount],[subscription_type],[description]);
        
        
        const newSubscription = await Subscription.create({
            amount,
            subscription_type,
            description
        });

        res.status(201).json({ message: 'Subscription added successfully', data: newSubscription });
    } catch (error) {
        console.error('Error adding subscription:', error);
        res.status(500).json({ message: 'Failed to add subscription', error });
    }
};



const showAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Failed to fetch subscriptions', error });
    }
};



module.exports = {
    addSubscription,
    showAllSubscriptions
};
