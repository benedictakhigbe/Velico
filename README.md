# Velico

Velico is an AI-powered business operating system for Nigerian SMEs. It helps business owners understand what is happening, identify problems and opportunities, decide what to do, and take action from one workspace.

Velico is currently designed Nigeria-first. Product language, onboarding, currency, payments, analytics, recommendations, and operating workflows prioritize Nigerian businesses such as retail stores, online vendors, social commerce sellers, service businesses, agencies, freelancers, and growing SMEs.

## Product Vision

Velico is your AI Business Operating System for Nigeria.

The app combines:

- Sales and order tracking
- Products and inventory
- Expenses and finance
- Customers and invoices
- Staff performance
- Reports and analytics
- Automations and notifications
- Nigerian payment and commerce integrations
- Velico AI Business Advisor

Velico should not fabricate business information. When real data is unavailable, the app uses demo/setup states or clearly says there is not enough data.

## How Velico Works

1. A user signs up or opens the demo workspace.
2. The user completes onboarding with Nigerian business details such as state, city, sales channel, revenue range, products/services, and main business goal.
3. The user records daily business activity: sales, expenses, customers, products, inventory movement, invoices, staff activity, and payments.
4. Velico turns that data into useful operating views: revenue, expenses, profit estimates, outstanding payments, low-stock alerts, customer follow-ups, and performance summaries.
5. Velico AI uses authorized workspace data to answer business questions and recommend practical actions.

The core loop is:

Record daily activity -> Review key numbers -> See alerts and recommendations -> Ask Velico AI -> Take action.

## Public Pages

### `/`

The homepage explains Velico at a high level and gives users clear paths to sign up, log in, view pricing, or learn how the product works.

Users should use this page to:

- Understand the product quickly
- Start a free trial
- Navigate to pricing
- Open the detailed walkthrough

### `/how-it-works`

This page explains the Velico workflow in more detail. It shows how daily business entries become insights, recommendations, and actions.

Users should use this page to understand:

- How Velico captures business activity
- How the dashboard becomes a command center
- How modules connect together
- How Velico AI supports decision-making

### `/pricing`

The pricing page shows the paid plans: Starter, Growth, and Business.

Users should use this page to:

- Compare plan levels
- Understand monthly and yearly pricing
- Choose the plan that matches their business stage

### `/login`, `/signup`, `/forgot-password`, `/reset-password`

These pages handle authentication through Firebase. In demo mode, users can open the demo workspace without real Firebase sign-in.

Users should use these pages to:

- Create an account
- Sign in
- Reset access
- Try the demo workspace

## Protected Workspace Pages

All `/app/*` pages are protected and require a signed-in user or demo session.

### `/app` - Dashboard / AI Command Center

The dashboard is the main command center. It greets the owner and asks: "What would you like Velico to help you with today?"

It displays:

- Revenue
- Expenses
- Profit estimate
- Sales
- Orders
- Customers
- Average order value
- Outstanding payments
- Inventory status
- Customer retention
- Velico Business Score
- Velico Morning Brief
- AI recommendations
- Quick actions

Users should use this page every day to:

- See what needs attention
- Ask Velico AI a business question
- Review business health
- Open important pages quickly

### `/app/sales` - Sales / Orders

This page summarizes sales and order activity.

Users should use it to:

- Review recent sales
- See sales totals
- Track payment methods
- Open the new sale screen
- Understand daily selling activity

### `/app/orders`

This route redirects to `/app/sales`. Orders and sales are currently managed together.

### `/app/sales/new`

This page is for creating a new sale. It includes a back button to Sales.

Users should use it to:

- Select a customer
- Select a product or service
- Enter quantity and discount
- Choose a payment method
- Preview the receipt total

### `/app/products`

This page manages products and services.

Users should use it to:

- Add products or services
- Track SKU and category
- Set cost and selling price
- Enter stock quantity
- Set reorder levels
- Review the catalogue

### `/app/inventory`

This page manages stock movement and inventory health.

Users should use it to:

- Record stock-in and stock-out movement
- Adjust damaged or missing items
- Track reorder levels
- Review low-stock items
- See recent stock history

### `/app/customers`

This page manages customer records and follow-ups.

