import mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

export const PaymentSchema: mongoose.Schema = new mongoose.Schema({
    dealId: ObjectId,
    userId: ObjectId,
    quantity: Number,
    created: { type: Date, default: Date.now }
});

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    // authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    name: String,
    email: String,
    password: String,
    salt: String,
    resetKey: String,
    resetExp: Date,
    photo: String,
    countryId: ObjectId,
    active: Boolean,
    balance: Number,
    donates: Number,
    rating: Number,
    deals: Number,
    role: String,
    wallet: String,
    config: [{
        param: String,
        value: String
    }],
    created: { type: Date, default: Date.now },
    visited: { type: Date, default: Date.now }
});

export const NoticeSchema: mongoose.Schema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    text: String,
    created: { type: Date, default: Date.now }
});

export const LotSchema: mongoose.Schema = new mongoose.Schema({
    userId: ObjectId,
    caption: String,
    description: String,
    price: Number,
    categoryId: ObjectId,
    photosIds: [ObjectId],
    link: String,
    status: String,
    created: { type: Date, default: Date.now }
});

export const FavoriteSchema: mongoose.Schema = new mongoose.Schema({
    userId: ObjectId,
    favorId: ObjectId,
    type: String
});

export const DonateSchema: mongoose.Schema = new mongoose.Schema({
    senderId: ObjectId,
    receiverId: ObjectId,
    quantity: Number,
    type: String,
    created: { type: Date, default: Date.now }
});

export const DealSchema: mongoose.Schema = new mongoose.Schema({
    lotId: ObjectId,
    sellerId: ObjectId,
    buyerId: ObjectId,
    chat: [{
        senderId: ObjectId,
        message: String,
        read: Boolean,
        created: { type: Date, default: Date.now }
    }],
    status: String,
    created: { type: Date, default: Date.now }
});

export const CountrySchema: mongoose.Schema = new mongoose.Schema({
    key: String,
    value: String,
    flag: String,
    text: String
});

export const CategorySchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    index: Number,
    path: [Number],
    icon: String
});

export const BidderSchema: mongoose.Schema = new mongoose.Schema({
    lotId: ObjectId,
    userId: ObjectId,
    earned: [{
        userId: ObjectId,
        quantity: Number
    }]
});

export const AdminSchema: mongoose.Schema = new mongoose.Schema({
    total: Number,
    income: Number,
    wallet: String
});

export const MediaSchema: mongoose.Schema = new mongoose.Schema({
    url: String,
    valid: Boolean,
    created: { type: Date, default: Date.now }
});
