import mongoose from 'mongoose';

import {
    Payment as PaymentInterface,
    User as UserInterface,
    Notice as NoticeInterface,
    Lot as LotInterface,
    Favorite as FavoriteInterface,
    Donate as DonateInterface,
    Deal as DealInterface,
    Country as CountryInterface,
    Category as CategoryInterface,
    Bidder as BidderInterface,
    Admin as AdminInterface,
    Media as MediaInterface
} from '../../glob';
import {
    PaymentSchema,
    UserSchema,
    NoticeSchema,
    LotSchema,
    FavoriteSchema,
    DonateSchema,
    DealSchema,
    CountrySchema,
    CategorySchema,
    BidderSchema,
    AdminSchema,
    MediaSchema
} from './Schemas';

interface PaymentModelInterface extends PaymentInterface, mongoose.Document {}
export const PaymentModel = mongoose.model<PaymentModelInterface>('Payments', PaymentSchema);

interface UserModelInterface extends UserInterface, mongoose.Document {}
export const UserModel = mongoose.model<UserModelInterface>('Users', UserSchema);

interface NoticeModelInterface extends NoticeInterface, mongoose.Document {}
export const NoticeModel = mongoose.model<NoticeModelInterface>('Notices', NoticeSchema);

interface LotModelInterface extends LotInterface, mongoose.Document {}
export const LotModel = mongoose.model<LotModelInterface>('Lots', LotSchema);

interface FavoriteModelInterface extends FavoriteInterface, mongoose.Document {}
export const FavoriteModel = mongoose.model<FavoriteModelInterface>('Favorites', FavoriteSchema);

interface DonateModelInterface extends DonateInterface, mongoose.Document {}
export const DonateModel = mongoose.model<DonateModelInterface>('Donates', DonateSchema);

interface DealModelnterface extends DealInterface, mongoose.Document {}
export const DealModel = mongoose.model<DealModelnterface>('Deals', DealSchema);

interface CountryModelInterface extends CountryInterface, mongoose.Document {}
export const CountryModel = mongoose.model<CountryModelInterface>('Countries', CountrySchema);

interface CategoryModelInterface extends CategoryInterface, mongoose.Document {}
export const CategoryModel = mongoose.model<CategoryModelInterface>('Categories', CategorySchema);

interface BidderModelInterface extends BidderInterface, mongoose.Document {}
export const BidderModel = mongoose.model<BidderModelInterface>('Bidders', BidderSchema);

interface AdminModelInterface extends AdminInterface, mongoose.Document {}
export const AdminModel = mongoose.model<AdminModelInterface>('Admin', AdminSchema);

interface MediaModelInterface extends MediaInterface, mongoose.Document {}
export const MediaModel = mongoose.model<MediaModelInterface>('Media', MediaSchema);