Users should use it to:

- Add customer contact details
- Track phone numbers and email addresses
- Store notes and tags
- Review customer balances
- Identify customers who may need follow-up

### `/app/expenses`

This page records and reviews expenses in Naira.

Users should use it to:

- Add vendor expenses
- Categorize spending
- Track recurring costs
- Review monthly expense totals
- Understand what costs may need attention

Recommended Nigerian SME expense categories include logistics, fuel, electricity, internet/data, salaries, rent, advertising, packaging, stock purchases, bank charges, and miscellaneous.

### `/app/finance`

This page gives a Nigerian SME-focused financial snapshot.

Users should use it to:

- Review revenue
- Review expenses
- Estimate gross profit
- Track outstanding payments
- Compare key financial indicators

Velico is not an accountant, tax professional, or licensed financial adviser. Finance views are operating indicators.

### `/app/invoices`

This page manages invoices and receivables.

Users should use it to:

- Create invoices
- Track due dates
- See overdue invoices
- Review outstanding customer balances
- Prepare payment follow-ups

### `/app/reports`

This page summarizes business performance.

Users should use it to:

- Review sales summaries
- Review expense breakdowns
- Understand inventory value
- Track profit estimates
- Prepare exports and reports

### `/app/analytics`

This page redirects to `/app/reports`. Analytics currently lives inside Reports.

### `/app/ai` - Velico AI

This is the Velico AI Business and Marketing Advisor.

Users can ask questions such as:

- How did my business perform today?
- How much profit did I make this week?
- Why did my expenses increase?
- What should I restock this week?
- Which customers should I follow up with?
- What WhatsApp message should I send customers this week?
- What Instagram content should I post?
- How should I price or promote this product?
- How can I get more repeat customers?
- What should I focus on today?

Velico AI uses authorized business context. If real data or AI provider credentials are unavailable, it falls back to local rule-based advice and demo/setup context. The advisor can answer operations, marketing, pricing, customer retention, social commerce, and growth strategy questions while avoiding fabricated metrics.

### `/app/ai-advisor`

This route redirects to `/app/ai`.

### `/app/staff`

This page tracks staff performance.

Users should use it to:

- Compare staff revenue generated
- Review orders handled
- Track conversion rate
- Spot coaching needs
- Understand who is performing strongly

### `/app/automations`

This page prepares rule-based automations.

Users should use it to create rules such as:

- When stock is low, create a notification
- When a customer has not purchased for some time, add a follow-up task
- When an order stays pending too long, flag it
- When expenses exceed a threshold, generate an AI recommendation
- When payment becomes overdue, create a reminder

Future channels may include WhatsApp, SMS, email, and push notifications.

### `/app/integrations`

This page focuses on easy social commerce link connections:

- WhatsApp Business
- Instagram
- Facebook Page
- TikTok
- X / Twitter
- LinkedIn
- YouTube
- Website / storefront

The current integrations workspace includes:

- Channel selection for all listed social channels.
- Business or display name capture.
- WhatsApp link or phone number capture, with optional default customer message.
- Instagram, Facebook, TikTok, X, LinkedIn, YouTube, website, or storefront link/handle capture.
- Automatic customer-facing link preparation.
- Test-link, copy-link, edit, and remove actions.
- Save, update, and remove connected channel details in `localStorage`.

For normal business use, users do not need a Meta developer account. They can connect WhatsApp by adding a `wa.me` link, WhatsApp Business short link, or phone number with country code. They can connect Instagram by adding the profile URL or username.

Advanced Meta webhook endpoints also exist for future automation work:

```bash
/api/integrations/meta/whatsapp/webhook
/api/integrations/meta/instagram/webhook
/api/integrations/meta/facebook/webhook
/api/integrations/meta/business/webhook
```

The `GET` handler responds to Meta webhook verification requests. The `POST` handler acknowledges incoming events so live provider testing has a valid endpoint while persistence and event processing are added.

Required for live Meta setup:

- `META_WEBHOOK_VERIFY_TOKEN`
- Optional provider-specific tokens:
  - `META_WHATSAPP_WEBHOOK_VERIFY_TOKEN`
  - `META_INSTAGRAM_WEBHOOK_VERIFY_TOKEN`
  - `META_FACEBOOK_WEBHOOK_VERIFY_TOKEN`
