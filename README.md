# Client

Live Link [MyPlanet](https://myplanetview.netlify.app/)

## Table of Contents

- [Client](#client)
  - [Table of Contents](#table-of-contents)
  - [General Info](#general-info)
  - [Completing project](#completing-project)
  - [Versions](#versions)

## General Info

**Client** is....

## Completing project

Make a file structure
`find . -path './node_modules' -prune -o -path './logs' -prune -o -path './.git' -prune -o -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g' > file_structure.txt`

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
2. Shop - includes shopping functionality
   1. Store
   2. Cart
   3. Payment gateways
3. Blog - includes blog functionality
   1. Main blog
   2. Search functionality
4. Membership - Includes payments and subscriptions (fans, services)
   1. Member Dashboard: Personalized dashboard for logged-in users.
   2. Subscription Plans: Pages for selecting and managing subscription plans.
   3. Member-Only Content: Sections or pages restricted to members.
   4. Profile Management: Account settings and profile customization.
5. Community - Forums and posting (readit, stackoverflow)
   1. Forum Categories: Different sections for discussions.
   2. User Profiles: Detailed user profiles with badges, posts history, etc.
   3. Private Messaging: Direct messaging functionality between users.
   4. Moderation Tools: Tools for moderators to manage the forum.
6. Management - business or community management tools
   1. Calander functions