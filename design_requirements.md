Decision Memory MVP - Frontend Features & Visual Design Guide
Complete UI/UX Specification for Public Launch
📋 TABLE OF CONTENTS
Landing Page
 - Visual Design & Features
Dashboard
 - Visual Design & Features
Decision Creation Flow
 - Visual Design & Features
Decision Detail Page
 - Visual Design & Features
Onboarding Experience
 - Visual Design & Features
Settings Pages
 - Visual Design & Features
Upgrade/Paywall Modals
 - Visual Design & Features
Phase 2-5 Feature Updates
 - Visual Design & Features
Design System Reference
Mobile Responsive Behavior
🎨 1. LANDING PAGE - Visual Design & Features
Hero Section
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                        [Pricing] [Sign In] [Sign Up]│
├─────────────────────────────────────────────────────────────┤
│                                                               │
│          ⚡ Now in Public Beta (animated badge)              │
│                                                               │
│                  GitHub for Decisions                         │
│            [Massive bold text, 60px font]                     │
│                                                               │
│     Stop repeating expensive mistakes. Log decisions,         │
│          track outcomes, and learn from regret.               │
│            [Subheading, 24px, gray-600]                       │
│                                                               │
│   [Start Logging Decisions Free →]  [Watch Demo (2 min)]    │
│        [Blue button, large]          [Outline button]        │
│                                                               │
│         Used by 300+ founders • 5,000+ decisions tracked      │
│                   [Small text, gray-500]                      │
│                                                               │
│              ┌─────────────────────────┐                      │
│              │                         │                      │
│              │  [Dashboard Screenshot] │                      │
│              │   With subtle shadow    │                      │
│              │   Rounded corners       │                      │
│              └─────────────────────────┘                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Gradient background
: Light blue (#eff6ff) fading to white
Animated badge
: Pulsing green dot + "Now in Public Beta" text
Large headline
: 60px bold, dark gray (#111827)
Screenshot
: Actual dashboard with blurred sensitive data, 8px rounded corners
Sticky header
: Becomes fixed on scroll with subtle shadow
Problem Section
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│           Founders Make Fast Decisions.                       │
│                Then Forget Why.                               │
│              [Heading, 36px, centered]                        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   🚨 Icon    │  │   💬 Icon    │  │   🔄 Icon    │       │
│  │              │  │              │  │              │       │
│  │  Decision    │  │ Co-Founder   │  │   Repeat     │       │
│  │   Amnesia    │  │  Arguments   │  │  Mistakes    │       │
│  │              │  │              │  │              │       │
│  │ You switched │  │ Different    │  │ Same pricing │       │
│  │ tools 6mo    │  │ memories of  │  │ mistake 3x   │       │
│  │ ago. Now     │  │ decisions.   │  │ because you  │       │
│  │ switching    │  │ Waste hours  │  │ forgot the   │       │
│  │ back.        │  │ arguing.     │  │ lesson.      │       │
│  │              │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│   [Light gray     [Light gray      [Light gray             │
│    background,     background,      background,            │
│    red icon,       red icon,        red icon,              │
│    rounded card]   rounded card]    rounded card]          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
3-column grid
 on desktop, stacks on mobile
Icon badges
: Large circular icons (48px) with red background
Card hover effect
: Subtle lift on hover (shadow increases)
Gray background section
: Contrasts with white hero
Features/Solution Section
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│    What If Every Decision Was Logged,                        │
│        Reviewable, and Learned From?                          │
│              [Heading, 36px, centered]                        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  📝 Icon     │  │  📊 Icon     │  │  🧠 Icon     │       │
│  │  (blue bg)   │  │  (blue bg)   │  │  (blue bg)   │       │
│  │              │  │              │  │              │       │
│  │ Structured   │  │   Regret     │  │     AI       │       │
│  │  Decision    │  │  Analysis    │  │  Insights    │       │
│  │     Log      │  │              │  │              │       │
│  │              │  │              │  │              │       │
│  │ Capture      │  │ Mark failed. │  │ Alerts when  │       │
│  │ context,     │  │ Analyze what │  │ repeating    │       │
│  │ alternatives,│  │ went wrong.  │  │ mistakes.    │       │
│  │ assumptions. │  │ Learn        │  │ See decision │       │
│  │              │  │ patterns.    │  │ blindspots.  │       │
│  │              │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│   [White cards,   [White cards,    [White cards,           │
│    blue icons,     blue icons,      blue icons,            │
│    shadow,         shadow,          shadow,                │
│    hover grows]    hover grows]     hover grows]           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
White cards on gray background
Icon badges
: Blue gradient background (#3b82f6)
Card animation
: Slight scale on hover (transform: scale(1.02))
Box shadow
: Soft shadow that intensifies on hover
How It Works (NEW)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                    How It Works                               │
│              [Heading, 36px, centered]                        │
│                                                               │
│  ┌────┐         ┌────┐         ┌────┐         ┌────┐        │
│  │ 1  │────────▶│ 2  │────────▶│ 3  │────────▶│ 4  │        │
│  └────┘         └────┘         └────┘         └────┘        │
│                                                               │
│   Log             Add           Update          Get AI        │
│ Decision        Context         Outcome        Insights       │
│                                                               │
│ Create a        Capture why,    Mark as         Pattern       │
│ decision in     alternatives,   succeeded/      detection     │
│ 60 seconds      assumptions     failed          unlocks at    │
│                                                 20 decisions   │
│                                                               │
│                   [Screenshot of each step]                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
4-step timeline
 with connecting arrows
Numbered circles
: Blue background, white text
Mini screenshots
: Show actual UI for each step
Progressive disclosure
: Hover to expand screenshot
Social Proof Section
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              What Founders Are Saying                         │
│              [Heading, 36px, centered]                        │
│                                                               │
│  ┌──────────────────────────────────────────────────┐        │
│  │ "This saved me from switching tools AGAIN.       │        │
│  │  I logged my Stripe→Paddle decision and when I   │        │
│  │  wanted to switch back, the log reminded me why  │        │
│  │  I left. Saved me $5k and 2 weeks."              │        │
│  │                                                   │        │
│  │  [Avatar] Sarah Chen                              │        │
│  │           Founder, TaskFlow                       │        │
│  └──────────────────────────────────────────────────┘        │
│                                                               │
│  [2 more testimonial cards in same format]                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
3 testimonial cards
 with real founder photos
Quote marks
: Large, subtle gray
Avatar + Name + Company
: Bottom left of card
Rotating carousel
: Auto-rotates every 5 seconds
Pricing Section
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              Simple, Transparent Pricing                      │
│              [Heading, 36px, centered]                        │
│          Start free. Upgrade when you're ready.               │
│                  [Subheading, gray]                           │
│                                                               │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐               │
│  │   Free   │  │     Pro      │  │   Team   │               │
│  │          │  │ [MOST POPULAR│  │          │               │
│  │          │  │   badge]     │  │          │               │
│  │   $0     │  │    $15       │  │   $49    │               │
│  │          │  │   /month     │  │  /month  │               │
│  │          │  │              │  │          │               │
│  │ 25 max   │  │  Unlimited   │  │ 5 users  │               │
│  │ 1 user   │  │  Full AI     │  │ Team     │               │
│  │ Basic AI │  │  Export      │  │ insights │               │
│  │          │  │              │  │          │               │
│  │[Start]   │  │[Start Trial] │  │[Start]   │               │
│  │ Free     │  │  (outlined   │  │ Free     │               │
│  │          │  │   in blue,   │  │          │               │
│  │          │  │   elevated)  │  │          │               │
│  │          │  │              │  │          │               │
│  │ ✓ Item   │  │ ✓ All Free+  │  │ ✓ All    │               │
│  │ ✓ Item   │  │ ✓ Item       │  │   Pro+   │               │
│  │ ✓ Item   │  │ ✓ Item       │  │ ✓ Item   │               │
│  └──────────┘  └──────────────┘  └──────────┘               │
│   [White      [Blue border,     [White                      │
│    card]       shadow, larger]   card]                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
3 pricing tiers
 side by side
"Most Popular" badge
: Yellow/gold on Pro tier
Pro tier highlighted
: Blue border, larger card, lifted shadow
Checkmark list
: Green checkmarks, features listed
Annual toggle
: Switch between monthly/annual (shows 17% savings)
CTA Section
Visual Design
┌─────────────────────────────────────────────────────────────┐
│           [Full-width blue gradient background]              │
│                                                               │
│          Ready to Stop Repeating Mistakes?                    │
│              [Large white text, 42px]                         │
│                                                               │
│    Join 300+ founders building decision intelligence.         │
│                  [White text, 18px]                           │
│                                                               │
│         [Start Logging Decisions Free →]                      │
│            [Large white button with                           │
│             black text, shadow]                               │
│                                                               │
│                No credit card required                        │
│                   [Small white text]                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Full-width section
: Blue gradient background (#3b82f6 to #2563eb)
White text
: High contrast
Large CTA button
: White background, black text, glows on hover
Trust signal
: "No credit card required" below button
Footer
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [Logo]                                                       │
│  Decision Memory                                              │
│  GitHub for Decisions                                         │
│                                                               │
│  Product          Company          Legal          Social      │
│  • Features       • About          • Privacy      🐦 Twitter  │
│  • Pricing        • Blog           • Terms        💼 LinkedIn │
│  • Demo           • Contact        • Refunds                  │
│                                                               │
│  ────────────────────────────────────────────────────────────│
│                                                               │
│  © 2025 Decision Memory. All rights reserved.                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Dark footer
: Gray-900 background, white/gray text
4-column layout
: Links organized by category
Logo + tagline
: Left side
Social icons
: Subtle hover effect (color change)
📊 2. DASHBOARD - Visual Design & Features
Top Navigation Bar
Visual Design
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Decision Memory                        [🔔] [Avatar]  │
│                                               Notif  Menu    │
│ ─────────────────────────────────────────────────────────────│
│ Dashboard | Insights | Settings                              │
│ [Active tab underlined in blue]                              │
└─────────────────────────────────────────────────────────────┘
Features:
Sticky header
: Always visible on scroll
Logo clickable
: Returns to dashboard
Tab navigation
: Active tab has blue underline
Notification bell
: Red dot if unread notifications
User avatar dropdown
: Profile, Settings, Sign Out
Dashboard Header
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Your Decisions                    [+ New Decision]          │
│  [Large heading]                   [Blue button, prominent]  │
│  47 decisions logged                                          │
│  [Gray subtext]                                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Decision count
: Updates live
New Decision button
: Primary CTA, always visible
Breadcrumbs
 (not shown): Home > Dashboard
Onboarding Checklist (First 5 Decisions)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  🎯 Get Started Checklist                           [Dismiss]│
│                                                               │
│  ☑ Log your first decision (Done!)                           │
│  ☐ Add assumptions and alternatives                          │
│  ☐ Log 2 more decisions this week                            │
│  ☐ Update outcome on 1 decision                              │
│                                                               │
│  Progress: 1/4 ▓▓░░░░░░░░░░ 25%                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Yellow/gold background
: Stands out but not aggressive
Checkmarks animate
: When user completes a step
Progress bar
: Visual feedback
Dismissible
: X button top-right
Only shows for first 5 decisions
: Then auto-hides
Search & Filters Bar
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [🔍 Search decisions...]      [Status ▼] [Category ▼]       │
│  [Full-width input]            [Dropdown]  [Dropdown]        │
│                                                               │
│  [Active filters shown as removable tags below]              │
│  Status: Failed [x]  Category: Product [x]  [Clear All]      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Search box
: Magnifying glass icon, real-time filtering
Dropdown filters
: Status, Category, Date Range
Active filter tags
: Shown as blue badges with X to remove
Clear All button
: Removes all filters at once
Sticky on scroll
: Becomes fixed when scrolling decision list
Decision List View
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [SUCCEEDED] [PRODUCT]                            [⋮]    │ │
│  │                                                         │ │
│  │ Switch from Heroku to Railway                          │ │
│  │ [Title, large, bold, clickable]                        │ │
│  │                                                         │ │
│  │ Heroku's pricing increased 40%. Our monthly bill      │ │
│  │ hit $400. We need a cheaper alternative...            │ │
│  │ [Context preview, 2 lines max, gray text]             │ │
│  │                                                         │ │
│  │ Made 3 days ago  [pricing] [migration] [cost-saving]  │ │
│  │ [Timestamp]      [Tag badges]                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  [More decision cards...]                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features Per Card:
Status badge
: Top-left, color-coded (green=success, red=failed, yellow=active)
Category badge
: Next to status
3-dot menu
: Top-right, reveals Edit/Delete/Duplicate
Title
: Large, bold, dark text, clickable
Context preview
: Truncated to 2 lines with "..."
Timestamp
: Human-readable ("3 days ago")
Tags
: Max 3 shown, blue rounded badges
Card hover effect
: Lifts with shadow, cursor becomes pointer
Empty state
 (0 decisions): 
┌────────────────────────────────────────┐│         [Illustration/Icon]            ││                                        ││    No decisions logged yet             ││                                        ││    Log your first decision to start    ││    building decision intelligence.     ││                                        ││    [Create Your First Decision]        ││         [Blue button]                  │└────────────────────────────────────────┘
Pagination/Load More
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                    [Load More Decisions]                      │
│                    [Outline button]                           │
│                                                               │
│                  Showing 20 of 47 decisions                   │
│                     [Small gray text]                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Load More button
: Appears after 20 decisions
Count indicator
: "Showing X of Y"
Smooth scroll
: After loading more, scrolls to new content
Quick Stats (Top of Dashboard, Optional)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │    47    │  │    65%   │  │    12    │  │    3     │    │
│  │ Decisions│  │ Success  │  │  Active  │  │  Failed  │    │
│  │  Logged  │  │   Rate   │  │ Decisions│  │ This Mo  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  [Gray cards]  [Green card]  [Yellow card] [Red card]      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
4 stat cards
: Total, success rate, active count, recent failures
Color-coded
: Green for success, red for failures, yellow for active
Large numbers
: 36px bold
Small labels
: 14px gray
Animated counters
: Numbers count up on page load
✍️ 3. DECISION CREATION - Visual Design & Features
Create Decision Page Layout
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [← Back]                                                     │
│                                                               │
│  Create Decision                                              │
│  [Large heading]                                              │
│  Log a new decision with context, alternatives, assumptions.  │
│  [Subheading, gray]                                           │
│                                                               │
│  [Progress indicator - Optional]                              │
│  Basic Info ● Details ○ Review ○                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Back button
: Returns to dashboard
Progress dots
: Shows which step user is on (multi-step form)
Auto-save indicator
: "Draft saved 5 seconds ago" (top-right)
Form Section 1: Basic Information
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Basic Information                                    │   │
│  │  [Card header]                                        │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  Decision Title *                                     │   │
│  │  [────────────────────────────────────────────────]  │   │
│  │  e.g., Switch from Mailchimp to ConvertKit           │   │
│  │  47/120 characters                                    │   │
│  │  [Character count, gray, small]                       │   │
│  │                                                       │   │
│  │  Category *                                           │   │
│  │  [Select dropdown ▼]                                  │   │
│  │                                                       │   │
│  │  What did you decide? *                               │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ In 1-2 sentences, what did you choose?          │ │   │
│  │  │                                                  │ │   │
│  │  │                                                  │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  │  123/500 characters                                   │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
Features:
White card with border
: Clean, contained
Required field asterisks
: Red *
Placeholder text
: Light gray, helpful examples
Character counters
: Live update, turn red when near limit
Input validation
: Red border + error message if invalid
Tooltips
: Hover over field labels for help text
Form Section 2: Context & Reasoning
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Context & Reasoning                                  │   │
│  │  [Card header]                                        │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  Why are you making this decision? *                  │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ [B] [I] [U] [•] [1.] [Link]                     │ │   │
│  │  │ ──────────────────────────────────────────────  │ │   │
│  │  │                                                  │ │   │
│  │  │ Our email open rates dropped 20% last month.    │ │   │
│  │  │ We need better deliverability...                │ │   │
│  │  │                                                  │ │   │
│  │  │                                                  │ │   │
│  │  │                                                  │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  │  [Rich text editor with formatting toolbar]          │   │
│  │  387/2000 characters                                  │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
Features:
Rich text editor
: Bold, italic, lists, links
Formatting toolbar
: Sticky when scrolling
Autosave
: Saves draft every 10 seconds
Markdown support
 (optional): Can paste markdown
Expand to full screen
: Icon to maximize editor
Form Section 3: Alternatives Considered
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Alternatives Considered                              │   │
│  │  What other options did you consider?                 │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Alternative 1                          [×]     │  │   │
│  │  │  ──────────────────────────────────────────────│  │   │
│  │  │  Name: [Mailchimp________________]             │  │   │
│  │  │                                                 │  │   │
│  │  │  Why rejected?                                  │  │   │
│  │  │  ┌───────────────────────────────────────────┐ │  │   │
│  │  │  │ Too expensive for our scale. Would cost   │ │  │   │
│  │  │  │ $200/month vs $50 for ConvertKit.         │ │  │   │
│  │  │  └───────────────────────────────────────────┘ │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  [Light gray background, rounded, padding]           │   │
│  │                                                       │   │
│  │  [+ Add Alternative]                                  │   │
│  │  [Outline button, full width]                         │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
Features:
Nested cards
: Each alternative in its own container
Remove button
: X icon top-right, confirms before deleting
Add button
: Adds new alternative field
Drag to reorder
 (Phase 2): Drag handle icon
Minimum 1 alternative
: Can't remove last one
Collapse/Expand
 (optional): If many alternatives
Form Section 4: Key Assumptions
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Key Assumptions                                      │   │
│  │  What are you assuming will be true?                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  1. [We'll send 50k emails/mo within 6 months___] [×]│   │
│  │                                                       │   │
│  │  2. [Team will learn new tool in 1 week_________] [×]│   │
│  │                                                       │   │
│  │  [+ Add Assumption]                                   │   │
│  │  [Outline button]                                     │   │
│  │                                                       │   │
│  │  💡 Tip: Be specific. "Revenue will grow" is vague.  │   │
│  │      "Revenue will grow 20% in Q2" is better.         │   │
│  │  [Info box with light blue background]                │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
Features:
Numbered list
: Auto-numbers each assumption
Inline X button
: Remove assumption
Minimum 2 assumptions
: Can't submit with fewer
Helper tip
: Blue info box with writing tips
AI suggestion
 (Phase 4): "This assumption seems vague. Be more specific?"
Form Section 5: Success Criteria
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Success Criteria                                     │   │
│  │  How will you know if this worked?                    │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  1. [Open rate improves by 10%___________________] [×]│   │
│  │                                                       │   │
│  │  2. [Setup takes less than 8 hours______________] [×]│   │
│  │                                                       │   │
│  │  [+ Add Criterion]                                    │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
Features:
Same pattern as assumptions
: Numbered, removable
Minimum 1 criterion
: Required
Placeholder examples
: "Revenue increases by X%" etc.
Form Section 6: Optional Details (Collapsible)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Optional Details                            [▼ Show] │   │
│  │  [Collapsed by default, click to expand]              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  [When expanded:]                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Optional Details                            [▲ Hide] │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  [Estimated Impact ▼]  [Reversibility ▼]             │   │
│  │  [Low|Med|High|Crit]   [Easy|Mod|Hard|Irreversible]  │   │
│  │  [Two columns on desktop]                             │   │
│  │                                                       │   │
│  │  Confidence Level: 68%                                │   │
│  │  [━━━━━━━━━○━━━━━━]                                  │   │
│  │  [Slider, 0-100]                                      │   │
│  │                                                       │   │
│  │  When will you know if this worked?                   │   │
│  │  [📅 03/15/2025]                                      │   │
│  │  [Date picker]                                        │   │
│  │                                                       │   │
│  │  Budget Impact ($)                                    │   │
│  │  [500_________]                                       │   │
│  │                                                       │   │
│  │  Tags (comma-separated)                               │   │
│  │  [pricing, migration, cost-saving_____________]       │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
Features:
Collapsed by default
: Reduces visual clutter
Click to expand
: Smooth animation
Grid layout
: 2 columns on desktop, stacks on mobile
Slider for confidence
: Visual, satisfying interaction
Date picker
: Calendar overlay on click
Tag input
: Autocompletes from existing tags
Form Footer: Save Buttons
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│            [Cancel]              [Save Draft]   [Save & View] │
│         [Outline btn]           [Outline btn]   [Blue btn]   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Cancel
: Confirms if unsaved changes exist
Save Draft
: Saves with status=DRAFT, returns to dashboard
Save & View
: Saves and redirects to decision detail page
Keyboard shortcut
: Cmd/Ctrl+S to save draft
Sticky footer
 (mobile): Buttons always visible on mobile
Form Validation & Error States
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Decision Title *                                             │
│  [────────────────────────────────────────────────]           │
│  ⚠️ Title must be at least 5 characters                       │
│  [Red border on input, red error text below]                 │
│                                                               │
│  Key Assumptions *                                            │
│  1. [___________________________________________]             │
│  2. [___________________________________________]             │
│  ⚠️ At least 2 assumptions required                           │
│  [Red error text]                                             │
└─────────────────────────────────────────────────────────────┘
Features:
Real-time validation
: Checks as user types
Red borders
: Invalid fields highlighted
Error messages
: Specific, helpful (not "Invalid input")
Scroll to first error
: On submit, focuses first error field
Success states
 (optional): Green checkmark when field valid
AI Features During Creation
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  [While user types title...]                                 │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  🤖 AI Suggestions                                      │ │
│  │  ────────────────────────────────────────────────────  │ │
│  │  Suggested tags: pricing, email, migration              │ │
│  │  [Add] [Add] [Add]                                      │ │
│  │                                                         │ │
│  │  Similar past decision:                                 │ │
│  │  "Switch from Sendgrid to Mailgun" (6 months ago)      │ │
│  │  → View this decision                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│  [Light blue background, appears after 3 seconds of typing] │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
AI tag suggestions
: Click to add tag
Similar decision detection
: Warns of potential duplicate
Assumption quality check
 (Phase 4): "This assumption is vague"
Dismissible
: X to close suggestions
Non-blocking
: Doesn't interrupt typing
📖 4. DECISION DETAIL PAGE - Visual Design & Features
Page Header
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  [← Back to Dashboard]                                        │
│                                                               │
│  Switch from Heroku to Railway                                │
│  [Large heading, editable on click]                           │
│                                                               │
│  [SUCCEEDED] [TECH]    Made 3 days ago by You    [⋮ Menu]    │
│  [Status]    [Cat]     [Timestamp + Creator]     [Actions]   │
│                                                               │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Back button
: Returns to dashboard
Title inline edit
: Click to edit, save with checkmark
Status dropdown
: Click to change status (Active → Succeeded/Failed)
3-dot menu
: Edit, Duplicate, Delete, Export PDF
Metadata row
: Timestamp, creator name/avatar
Main Content: Decision Data
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  The Decision                                                 │
│  [Section heading]                                            │
│  ─────────────────────────────────────────────────────────── │
│  We're migrating all services from Heroku to Railway.        │
│  Migration to be completed in 2 weeks.                        │
│  [Text, regular weight]                                       │
│                                                               │
│  Context                                                      │
│  [Section heading]                                            │
│  ─────────────────────────────────────────────────────────── │
│  Heroku's pricing increased 40%. Our monthly bill hit        │
│  $400. We need a cheaper alternative that still offers       │
│  good developer experience.                                   │
│  [Formatted text, may have bold/italic/lists]                │
│                                                               │
│  Alternatives Considered                                      │
│  [Section heading]                                            │
│  ─────────────────────────────────────────────────────────── │
│  1. Stay on Heroku                                            │
│     → Too expensive at scale. Would hit $800/mo by EOY.       │
│                                                               │
│  2. Self-host on AWS                                          │
│     → Too much ops overhead for 2-person team.                │
│                                                               │
│  3. Railway ✓ [Chosen badge]                                  │
│     → Best balance of cost ($50/mo) and DX.                   │
│  [Numbered list, chosen one highlighted]                     │
│                                                               │
│  Key Assumptions                                              │
│  [Section heading]                                            │
│  ───────────────────────────────────────
──────────────────── │
│  1. Migration will take <2 weeks                              │
│     ✓ VALIDATED AS TRUE                                       │
│     [Green badge, if outcome updated]                         │
│                                                               │
│  2. Railway has comparable uptime to Heroku                   │
│     ❌ VALIDATED AS FALSE                                      │
│     [Red badge + note: "Had 2 outages in first month"]       │
│  [Assumptions with validation status]                        │
│                                                               │
│  Success Criteria                                             │
│  [Section heading]                                            │
│  ─────────────────────────────────────────────────────────── │
│  • All services running on Railway                            │
│  • Monthly bill <$100                                         │
│  • Zero downtime during migration                             │
│  [Bulleted list]                                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Clear sections
: Headings with divider lines
Validated assumptions
: Color-coded badges (green/red)
Chosen alternative
: Highlighted with checkmark
Read mode by default
: Clean, formatted display
Edit mode toggle
: Button to switch to edit form
Sidebar: Metadata & Actions
Visual Design
┌──────────────────────────────┐
│  Decision Details            │
│  ──────────────────────────  │
│                              │
│  📊 Impact: High             │
│  🔄 Reversibility: Moderate  │
│  🎯 Confidence: 85%          │
│  📅 Validate by: Mar 15      │
│  💰 Budget: $500             │
│                              │
│  Tags                        │
│  ──────────────────────────  │
│  [pricing] [migration]       │
│  [cost-saving]               │
│                              │
│  Actions                     │
│  ──────────────────────────  │
│  [Update Outcome]            │
│  [Full-width button]         │
│                              │
│  [Export as PDF]             │
│  [Outline button]            │
│                              │
│  Similar Decisions           │
│  ──────────────────────────  │
│  • Switch from AWS to GCP    │
│    (87% similar)             │
│  • Migrate to Vercel         │
│    (72% similar)             │
│  [Links to related decisions]│
│                              │
└──────────────────────────────┘
Features:
Sticky sidebar
: Stays visible on scroll
Icon metadata
: Visual icons for each field
Tag badges
: Clickable, filters dashboard by tag
Update Outcome CTA
: Primary action button
Similar decisions
: AI-powered, shows similarity %
Collapses on mobile
: Moves to bottom of page
Outcome Section (If Updated)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  ✅ Decision Outcome                                          │
│  [Section heading with success icon]                         │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  Status: SUCCEEDED                                            │
│  Reviewed on: Jan 28, 2025 by You                            │
│                                                               │
│  What Happened?                                               │
│  ─────────────────────────────────────────────────────────── │
│  Migration completed in 10 days (faster than expected).      │
│  All services running smoothly on Railway. Monthly bill      │
│  dropped from $400 to $62. Team is happy with the DX.        │
│                                                               │
│  Assumption Validation                                        │
│  ─────────────────────────────────────────────────────────── │
│  [Shows validated assumptions from above]                    │
│                                                               │
│  Would you make this decision again?                          │
│  ─────────────────────────────────────────────────────────── │
│  ✅ Yes, absolutely.                                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Green success box
: If status = SUCCEEDED
Red failure box
: If status = FAILED or REVERSED
Timestamp
: When outcome was updated
Assumption recap
: Shows validation results
Formatted text
: Rich text editor content
Outcome Section (If FAILED)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  ❌ Decision Outcome                                          │
│  [Section heading with X icon]                               │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  Status: FAILED                                               │
│  Reviewed on: Jan 28, 2025 by You                            │
│                                                               │
│  What Went Wrong?                                             │
│  ─────────────────────────────────────────────────────────── │
│  Railway had 2 major outages in the first month, causing     │
│  downtime for our customers. Their support was slow to       │
│  respond. We're now evaluating other options.                │
│                                                               │
│  Root Cause: External Shock (unexpected outages)             │
│  Could we have known? Maybe - Unclear                         │
│  Cost of failure: Moderate ($1k-$10k in lost revenue)        │
│                                                               │
│  What We Learned                                              │
│  ─────────────────────────────────────────────────────────── │
│  Need to add "uptime SLA" and "support responsiveness"       │
│  as top criteria for infrastructure decisions. Should        │
│  have done a 30-day trial before full migration.             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Red failure box
: Visual distinction
Structured reflection
: Root cause, foreseeability, cost
Lessons learned
: Most important section
Suggestion
: "Want to log a new decision to fix this?"
Update Outcome Modal/Form
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Update Outcome                                         [×]   │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  What's the outcome of this decision?                         │
│  ○ Succeeded   ○ Failed   ○ Reversed                          │
│  [Radio buttons, large, clear]                                │
│                                                               │
│  [If Succeeded selected:]                                     │
│                                                               │
│  What Happened? *                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Did this decision achieve what you expected?            │ │
│  │                                                          │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Validate Your Assumptions                                    │
│  ─────────────────────────────────────────────────────────── │
│  1. Migration will take <2 weeks                              │
│     ○ True  ○ False  ○ Partially True  ○ Unknown             │
│                                                               │
│  2. Railway has comparable uptime                             │
│     ○ True  ○ False  ○ Partially True  ○ Unknown             │
│     Notes: [Had 2 outages_____]                              │
│                                                               │
│  Would you make this decision again?                          │
│  ○ Yes  ○ No  ○ Unsure                                        │
│                                                               │
│            [Cancel]              [Save Outcome]               │
│                                  [Blue button]                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Modal overlay
: Dims background
Form changes based on outcome
: Different fields for succeeded/failed
Assumption validation
: Each assumption gets radio buttons
Optional notes per assumption
: Text input for details
Required fields
: Must fill "What Happened?"
Save & close
: Returns to detail page with updated outcome
🎓 5. ONBOARDING EXPERIENCE - Visual Design & Features
Welcome Modal (First Login)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│               Welcome to Decision Memory! 👋                  │
│               [Large centered heading]                        │
│                                                               │
│         Let's get you started in 3 quick steps.               │
│              [Subheading, gray]                               │
│                                                               │
│                     [Next →]                                  │
│                  [Blue button]                                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Full-screen modal
: Can't be dismissed (required onboarding)
Clean, friendly design
: Not overwhelming
Single CTA
: Just "Next" button
Progress indicator
: "Step 1 of 3" at bottom
Onboarding Step 1: What is a Decision?
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                 What is a decision?                           │
│                 [Heading, 32px]                               │
│                                                               │
│  A decision is any choice that:                               │
│  • Affects your business                                      │
│  • You might regret later                                     │
│  • You want to learn from                                     │
│                                                               │
│  Examples:                                                    │
│  ✓ Switching from Heroku to Railway                           │
│  ✓ Hiring a senior engineer                                   │
│  ✓ Changing pricing from $49 to $99                           │
│                                                               │
│              [← Back]        [Next →]                         │
│                                                               │
│                   ● ○ ○                                        │
│              [Progress dots]                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Simple bullet points
: Easy to scan
Real examples
: Relatable to founders
Green checkmarks
: Visual reinforcement
Back/Next buttons
: Navigation
Progress dots
: Shows step 1 of 3
Onboarding Step 2: How It Works
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              How Decision Memory works                        │
│                                                               │
│  ┌────┐         ┌────┐         ┌────┐                        │
│  │ 1  │────────▶│ 2  │────────▶│ 3  │                        │
│  └────┘         └────┘         └────┘                        │
│                                                               │
│  Log            Update          Get AI                        │
│  Decision       Outcome         Insights                      │
│                                                               │
│  [Animated diagram showing the flow]                          │
│                                                               │
│              [← Back]        [Next →]                         │
│                                                               │
│                   ○ ● ○                                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Visual flow diagram
: Arrows animate in
Simple 3-step process
: Not overwhelming
Icons for each step
: Visual memory aids
Onboarding Step 3: Your First Decision
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              Let's log your first decision                    │
│                                                               │
│  Choose one:                                                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  📋 Use a demo decision                               │   │
│  │  We'll show you a pre-filled example so you can       │   │
│  │  see exactly how it works.                            │   │
│  │                                                        │   │
│  │  [Try the Demo]                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Card with border, clickable]                               │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ✍️ Log a real decision                                │   │
│  │  Start with a decision you made in the past week.     │   │
│  │  It only takes 2 minutes.                             │   │
│  │                                                        │   │
│  │  [Create My Own]                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  🔍 I'll explore on my own                             │   │
│  │  [Skip Onboarding]                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Subtle, less prominent]                                    │
│                                                               │
│                   ○ ○ ●                                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
3 clear options
: Demo, Real, Skip
Cards with hover effect
: Highlights on hover
Icons for each option
: Visual distinction
Skip option
: Less prominent but available
Choice persists
: If they pick demo, shows demo decision
Demo Decision View
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  [Read-only decision detail page]                            │
│                                                               │
│  Switch from Heroku to Railway                                │
│  [ACTIVE] [TECH]                                              │
│                                                               │
│  [Annotations pointing to different sections:]               │
│                                                               │
│  ┌──────────────────────────────────┐                        │
│  │ 👈 This is the decision          │                        │
│  │    One clear sentence.           │                        │
│  └──────────────────────────────────┘                        │
│                                                               │
│  Context: Heroku's pricing increased...                       │
│  ┌──────────────────────────────────┐                        │
│  │ 👈 This is the context           │                        │
│  │    WHY you're making this.       │                        │
│  └──────────────────────────────────┘                        │
│                                                               │
│  Alternatives:                                                │
│  1. Stay on Heroku → Too expensive                            │
│  ┌──────────────────────────────────┐                        │
│  │ 👈 Alternatives you considered   │                        │
│  │    but rejected.                 │                        │
│  └──────────────────────────────────┘                        │
│                                                               │
│  [Continue through all sections with annotations]            │
│                                                               │
│                [Got it! Create My Own →]                      │
│                     [Blue button]                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Read-only view
: Can't edit demo
Floating annotations
: Explain each section
Tooltips on hover
: Additional help
CTA at bottom
: "Create My Own" takes them to blank form
Exit option
: "Skip to Dashboard" link
Onboarding Checklist (Dashboard)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  🎯 Get Started Checklist                           [Dismiss]│
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  ☑ Log your first decision (Done!)                           │
│  ☐ Add assumptions and alternatives                          │
│  ☐ Log 2 more decisions this week                            │
│  ☐ Update outcome on 1 decision                              │
│                                                               │
│  Progress: 1/4 ▓▓░░░░░░░░░░ 25%                             │
│                                                               │
│  [Tooltip on hover: "Add assumptions to your first decision"]│
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Yellow/gold background
: Gentle, inviting color
Checkmarks animate
: When completed
Progress bar
: Visual motivation
Hover tooltips
: How to complete each step
Click to jump
: Clicking uncompleted item opens relevant page
Auto-dismisses
: After all 4 completed, or after 30 days
Dismissible
: X button, asks "Are you sure?"
Empty State Prompts
Visual Design (0 Decisions)
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│               [Illustration: Empty folder]                    │
│                                                               │
│              No decisions logged yet                          │
│                                                               │
│         Log your first decision to start building             │
│              decision intelligence.                           │
│                                                               │
│            [Create Your First Decision]                       │
│                 [Blue button]                                 │
│                                                               │
│                 or [Watch Demo]                               │
│                   [Link]                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Friendly illustration
: Not intimidating
Clear CTA
: Prominent button
Secondary option
: Watch demo link
Centered layout
: Focus on action
⚙️ 6. SETTINGS PAGES - Visual Design & Features
Settings Navigation (Tabs)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Settings                                                     │
│  [Large heading]                                              │
│                                                               │
│  [Profile] [Workspace] [Billing] [Notifications]             │
│  [Active tab underlined in blue]                             │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  [Content area for selected tab]                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Tab navigation
: Easy to switch between settings
Active indicator
: Blue underline
URL changes
: /settings/profile, /settings/billing, etc.
Profile Settings
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Profile Settings                                             │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  ┌─────┐                                                      │
│  │     │  [Change Photo]                                      │
│  │ JD  │  [Upload button]                                     │
│  └─────┘                                                      │
│  [Avatar, 80px]                                               │
│                                                               │
│  Name                                                         │
│  [John Doe_____________________]                              │
│                                                               │
│  Email                                                        │
│  john@example.com                                             │
│  [Read-only, gray background]                                 │
│  [Change Email] [Link]                                        │
│                                                               │
│  Timezone                                                     │
│  [(GMT-5:00) Eastern Time ▼]                                 │
│  [Dropdown]                                                   │
│                                                               │
│               [Save Changes]                                  │
│               [Blue button]                                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Avatar upload
: Click to upload, shows preview
Email is read-only
: Must verify change via link
Timezone selector
: For accurate timestamps
Save button
: Only enabled if changes made
Success toast
: "Profile updated" after save
Workspace Settings
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Workspace Settings                                           │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  Workspace Name                                               │
│  [John's Workspace________________]                           │
│                                                               │
│  [Save Changes]                                               │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  Danger Zone                                                  │
│  [Red heading]                                                │
│                                                               │
│  Delete Workspace                                             │
│  Once you delete a workspace, there is no going back.        │
│  This will delete all decisions and data.                     │
│                                                               │
│  [Delete Workspace]                                           │
│  [Red outline button]                                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Simple workspace name edit
: Only setting for now
Danger zone
: Red border around delete section
Delete confirmation
: Modal asks "Are you sure? Type workspace name to confirm"
Only for workspace creators
: Members can't delete
Billing Settings
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Billing                                                      │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  Current Plan: Free                                           │
│  [Badge]                                                      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  You're on the Free plan                              │   │
│  │                                                        │   │
│  │  • 25 decision limit                                   │   │
│  │  • 1 user                                              │   │
│  │  • Basic AI features                                   │   │
│  │                                                        │   │
│  │  17/25 decisions used                                  │   │
│  │  [████████░░░░░] 68%                                   │   │
│  │                                                        │   │
│  │  [Upgrade to Pro] [Upgrade to Team]                    │   │
│  │  [Blue button]    [Blue button]                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Card with usage indicator]                                 │
│                                                               │
│  [If on paid plan, shows:]                                    │
│  • Current plan details                                       │
│  • Next billing date                                          │
│  • Payment method (last 4 digits)                             │
│  • [Update Payment Method]                                    │
│  • [Cancel Subscription]                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Usage meter
: Shows decisions used / limit
Progress bar
: Visual indicator
Upgrade CTAs
: Prominent buttons
Payment info
 (paid plans): Stripe-managed
Invoices
: Link to download past invoices
Notifications Settings
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Notifications                                                │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  Email Notifications                                          │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  [✓] Weekly summary digest                                    │
│      Receive a weekly email with decision stats               │
│                                                               │
│  [✓] Outcome reminders                                        │
│      Get reminded to update decision outcomes                 │
│                                                               │
│  [✓] AI insights ready                                        │
│      When new insights are generated                          │
│                                                               │
│  [ ] Product updates                                          │
│      New features and announcements                           │
│                                                               │
│               [Save Preferences]                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Checkbox toggles
: Simple on/off
Descriptions
: What each notification includes
Save button
: Updates preferences
Unsubscribe link
: In every email footer
💳 7. UPGRADE/PAYWALL MODALS - Visual Design & Features
25 Decision Limit Reached Modal
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                         [×]   │
│                     🎉 Amazing Work!                          │
│                                                               │
│           You've hit your 25 decision limit.                  │
│                                                               │
│     You're building serious decision intelligence.            │
│                                                               │
│  To continue logging decisions, upgrade to Pro:               │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pro Plan - $15/month                                 │   │
│  │                                                        │   │
│  │  ✓ Unlimited decisions                                 │   │
│  │  ✓ Full AI insights                                    │   │
│  │  ✓ Automated reminders                                 │   │
│  │  ✓ Export your data                                    │   │
│  │  ✓ Priority support                                    │   │
│  │                                                        │   │
│  │  [Upgrade to Pro - $15/month]                          │   │
│  │  [Large blue button]                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Or upgrade to Team for collaboration →                       │
│  [Link to pricing page]                                       │
│                                                               │
│                [Maybe Later]                                  │
│              [Text link, small]                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Celebratory tone
: "Amazing work!" not "You're blocked"
Clear value props
: What they get with Pro
Single CTA
: Upgrade to Pro (most likely choice)
Alternative option
: Link to Team plan
Dismissible
: Can close and upgrade later
Triggers
: When trying to create 26th decision
Team Invite Paywall (Free Plan)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│                                                         [×]   │
│               👥 Team Collaboration                           │
│                                                               │
│  Invite team members requires the Team plan.                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Team Plan - $49/month                                │   │
│  │                                                        │   │
│  │  Everything in Pro, plus:                             │   │
│  │  ✓ Up to 5 team members                               │   │
│  │  ✓ Shared decision history                            │   │
│  │  ✓ Role-based permissions                             │   │
│  │  ✓ Team insights                                       │   │
│  │  ✓ Collaboration features                             │   │
│  │                                                        │   │
│  │  [Upgrade to Team - $49/month]                         │   │
│  │  [Blue button]                                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│                [View Pricing Details]                         │
│                  [Link]                                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Triggered when
: Free user tries to invite someone
Clear upgrade path
: Show Team plan benefits
Direct CTA
: Upgrade to Team
Pricing link
: See full comparison
AI Insights Locked (Free Plan, <20 Decisions)
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Insights                                                     │
│  [Page heading]                                               │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│               [Lock icon illustration]                        │
│                                                               │
│          AI Insights unlock at 20 decisions                   │
│                                                               │
│    You've logged 12 decisions. Just 8 more to go!             │
│                                                               │
│    [████████░░░░░░░░░░] 60%                                  │
│    [Progress bar]                                             │
│                                                               │
│    Keep logging decisions to unlock:                          │
│    • Pattern detection                                        │
│    • Assumption accuracy tracking                             │
│    • Success rate analysis                                    │
│                                                               │
│              [Log Another Decision]                           │
│               [Blue button]                                   │
│                                                               │
│    Or upgrade to Pro to unlock insights immediately →         │
│    [Small link]                                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Motivational
: Shows progress toward unlock
Progress bar
: Visual goal
What they'll get
: Bullets of insights features
CTA
: Log more decisions (encourages usage)
Upgrade escape hatch
: Link to Pro plan
Stripe Payment Modal
Visual Design
┌─────────────────────────────────────────────────────────────┐
│  Upgrade to Pro                                         [×]   │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  [✓ Monthly] [ ] Annual (Save 17%)                            │
│  [Tab selector]                                               │
│                                                               │
│  Pro Plan                                                     │
│  $15/month                                                    │
│                                                               │
│  ✓ Unlimited decisions                                        │
│  ✓ Full AI insights                                           │
│  ✓ Automated reminders                                        │
│  ✓ Export data                                                │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  [Stripe Payment Element]                                     │
│  [Embedded Stripe card input]                                 │
│                                                               │
│  [Subscribe - $15/month]                                      │
│  [Blue button, full width]                                    │
│                                                               │
│  🔒 Secure payment by Stripe                                  │
│  Cancel anytime. No hidden fees.                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Monthly/Annual toggle
: Shows savings for annual
Plan recap
: What they're getting
Stripe embedded form
: Handles payment securely
Trust signals
: Stripe logo, "Secure payment", "Cancel anytime"
Loading state
: Button shows spinner while processing
Error handling
: Shows Stripe error messages inline
🔄 8. PHASE 2-5 FEATURE UPDATES - Visual Design
PHASE 2 (Week 2-4): Critical Improvements
Decision Templates Selector
Visual Design:
┌─────────────────────────────────────────────────────────────┐
│  New Decision                                                 │
│                                                               │
│  Start from a template or create from scratch                 │
│                                                               │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ 📦 Tool    │ │ 👤 Hiring  │ │ 💰 Pricing │               │
│  │  Switch    │ │  Decision  │ │   Change   │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│                                                               │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ 🎯 Feature │ │ 📣 Marketing│ │ ✏️ Blank   │               │
│  │ Priority   │ │  Channel   │ │  Decision  │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│  [Clickable cards grid]                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
6 pre-built templates
Each card shows icon + name
Click to use template (pre-fills form)
"Blank" option for custom
Hover shows preview of template structure
Email Notifications Preview
Weekly Summary Email:
Subject: Your decision summary for this week
────────────────────────────────────────
📊 Last Week in Decisions
You logged 3 new decisions
Updated 1 outcome (great job!)
Have 2 active decisions awaiting review
────────────────────────────────────────
📝 Decisions awaiting outcome update:
1. Switch from Heroku to Railway
   Made 45 days ago → Time to review?
   [Update Outcome]
2. Hire Senior Designer
   Made 60 days ago → How did it go?
   [Update Outcome]
────────────────────────────────────────
🎯 This Week's Goal:
Log at least 2 decisions and update 1 outcome
[View Dashboard]
────────────────────────────────────────
Decision Memory
Unsubscribe | Preferences
PHASE 3 (Month 2-3): Habit Formation
Streak Tracker (Dashboard Widget)
Visual Design:
┌─────────────────────────────────────────────────────────────┐
│  🔥 7-Day Streak!                                             │
│  You've logged decisions for 7 days in a row. Keep it up!     │
│                                                               │
│  Mon  Tue  Wed  Thu  Fri  Sat  Sun                           │
│  [✓]  [✓]  [✓]  [✓]  [✓]  [✓]  [✓]                           │
│  [Green checkmarks in calendar view]                          │
│                                                               │
│  Next milestone: 14-day streak 🏆                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Shows current streak
Mini calendar with checkmarks
Celebrates milestones (7, 14, 30 days)
Animates when reaching milestone
Decision Timeline View
Visual Design:
┌─────────────────────────────────────────────────────────────┐
│  [List View] [Timeline View]                                 │
│  [Tabs]                                                       │
│                                                               │
│  January 2025                                                 │
│  ───────────────────────────────────────────────────────────  │
│  ○───[Hire PM]──────────────── Jan 15                        │
│  ○───[Switch to Vercel]─────── Jan 12                        │
│  ○───[Pricing change]────────── Jan 8                         │
│                                                               │
│  December 2024                                                │
│  ───────────────────────────────────────────────────────────  │
│  ●───[Launch feature X]──────── Dec 20 [SUCCEEDED]           │
│  ●───[Hire designer]──────────── Dec 15 [FAILED]             │
│  [Green dot = success, red = failed, gray = active]          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Chronological view
Color-coded by outcome
Grouped by month
Click decision to view details
Scroll timeline (infinite scroll)
PHASE 4 (Month 4-6): AI & Retention
Insights Dashboard (NEW PAGE)
Visual Design:
┌─────────────────────────────────────────────────────────────┐
│  Your Decision Patterns                                       │
│  We've analyzed 47 decisions to find patterns.               │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  📊 Success Rate                                      │   │
│  │  ────────────────────────────────────────────────────│   │
│  │  Your decisions succeed 65% of the time               │   │
│  │                                                        │   │
│  │  [Bar chart showing success by category]              │   │
│  │  Product:    ████████░░ 80%                           │   │
│  │  Hiring:     ████░░░░░░ 40%                           │   │
│  │  Marketing:  ██████░░░░ 60%                           │   │
│  │                                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  🎯 Assumption Accuracy                                │   │
│  │  ────────────────────────────────────────────────────│   │
│  │  Your assumptions are correct 52% of the time         │   │
│  │                                                        │   │
│  │  💡 Pattern detected:                                 │   │
│  │  You tend to be overconfident in timeline estimates.  │   │
│  │  Your timelines run 40% longer than expected.         │   │
│  │                                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  🔄 Recurring Failures                                 │   │
│  │  ────────────────────────────────────────────────────│   │
│  │  You've reversed 3 vendor decisions in 6 months.      │   │
│  │  Common reason: "Poor customer support"               │   │
│  │                                                        │   │
│  │  💡 Suggestion:                                       │   │
│  │  Consider making support quality a top-3 criterion    │   │
│  │  in future vendor decisions.                          │   │
│  │                                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Multiple insight cards
Charts and visualizations (Recharts)
AI-generated suggestions
Patterns highlighted
Refreshes weekly
AI Risk Warning (Decision Creation)
Visual Design:
┌─────────────────────────────────────────────────────────────┐
│  [While creating decision with High Impact + Low Confidence]  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ⚠️ HIGH RISK DECISION                                │   │
│  │  Risk Score: 78/100                                    │   │
│  │  ────────────────────────────────────────────────────│   │
│  │  This decision is:                                     │   │
│  │  • High impact                                         │   │
│  │  • Hard to reverse                                     │   │
│  │  • Low confidence                                      │   │
│  │                                                        │   │
│  │  Suggestions before proceeding:                        │   │
│  │  ✓ Add more alternatives (you only listed 1)          │   │
│  │  ✓ Validate at least 3 key assumptions                │   │
│  │  ✓ Consider a shorter validation timeline             │   │
│  │                                                        │   │
│  │  [Improve this decision] [Proceed anyway]              │   │
│  │  [Outline button]        [Ghost button]                │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Red/orange border, warning icon]                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Appears during decision creation
Shows risk score (0-100)
Lists risk factors
Actionable suggestions
Can dismiss or improve decision
PHASE 5 (Month 7-12): Team & Scale
Team Activity Feed
Visual Design:
┌─────────────────────────────────────────────────────────────┐
│  Team Activity                                                │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  [Avatar] Sarah updated outcome on "Hire Senior Engineer"    │
│            → Marked as SUCCEEDED                              │
│            2 hours ago                                        │
│                                                               │
│  [Avatar] John created decision "Switch to Vercel"            │
│            5 hours ago                                        │
│                                                               │
│  [Avatar] You reversed decision "Use Paddle for payments"    │
│            Yesterday                                          │
│                                                               │
│  [Load more...]                                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Features:
Real-time feed
User avatars
Action descriptions
Links to decisions
Timestamps
Paginated
Slack Integration Preview
Slack Command:
/decision We're switching to Stripe
[Modal opens in Slack:]
────────────────────────────
Log Decision
Title: We're switching to Stripe
Category: [Select ▼]
What did you decide?
[Text area]
[Cancel] [Log Decision]
────────────────────────────
Slack Notification:
🔔 Decision Memory
John created a new decision:
"Switch to Stripe for payments"
→ View in Decision Memory
🎨 9. DESIGN SYSTEM REFERENCE
Color Usage Guide
Status Colors
Active decisions
: Yellow/Warning (#F59E0B)
Succeeded decisions
: Green/Success (#10B981)
Failed/Reversed
: Red/Danger (#EF4444)
Draft
: Gray/Neutral (#6B7280)
UI Element Colors
Primary CTA
: Blue (#3B82F6)
Secondary buttons
: White with gray border
Danger actions
: Red (#EF4444)
Success states
: Green (#10B981)
Info/Tips
: Light blue background (#EFF6FF)
Typography Hierarchy
Headings
H1
 (Page titles): 36-42px, bold
H2
 (Section headings): 28-32px, semibold
H3
 (Card titles): 20-24px, semibold
H4
 (Form labels): 16px, medium
Body
Regular text
: 16px, gray-700
Small text
: 14px, gray-600
Captions
: 12px, gray-500
Spacing System
Card padding
: 24px (1.5rem)
Section spacing
: 32px (2rem)
Element spacing
: 16px (1rem)
Tight spacing
: 8px (0.5rem)
Animation Guidelines
Hover States
Scale up
: transform: scale(1.02)
Shadow increase
: From md to lg
Color shift
: Darken by 10%
Transitions
Duration
: 200ms (fast), 300ms (normal)
Easing
: ease-in-out
Properties
: transform, opacity, shadow
Icon Usage
Size
: 16px (small), 20px (medium), 24px (large)
Library
: Lucide React
Style
: Outline/stroke icons
Color
: Inherit from parent or theme color
📱 10. MOBILE RESPONSIVE BEHAVIOR
Breakpoints
Mobile: 0-640px
Tablet: 641-1024px
Desktop: 1025px+
Mobile Adaptations
Navigation
Desktop
: Horizontal tabs
Mobile
: Hamburger menu (slide-in drawer)
Dashboard
Desktop
: 2-3 column grid
Mobile
: Single column, full-width cards
Forms
Desktop
: 2-column layout for optional fields
Mobile
: All fields stack vertically
Decision Cards
Desktop
: Fixed height, hover effects
Mobile
: Auto height, tap to open
Modals
Desktop
: Centered overlay, max-width 600px
Mobile
: Full-screen with close button top-left
This completes the 
comprehensive frontend features and visual design guide
 for Decision Memory MVP and future phases!
Would you like me to:
Create detailed mockups for specific pages?
Specify interaction animations in detail?
Add accessibility (a11y) guidelines?
Detail error states and edge cases?
