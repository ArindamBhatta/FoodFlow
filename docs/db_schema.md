# Database Schema

---

## 📊 Summary of Database Tables (19 Entities)

The system is organized around a unified `person` authentication base and specialized extension entities:

1. **`person`**: Unified user base table for accounts, security (passwords, OTP), and JWT tokens.
2. **`customer`**: Customer-specific attributes (loyalty points, preferred cuisine).
3. **`vendor`**: Restaurant profile, opening/closing hours, rating, FSSAI & GST details.
4. **`delivery_person`**: Driver details, vehicle info, GPS coordinates, driver ratings.
5. **`admin`**: System administrator staff roles.
6. **`address`**: Multi-use address table linked to `person` or `vendor`.
7. **`food_category`**: Food categorization (Starters, Main Course, Drinks, etc.).
8. **`food`**: Food items menu with pricing, discounts, prep time, veg/vegan flags.
9. **`orders`**: Master order table storing totals, tax, status, delivery address.
10. **`order_item`**: Line items per order (linked to `orders` and `food`).
11. **`delivery`**: Order delivery status, pickup/delivery timestamps, OTP verification.
12. **`payment`**: Payment status, transaction ID, payment gateway, payment method.
13. **`cart`**: Active customer shopping cart.
14. **`cart_item`**: Individual food items held in active cart.
15. **`review`**: Customer ratings & reviews for orders, vendors, food, or delivery persons.
16. **`customer_favorite`**: Bookmarked food items by customers.
17. **`coupon`**: Promotional discount codes and rules.
18. **`coupon_usage`**: Redemption history log for coupons.
19. **`notification`**: In-app notifications for users.

---

## 🔗 Entity Relationships Breakdown

### 1️⃣ One-to-One (1:1) Relationships
- **`person` ↔ `customer`**: 1 Person can extend to 1 Customer profile via `customer.person_id`.
- **`person` ↔ `vendor`**: 1 Person can extend to 1 Vendor owner profile via `vendor.person_id`.
- **`person` ↔ `delivery_person`**: 1 Person can extend to 1 Driver profile via `delivery_person.person_id`.
- **`person` ↔ `admin`**: 1 Person can extend to 1 Admin profile via `admin.person_id`.
- **`customer` ↔ `cart`**: 1 Customer has 1 active Shopping Cart via `cart.customer_id`.
- **`orders` ↔ `delivery`**: 1 Order has 1 Delivery assignment log via `delivery.order_id`.
- **`orders` ↔ `payment`**: 1 Order has 1 Payment record via `payment.order_id`.

---

### 2️⃣ One-to-Many (1:N) Relationships
- **`person` → `address`**: 1 Person can store multiple delivery addresses (`address.person_id`).
- **`vendor` → `food`**: 1 Vendor publishes multiple menu items (`food.vendor_id`).
- **`food_category` → `food`**: 1 Category contains multiple food items (`food.category_id`).
- **`customer` → `orders`**: 1 Customer places multiple orders (`orders.customer_id`).
- **`vendor` → `orders`**: 1 Vendor receives multiple orders (`orders.vendor_id`).
- **`orders` → `order_item`**: 1 Order contains multiple order line items (`order_item.order_id`).
- **`cart` → `cart_item`**: 1 Cart holds multiple cart line items (`cart_item.cart_id`).
- **`delivery_person` → `delivery`**: 1 Driver completes multiple deliveries over time (`delivery.delivery_person_id`).
- **`customer` → `review`**: 1 Customer submits multiple reviews (`review.customer_id`).
- **`vendor` → `review`**: 1 Vendor accumulates multiple customer reviews (`review.vendor_id`).
- **`coupon` → `coupon_usage`**: 1 Coupon code can be redeemed multiple times (`coupon_usage.coupon_id`).
- **`person` → `notification`**: 1 User receives multiple notifications (`notification.person_id`).

---

### 3️⃣ Many-to-Many (N:M) Relationships (Via Junction Tables)
- **`orders` ↔ `food`** *(Via `order_item`)*: An order contains many food items, and a food item appears in many orders. Linked with item quantity and captured snapshot price.
- **`cart` ↔ `food`** *(Via `cart_item`)*: A cart contains many food items, and a food item is added to many carts. Linked with target quantity.
- **`customer` ↔ `food`** *(Via `customer_favorite`)*: Customers bookmark multiple food items, and a food item can be favorited by multiple customers.
- **`customer` ↔ `coupon`** *(Via `coupon_usage`)*: Customers redeem multiple promo codes, and a promo code is redeemed by multiple customers across different orders.

---

## 📑 Excel File Structure (`food_order_db_schema.xlsx`)

The generated Excel workbook contains **3 separate tabs**:

1. **`Database Summary`**: High-level table categories, entity counts, database engine metadata.
2. **`Relationships (1-1, 1-N, N-M)`**: Complete relationship matrix categorized clearly into **1:1**, **1:N**, and **N:M** (with source/target keys and descriptions).
3. **`Tables & Column Details`**: Exhaustive list of all **19 tables** and their **120+ columns**, including data types, constraints (PK, FK, DEFAULT, UNIQUE), and field descriptions.