- `META_APP_ID`
- `META_APP_SECRET`

For local webhook testing with Meta, expose `localhost` through a public tunnel and use that public URL as the callback URL in the Meta App Dashboard.

## Workspace Interface

The protected workspace uses a shared shell in `src/components/layout/app-shell.tsx`.

The shell is organized for daily use:

- A grouped sidebar separates Command, Operations, Money, Growth, and Workspace areas.
- The header keeps the current user, plan, theme toggle, sign out, and primary actions visible.
- A quick-action strip gives fast access to new sales, expenses, products, invoices, and Velico AI.
- Mobile users get the same grouped navigation through the drawer menu.

When adding new workspace pages, add the route to `src/lib/velico/navigation.ts` with the right `group` so it appears in the correct sidebar section.

### `/app/notifications`

This page manages alerts and notification preferences.

Users should use it to:

- Review low-stock alerts
- Review invoice reminders
- Review AI summary notifications
- Configure alert preferences

### `/app/team`

This page manages team members and permissions.

Users should use it to:

- Invite teammates
- Assign roles
- Track active and pending users
- Prepare access-control workflows

### `/app/billing`

This page manages subscription plans and Paystack checkout.

Users should use it to:

- View the current plan
- Choose Starter, Growth, or Business
- Start Paystack checkout
- Review billing events

If Firebase Admin credentials are missing, billing uses setup mode instead of crashing. Paid subscriptions can only be saved permanently when Firebase Admin credentials are configured.

### `/app/settings`

This page manages workspace settings.

Users should use it to:

- Update business profile settings
- Set invoice prefix and sequence
- Confirm currency
- Configure tax labels
- Review workspace controls

### `/app/onboarding`

This page collects Nigerian business setup details.

It asks for:

- Business name
- Business type
- Industry
- Country
- Currency
- State
- City
- Phone number
- Number of staff
- Products or services
- Monthly revenue range
- Main sales channel
- Main business goal

## Plans And How Users Use Velico

### Free / Trial

Best for users who want to test Velico before committing.

Typical usage:

- Open the demo workspace
- Explore the dashboard
- Try basic sales, products, customers, expenses, invoices, and AI advisor flows
- Understand whether Velico fits the business

Limitations:

- Intended for trial or limited access
- Not designed for long-term full business operations
- Advanced usage, staff workflows, automation, and higher AI limits belong in paid plans

### Starter - NGN 5,000/month or NGN 50,000/year

Best for solo business owners and very small businesses.

Good fit for:

- Freelancers
- Small service businesses
- Solo online vendors
- Small retail shops
- Early Instagram or WhatsApp sellers

Recommended usage:

- Use Dashboard daily to check revenue, expenses, low stock, and outstanding payments
- Use Sales / Orders to record transactions
- Use Products and Inventory to avoid running out of stock
- Use Customers to keep phone numbers, notes, and balances
- Use Expenses and Finance to understand cash movement
- Use Velico AI for simple daily questions and focus recommendations

Starter should help one owner move away from scattered notebooks and spreadsheets.

### Growth - NGN 12,000/month or NGN 120,000/year

Best for growing businesses with more sales activity, more staff, and more frequent AI usage.

Good fit for:

- Active online vendors
- Growing retail stores
- Small agencies
- Service businesses with staff
- Businesses taking orders from multiple channels

Recommended usage:

- Use Dashboard as the daily command center
- Use Sales / Orders, Customers, and Invoices together to track revenue and receivables
- Use Staff to compare team activity and conversion
- Use Finance to review expenses, profit estimates, and payment gaps
- Use Reports to review weekly and monthly performance
- Use Velico AI to ask deeper operational questions
- Use Notifications to stay aware of stock and debt issues

Growth should help owners stop guessing and start managing from live operating signals.

### Business - NGN 30,000/month or NGN 300,000/year

Best for larger SMEs that need stronger controls, integrations, and priority support.

Good fit for:

- Larger retail operations
- Multi-staff service businesses
- Agencies with finance/admin roles
- E-commerce businesses with logistics needs
- Businesses preparing to connect multiple external systems

