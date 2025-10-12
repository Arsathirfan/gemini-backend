📘 App Documentation
🏠 Overview

This Flutter app is built using Provider for state management, Supabase for authentication and backend data, and IndexedStack for tabbed navigation (Home, Web, Reports).
The app integrates with Lean SDK for payments, UXCam for analytics, and supports multi-language localization.

👤 Authentication Flow
1. Login

The app uses Supabase email OTP / Magic Link authentication.

Users can log in using their registered email.

Process:

Enter email → press Login.

Supabase sends a Magic Link / OTP to the email.

User clicks the link or enters the OTP.

Supabase verifies via verifyOtp() and returns a user session.

The session is stored locally for auto-login on next app start.

Security:

Magic links expire after 1 hour.

OTP requests are limited to once every 60 seconds.

2. Create Account

New users register using their email and basic info.

Supabase signUp() is used to create the account.

A verification email is sent automatically.

After email confirmation, user can log in normally using the same magic link flow.

3. Forgot Password

If a user forgets their password:

Tap Forgot Password on the login screen.

Enter registered email.

Supabase sends a password reset link.

After resetting, the user can log in again.

🔐 Note: In your version, some flows use OTP login instead of password-based login for simpler UX.

🎓 Student Management
1. Add Student

Accessible from the ReportScreen or HomeScreen.

Press Add Student → navigates to the WebScreen in full-screen mode.

The WebScreen loads a specific URL to add student details (dynamic URL passed from ReportScreen).

Bottom navigation is hidden during this action for a focused experience.

2. Edit Student

From ReportScreen, tap a student record → opens WebScreen with edit URL.

Data updates reflect instantly after returning from WebView (since IndexedStack keeps all screens loaded).

3. Remove Student

On the ReportScreen or student list:

Tap Delete.

Confirmation dialog appears.

On confirm, the student record is deleted from Supabase.

The UI updates automatically (list refresh triggered via Provider).

💳 Payments
Integration

The app integrates Lean SDK v3.0.7 for secure bank connections and payments.

Payment Flow

From Home or Report screen → select Add Payment Method.

Lean SDK opens a secure web interface for authentication.

On success:

Bank and account details are fetched.

Data stored in Supabase linked to the user ID.

Cards/accounts shown in a styled list using provider data.

File Uploads / Downloads (WebView)

The WebScreen (built with webview_flutter) supports:

File uploads (e.g., student documents)

Downloads (e.g., receipts, payment confirmations)

No native code modifications required.

🌐 Navigation System

The main navigation uses an IndexedStack with these screens:

HomeScreen

WebScreen

ReportScreen

Navigation handled via Provider (BottomNavProvider or similar).

Screens stay loaded → data/state not lost during tab switches.

Special rule:

When navigating to WebScreen for actions like adding/editing students or payments → bottom navigation hides.

🌍 Language & Localization

The app supports multiple languages (likely via Flutter’s intl or easy_localization).

Change Language Flow:

Go to Settings.

Tap Language → select desired language.

App reloads localized strings.

Language preference is stored locally (e.g., using SharedPreferences or Provider state).
