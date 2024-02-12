# Book Donate Platform Frontend

## Description

This is a platform for booking hotels and donating books, where users can donate their books and redeem gifts.
  - Authorized users can donate books, by which they can get some coins. Using this coin, users
     can purchase gifts. Also users can give reviews of this platform.
  - Admin can upload gifts and can assign the coin price, also admin can update, delete, add
     anything. 

## Features

### User Registration and Authentication 
- User registration with email verification
- User login and logout functionality

### User Profile

- Can display detailed user information
- User can edit their profile details

### Hotel Booking and Confirmation

- Allow users to book hotels using deposited money
- Send confirmation email for booked hotels

### Book Listing for Donate

- Authenticated users donate their book for donating with necessary information required. 
- He can update his list

## Campaign Reviews

- Users can leave comments for the platform

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Django Rest API (Python)
- **Database**: SQLite 
- **Authentication**: Django Authentication System with Email Verification
- **Email**: SMTP (Simple Mail Transfer Protocol) for sending verification emails
## Live Link
- https://justgive.netlify.app/
## Future Improvements

- Implement OAuth for social media login.
- Enhance the user interface for a better user experience.
- Add more features such as hotel search and filtering options.
- Integrate with a real payment gateway for booking transactions.