Recommended usage:

- Use Team and Staff to manage roles, access, and performance
- Use Automations to create follow-up and alert workflows
- Use Integrations to prepare Paystack, Flutterwave, bank transfer, WhatsApp, Instagram, Google Sheets, and commerce connections
- Use Reports and Finance for owner/manager review
- Use Velico AI for monthly summaries, risk detection, and operational recommendations
- Use Billing and Settings to keep the workspace controlled and up to date

Business should help teams operate with clearer ownership, stronger visibility, and fewer manual follow-ups.

## Local Setup

Install dependencies:

```bash
npm install
```

Create local environment values:

```bash
cp .env.example .env.local
```

Fill in Firebase browser values:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

Fill in Firebase Admin values for server-side persistence:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Do not prefix server-side service account secrets with `NEXT_PUBLIC_`.

Run the app:

```bash
npm run dev
```

## Firebase Setup

Enable:

- Firebase Authentication with email/password
- Cloud Firestore
- Firebase Storage

This workspace is configured for Firebase project `velico-626c8` in `.firebaserc`.

Deploy rules and indexes:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

The Firebase foundation supports:

- Organization-based multi-tenancy using `organizationId`
- Profiles, organizations, members, settings, products, inventory, customers, sales, expenses, invoices, notifications, AI conversations, billing, audit logs, and uploads
- Firestore Security Rules for authenticated organization membership
- Storage rules for organization file paths
- Seed plan configuration in `firebase/seed/plans.json`

## Paystack Billing

The billing screen initializes Paystack checkout from the server, verifies redirect references, and records billing events/subscription updates in Firestore when Firebase Admin credentials are configured.

Required for live payments:

- `PAYSTACK_SECRET_KEY`
- `PAYSTACK_PUBLIC_KEY`
- `NEXT_PUBLIC_SITE_URL`

Paystack webhook URL:

```bash
https://your-domain.com/api/paystack/webhook
```

For local webhook testing, use a public tunnel URL because Paystack cannot deliver webhooks to `localhost`.

## Velico AI

Velico AI works in two modes:

1. Local rule-based mode when no AI provider key is configured.
2. OpenAI-compatible provider mode when API credentials are configured.

Environment values:

- `AI_PROVIDER`
- `AI_PROVIDER_BASE_URL`
- `AI_PROVIDER_MODEL`
- `AI_PROVIDER_API_KEY`
- `GROQ_API_KEY`

Current defaults are Groq-compatible:

- `AI_PROVIDER=groq`
- `AI_PROVIDER_BASE_URL=https://api.groq.com/openai/v1`
- `AI_PROVIDER_MODEL=meta-llama/llama-4-maverick-17b-128e-instruct`

Velico AI should:

- Use only authorized workspace data
- Explain when data is limited
- Answer business, marketing, pricing, retention, content, WhatsApp, Instagram, and Facebook questions
- Include audience, offer, channel, message angle, and metrics when giving marketing advice
- Avoid fabricating metrics
- Provide practical business guidance
- Avoid claiming to be an accountant, lawyer, tax professional, or licensed financial adviser

## Security Principles

Velico must:

- Keep each business's data isolated
- Use organization membership checks
- Protect sensitive API keys
- Validate server-side actions
- Respect Firestore and Storage rules
- Prevent AI from accessing another business's data
- Avoid fake integration data

## Verification Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Current Implementation Status

The app currently includes a polished UI shell, public marketing pages, auth screens, onboarding, dashboard command center, module pages, demo data states, Firebase foundations, Paystack checkout wiring, and Velico AI local/provider modes.

Several modules are implementation-ready but still use demo/setup states until full persistence and external integrations are connected. This is intentional so the application stays usable and honest while features are built incrementally.

## Roadmap

Priority 1:

- Dashboard command center
- Customers
- Sales / Orders
- Inventory
- Finance
- Velico AI Advisor

Priority 2:

- Business Score
- Morning Brief
- AI recommendations
- Customer intelligence
- Staff analytics

Priority 3:

- Forecasting
- Automation execution
- Nigerian integrations
- Advanced analytics
- Exports and notification channels
