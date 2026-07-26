import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Person Table
export const person = sqliteTable('person', {
    personId: integer('person_id').primaryKey({ autoIncrement: true }),
    fullName: text('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password'),
    salt: text('salt'),
    phoneNumber: text('phone_number'),
    otp: integer('otp'),
    verified: integer('verified', { mode: 'boolean' }).default(false),
    otpExpiry: integer('otp_expiry', { mode: 'timestamp' }),
    dateOfBirth: text('date_of_birth'),
    profileImageUrl: text('profile_image_url'),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Customer Table
export const customer = sqliteTable('customer', {
    customerId: integer('customer_id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id').references(() => person.personId),
    loyaltyPoints: integer('loyalty_points').default(0),
    preferredCuisine: text('preferred_cuisine'),
    registrationDate: integer('registration_date', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

// Vendor Table
export const vendor = sqliteTable('vendor', {
    vendorId: integer('vendor_id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id').references(() => person.personId),
    vendorName: text('vendor_name').notNull(),
    vendorDescription: text('vendor_description'),
    cuisineType: text('cuisine_type'),
    openingTime: text('opening_time'),
    closingTime: text('closing_time'),
    avgPreparationTime: integer('avg_preparation_time'),
    vendorLogoUrl: text('vendor_logo_url'),
    coverImages: text('cover_images'), // JSON string
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    gstNumber: text('gst_number'),
    fssaiLicense: text('fssai_license'),
    ratingAverage: real('rating_average').default(0),
    totalReviews: integer('total_reviews').default(0),
});

// Address Table
export const address = sqliteTable('address', {
    addressId: integer('address_id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id').references(() => person.personId),
    vendorId: integer('vendor_id').references(() => vendor.vendorId),
    addressType: text('address_type'), // home/work/vendor/delivery
    streetAddress: text('street_address').notNull(),
    landmark: text('landmark'),
    city: text('city').notNull(),
    state: text('state').notNull(),
    pincode: text('pincode').notNull(),
    latitude: real('latitude'),
    longitude: real('longitude'),
    isDefault: integer('is_default', { mode: 'boolean' }).default(false),
});

// FoodCategory Table
export const foodCategory = sqliteTable('food_category', {
    categoryId: integer('category_id').primaryKey({ autoIncrement: true }),
    categoryName: text('category_name').notNull(),
    categoryDescription: text('category_description'),
    categoryImageUrl: text('category_image_url'),
    displayOrder: integer('display_order').default(0),
});

// Food Table
export const food = sqliteTable('food', {
    foodId: integer('food_id').primaryKey({ autoIncrement: true }),
    vendorId: integer('vendor_id').references(() => vendor.vendorId),
    foodName: text('food_name').notNull(),
    foodDescription: text('food_description'),
    categoryId: integer('category_id').references(() => foodCategory.categoryId),
    price: real('price').notNull(),
    discountPercentage: real('discount_percentage').default(0),
    foodImageUrl: text('food_image_url'),
    isVegetarian: integer('is_vegetarian', { mode: 'boolean' }).default(false),
    isVegan: integer('is_vegan', { mode: 'boolean' }).default(false),
    isAvailable: integer('is_available', { mode: 'boolean' }).default(true),
    preparationTimeMinutes: integer('preparation_time_minutes'),
    calories: integer('calories'),
    ingredients: text('ingredients'),
    spiceLevel: text('spice_level'),
    servingSize: text('serving_size'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Order Table
export const orders = sqliteTable('orders', { // 'order' is often a reserved word
    orderId: integer('order_id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').references(() => customer.customerId),
    vendorId: integer('vendor_id').references(() => vendor.vendorId),
    deliveryAddressId: integer('delivery_address_id').references(() => address.addressId),
    orderDate: text('order_date').default(sql`CURRENT_DATE`),
    orderTime: text('order_time').default(sql`CURRENT_TIME`),
    orderStatus: text('order_status'),
    subtotalAmount: real('subtotal_amount').notNull(),
    taxAmount: real('tax_amount').notNull(),
    deliveryCharge: real('delivery_charge').default(0),
    discountAmount: real('discount_amount').default(0),
    totalAmount: real('total_amount').notNull(),
    paymentStatus: text('payment_status'),
    specialInstructions: text('special_instructions'),
    estimatedDeliveryTime: integer('estimated_delivery_time', { mode: 'timestamp' }),
    actualDeliveryTime: integer('actual_delivery_time', { mode: 'timestamp' }),
});

// OrderItem Table
export const orderItem = sqliteTable('order_item', {
    orderItemId: integer('order_item_id').primaryKey({ autoIncrement: true }),
    orderId: integer('order_id').references(() => orders.orderId),
    foodId: integer('food_id').references(() => food.foodId),
    quantity: integer('quantity').notNull(),
    unitPrice: real('unit_price').notNull(),
    customizationNotes: text('customization_notes'),
    itemTotal: real('item_total').notNull(),
});

// DeliveryPerson Table
export const deliveryPerson = sqliteTable('delivery_person', {
    deliveryPersonId: integer('delivery_person_id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id').references(() => person.personId),
    vehicleType: text('vehicle_type'),
    vehicleNumber: text('vehicle_number'),
    licenseNumber: text('license_number'),
    isAvailable: integer('is_available', { mode: 'boolean' }).default(true),
    currentLatitude: real('current_latitude'),
    currentLongitude: real('current_longitude'),
    totalDeliveries: integer('total_deliveries').default(0),
    ratingAverage: real('rating_average').default(0),
    joinedDate: integer('joined_date', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Delivery Table
export const delivery = sqliteTable('delivery', {
    deliveryId: integer('delivery_id').primaryKey({ autoIncrement: true }),
    orderId: integer('order_id').references(() => orders.orderId),
    deliveryPersonId: integer('delivery_person_id').references(() => deliveryPerson.deliveryPersonId),
    pickupTime: integer('pickup_time', { mode: 'timestamp' }),
    deliveryTime: integer('delivery_time', { mode: 'timestamp' }),
    deliveryStatus: text('delivery_status'),
    deliveryOtp: text('delivery_otp'),
    deliveryInstructions: text('delivery_instructions'),
    deliveryRating: real('delivery_rating'),
    deliveryFeedback: text('delivery_feedback'),
});

// Payment Table
export const payment = sqliteTable('payment', {
    paymentId: integer('payment_id').primaryKey({ autoIncrement: true }),
    orderId: integer('order_id').references(() => orders.orderId),
    paymentMethod: text('payment_method'),
    paymentStatus: text('payment_status'),
    paymentDate: text('payment_date').default(sql`CURRENT_DATE`),
    paymentTime: text('payment_time').default(sql`CURRENT_TIME`),
    transactionId: text('transaction_id'),
    amount: real('amount').notNull(),
    paymentGateway: text('payment_gateway'),
});

// Review Table
export const review = sqliteTable('review', {
    reviewId: integer('review_id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').references(() => customer.customerId),
    orderId: integer('order_id').references(() => orders.orderId),
    vendorId: integer('vendor_id').references(() => vendor.vendorId),
    foodId: integer('food_id').references(() => food.foodId),
    deliveryPersonId: integer('delivery_person_id').references(() => deliveryPerson.deliveryPersonId),
    rating: integer('rating').notNull(),
    reviewText: text('review_text'),
    reviewDate: integer('review_date', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    reviewImages: text('review_images'), // Could be JSON string or comma-separated
    isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
});

// CustomerFavorite Table
export const customerFavorite = sqliteTable('customer_favorite', {
    favoriteId: integer('favorite_id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').references(() => customer.customerId),
    foodId: integer('food_id').references(() => food.foodId),
    addedDate: integer('added_date', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Coupon Table
export const coupon = sqliteTable('coupon', {
    couponId: integer('coupon_id').primaryKey({ autoIncrement: true }),
    couponCode: text('coupon_code').notNull().unique(),
    description: text('description'),
    discountType: text('discount_type'), // percentage/fixed
    discountValue: real('discount_value').notNull(),
    minOrderAmount: real('min_order_amount'),
    maxDiscountAmount: real('max_discount_amount'),
    validFrom: integer('valid_from', { mode: 'timestamp' }),
    validUntil: integer('valid_until', { mode: 'timestamp' }),
    usageLimit: integer('usage_limit'),
    timesUsed: integer('times_used').default(0),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

// CouponUsage Table
export const couponUsage = sqliteTable('coupon_usage', {
    usageId: integer('usage_id').primaryKey({ autoIncrement: true }),
    couponId: integer('coupon_id').references(() => coupon.couponId),
    customerId: integer('customer_id').references(() => customer.customerId),
    orderId: integer('order_id').references(() => orders.orderId),
    usedDate: integer('used_date', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Notification Table
export const notification = sqliteTable('notification', {
    notificationId: integer('notification_id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id').references(() => person.personId),
    notificationType: text('notification_type'),
    title: text('title').notNull(),
    message: text('message').notNull(),
    isRead: integer('is_read', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    relatedEntityType: text('related_entity_type'),
    relatedEntityId: integer('related_entity_id'),
});

// Cart Table
export const cart = sqliteTable('cart', {
    cartId: integer('cart_id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').references(() => customer.customerId),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// CartItem Table
export const cartItem = sqliteTable('cart_item', {
    cartItemId: integer('cart_item_id').primaryKey({ autoIncrement: true }),
    cartId: integer('cart_id').references(() => cart.cartId),
    foodId: integer('food_id').references(() => food.foodId),
    quantity: integer('quantity').notNull(),
    customizationNotes: text('customization_notes'),
    addedAt: integer('added_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Admin Table
export const admin = sqliteTable('admin', {
    adminId: integer('admin_id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id').references(() => person.personId),
    role: text('role').default('admin'),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
});
