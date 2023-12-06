# Bamboo-Nest

- [Introduction](#introduction)
- [Installation](#installation)
- [Technologies](#technologies-used)
- [What, Why](#what-why)
- [Project Scope](#project-scope)
- [Project Plan](#project-plan)
- [Project Outcomes](#project-outcomes)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)


## Introduction
Bamboo Nest is an app designed to connect parents, creating an easy platform for them to buy and sell second hand items.  
You can find the deployed site [here](https://bamboo-nest.vercel.app/)
You can find our handover documentation [here](https://github.com/fac28/Bamboo-Nest/blob/main/handover.md) with a more detailed breakdown of our project

## Installation
To get started with Bamboo Nest on your own machine follow these installation instructions:  
Clone the repository
```bash
git clone https://github.com/fac28/Bamboo-Nest.git
cd Bamboo-Nest
```
Run a local server
```bash
npm install
npm run dev
```
open localhost:3000 in your preferred browser to see the result

You will also need the appropriate environment variables stored in .env.local  
You can see an example of what environment variables are expected in .env.local.example

## Deployment
Bamboo Nest is deployed on Vercel. 
The site is set up to continuously deploy whenever changes happen to our main branch
You can find the deployed site [here](https://bamboo-nest.vercel.app/)
## Technologies Used
This project is built using:
- Next.js 14
- React
- Typescript
- Supabase
- Tailwind

## What, Why
- What
This project is the MVP for Bamboo Nest. A site allowing parents to buy, sell or rent second hand kids items.
- Why
Provides a sustainable and affordable way for parents to buy kids items. As well as letting parents make money from bulky items between kids

## Project Plan
### Sprints
Three one week sprints
1. [Design & planning](#design&plansprint)
2. [Build](#buildsprint)
3. [Build](#buildsprint)

Each sprint included time for retrospectives in the form of SGCs (Stop, Go, Continue).
<a id="design&plansprint"></a>
### Design & Planning
- We made a clickable Figma prototype
- We conducted user research based on our Figma prototype
- We tweaked our Figma based on feedback from user research & input from our product owner
- We generated some user stories to help identify key features while keeping in mind how users would interact with our site
- Once we were happy with our design we started planning the schema for our database

You can find our figma [here](https://www.figma.com/file/YrH22CiugdfKC6y2keBdQ7/Bamboo-Nest?type=design&node-id=0-1&mode=design&t=6nC2z4hOBZhYQ3AV-0)  
And a clickable demo of the figma [here](https://www.figma.com/proto/YrH22CiugdfKC6y2keBdQ7/Bamboo-Nest?type=design&node-id=6-6&t=6nC2z4hOBZhYQ3AV-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=6%3A6&show-proto-sidebar=1)
<a id="buildsprint"></a>
### Build
- At the beginning of each build week we decided what features to work on. Split each feature in to small issues aiming to ensure everything was at most E3.
- Everyone assigned themselves work ensuring active tickets were marked as such.
- We had regular standups giving everyone a space to bring up issues or features they felt needed to be focussed on.
- At the ened of the week we reflected on how the sprint had gone. Making sure issues had been properly labeled with estimations and actuals.

## Project Outcomes
## Known Issues
- Toggle favourite button doesn't work on all pages
## Future Improvements
- add location features: Filter by distance etc
- add payment processing
- add in app communication
- Improve user feedback i.e. when a user submits a form should show what they've submitted and if it was successful
- Add suspense & error boundries to make the site more performant & robust
## Contributors
- Paula - Product Owner
- [Dylan](https://github.com/dylancobb) - QA
- [Issy](https://github.com/isobelbutler) - UI/UX
- [James](https://github.com/JamesESS) - Scrum
- [Yuqing](https://github.com/yuqingwwang) - DevOps
