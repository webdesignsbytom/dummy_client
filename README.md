# Client

Live Link [MyPlanet](https://myplanetview.netlify.app/)

## Table of Contents

- [Client](#client)
  - [Table of Contents](#table-of-contents)
  - [General Info](#general-info)
  - [Technologies](#technologies)
  - [Completing project](#completing-project)
  - [Chatbot](#chatbot)
  - [Versions](#versions)
  - [Analytics](#analytics)

## General Info

**Client** is....

## Technologies

1. React - Frontend framework
2. Tailwind - Style sheets
3. Axios - API management
4. Google OAuth - creating a login and sign up through google account.

## Completing project

Make a file structure
`find . -path './node_modules' -prune -o -path './logs' -prune -o -path './.git' -prune -o -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g' > file_structure.txt`

## Chatbot

The chatbot component is available with premade conversation structures.

Features:

- Easy to edit chat text in flow sheet.
- HTML components inserted into chat from the bot
- Browser tab notifications of new messages
- Can lead you to specific pages or forms.

## Versions

Different branches are a base for different websites. All rely on the 'master' branch for basic struture.

- Pull master branch into others to update base

1. Master - This branch is the main content for all templates. Includes
   1. Home
   2. Login and registration
   3. Password reset
   4. Contact
   5. Privacy and cookies page and modal
   6. Admin
   7. 404
2. Game
   1. Game canvas
   2. useCanvas hook
3. Shop - includes shopping functionality
   1. Store
   2. Cart
   3. Payment gateways
4. Blog - includes blog functionality
   1. Main blog
   2. Search functionality
5. Membership - Includes payments and subscriptions (fans, services)
   1. Member Dashboard: Personalized dashboard for logged-in users.
   2. Subscription Plans: Pages for selecting and managing subscription plans.
   3. Member-Only Content: Sections or pages restricted to members.
   4. Profile Management: Account settings and profile customization.
6. Community - Forums and posting (readit, stackoverflow)
   1. Forum Categories: Different sections for discussions.
   2. User Profiles: Detailed user profiles with badges, posts history, etc.
   3. Private Messaging: Direct messaging functionality between users.
   4. Moderation Tools: Tools for moderators to manage the forum.
7. Management - business or community management tools
   1. Calander functions

## Analytics

The dummy comes with a set up for using google analytics.
Using the GA4 library `npm install react-ga4`

We create the useAnalytics hook to import a tracking helper into any page or component.
