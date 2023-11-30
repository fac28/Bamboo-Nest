## 👋 Introduction 

<img width="1440" alt="Screenshot 2023-11-30 at 15 57 08" src="https://github.com/fac28/Bamboo-Nest/assets/117110978/bc6e8ea2-c487-457b-9deb-200d0d473289">

* What are you building?
     * We are building a marketplace for users to rent, buy or sell pre-loved baby items locally.
* Why are you building it?
     * To give users a sustainable way to buy and sell baby items and to stop unnecessary waste. 

## 📙 Project scope 
* What are you not building?
    * We are not building an app that has a payment system, or a webchat for users to communicate.
* How did you decide what features were important?
    * We spoke frequently with the product owner and refined what thought was most important based on what would create a MVP that achieved the product owner's core goals of a site where users could upload items and reach out to other users to get more information.
    * We conducted user research and user testing and asked for feedback over what features they would find most useful, and what they would expect from an MVP.
    * We re-prioritised whilst building 1. to ensure we met our user stories and 2. to build a product that was scalable and could be handed over to our product owner at the end of the project. 
## 👉 Project plan 
* How are you going to structure your sprints?
    * Sprints will be 1 week long with each day beginning and ending with a standup.
    * We will be using Miro to plan the build and create an overview of the product.
    * We will use the GitHub project kanban for track our velocity. 
* What order are you going to build in?
    * We will create a Next.js project and set up our database on Supabase, and then begin with the global layout for each page.
    * After this we will create the routes for each page and build the components and utils necessary for each page, with the aim of creating components that can be adapated to diferrent pages and layouts.
    * Alongside this we will tackle authentication and aim to style using Tailwind whilst building.
    
* How did user research inform your plan?
    * It made us rethink the flow through the site, and consider how a user with no pre-knowledge of the product would approach the site.
    * We realised we were unknowingly designing our app with assumptions over how a user would intereact with the site.
    * For example, a call to action on the landing page to sign up didn't make sense when the user didn't know what the product was for.
      
## 💽 Requirement analysis 
* How will you ensure your project is accessible to as many users as possible
    * Clear design and layout to avoid overcrowding and confusion.
    * A footer and navigation bar to allow the user to access diferrent parts of the site through one point.
    * A return back one page button to take the user back a step.
    * We implemented semantic HTML and used aria labels were possible and tested tabbing through the site.

* Are there any legal or regulatory requirements you should consider?
    * Right to privacy - GDPR
    * Laws surrounding Indecent and Prohibited Images of Children.

## Project learnings 
* Did your team work effectively?  
    * We adapted how we approached issues as we went, and 1. began breaking down issues into smaller chunks, and 2. worked on single issue branches.
    * We were realistic with how much we could achieve in the timespan, and prioritised which extra features we would tackle should there be time.
* What would you do differently next time?
    * Planned the way the user would buy or rent an item from an earlier stage.

## Research and findings 
- What did you find out from user testing?
    - Users want to be able to interact with a fair amount of the site before creating an account.
    - Users don't see image quality on product listings as a priority.
    - Users care about simplicity and taking as few steps as possible to list an item.

## Project outcomes 
- What features would you prioritise to build next?
    - In-app messaging/communication.
    - In-app payments.
    - Consider the logisitics for payments and setting availability when renting an item.
    - A way for users to share the location of an item (whilst protecting a user's exact address)
    
- Was the project a success?
    - It was a good proof of concept, but a good chunk of time needs to be put towards the rental side of the product.
- Software Development Lifecycle stages 


## 🗺️ Planning 
* What roles did your team take on?
    * 🦙 James - Scrum Facilitator
        * Responsible for project board, liaising with the product owner and removing blockers for the team
    * 🦛 Dylan - QA & Testing
        * Insist on clean legible code
        * Ensure that the app has appropriate test coverage
        * Know when & to set up mock test where appropriate
    * 🦛 Issy - UX & Design
        * Advocate for the user
        * Create a style guide
        * Ensure regular attention is given to thorough documentation
        * Ensure completion of handover documentation for the Product Owner
    * 🐃 Yuqing - DevOps
        * File structure / Next boilerplate
        * Lint + prettier + husky
        * Vercel deploy
        * Debugging deployment issues
        * Supabase project setup
     
* Having these roles was helpful, 1. it meant we knew how to prioritise tickets, 2. it gave people ownership over certain tasks, 3. it ensured we also got stuck into any task and helped out where was needed - no task was solely one roles.

| 🍋 Tech Stack 🍉|
|--------|
|Typescript|
|Supabase|
|Tailwind + NextUI|
|Next.js (13)|
|Husky|

## Analysis 
- What might be the intended and unintended consequences of building this product?
  - It might make people consider how the environmental impact of buying baby products first-hand.
  - It may make people take a more sustainable approach to interacting with the baby product market.
  - It may encourage people to rent out items until needed again, which they would have otherwise disposed of. 

## 🎭 Design 
- How did you plan a user experience?
    - We created a detail mockup on Figma with prototyping to mimic the user journey.
    - We also used Miro to help us think about our user stories, and the interactions between the front-end and back-end of our product.

!!!!!!! Someone else answer the rest of this bit !!!!!!!!!
  
- What technical decisions did you make?
    - We decided to stick with Next13, Supabase, and React so that the product could be handed over easily to the product owner at the end of the project. 
- Relational or non-relational or no DB
    - We chose a relational database (postgres in Supabase) as the mostly predictable nature of the data fitted a relational model very well.
- Self-hosted or platform-as-a-service
     - We used Paas Supabase for Auth, DB, bucket storage.
- Frontend first vs DB first
    - We did database first so that we had the groundwork down before building.
 
!!!!!!! I HAVEN'T DONE BELOW !!!!!!!!

# Technical Specification
### Supabase: 
- Supabase is where we've stored out database. We've added Judy to the team and she will be able to access the project and be the owner.
- how to find env variables on supabase: 
- authentication happens via supabase and is only set up for email addresses at the moment with no third party providers
- types are exported for typescript from supabase for the database and therefore there are two type files
### Vercel: 
- the site is deployed here: https://rent-shield.vercel.app/
- We've added Judy to the team and she will be able to access the project and be the owner.

### CICD
- prettier & lint are ran on pre-commit using husky. You'll find details in the lint-staged file and the husky file. 
- cypress tests are ran via github actions on push from PR

### env variables
- there is a .env example file in the repo with example env variables

### Google Maps API
- the product owner will need to set up their own google maps dev account to get new google Maps API credentials. The documentation for that is here: https://developers.google.com/maps
- May need ££ if after a number of requests

### Design & CSS
- we predominantly used a component library called flowbite and tailwind. We didn't use many global styles except for some buttons which are outlined in the globals.css file


*Review methods of software design with reference to functional/technical specifications and apply a justified approach to software development (K11, S11, S12)*
## Implementation/Build 
- How did you ensure your code was good?
    - We ensured that two people reviewed every PR
    - We installed and used Husky so that formatters/linters were used with every commit and that tests were run on every push.
    - We also made it a rule that with large PRs and features that at least one test was written
    - We made time to 'show and tell' our code during check-ins and stand ups and forced ourselves to talk through our code
- Create logical and maintainable code to deliver project outcomes, explaining their choice of approach. (S1)
- What interesting technical problems did you have to solve?
    - Using the Google Maps API for autocomplete location and using the markers library to mark the properties on the map
- Outline and apply the rationale and use of algorithms, logic and data structures. (K9, S16)
- How did you debug issues that arose?
    - We took time to pair on complex features
    - We did a lot of rubber ducking and in-depth code reviews
- Apply structured techniques to problem solving to identify and resolve issues and debug basic flaws in code (S7)
## Test 
- How did you verify your project worked correctly?
    - Cypress is installed as a dev-dependency and every developer is responsible for unit testing their own work. Tests for user stories are also updated as we progress and the entire test suite must pass before any new code is pushed into the repository.
- Identify and create test scenarios which satisfy the project specification (S6)
    - E2E testing checks for the following user stories:
        - As a user I want to search properties by location, budget, number of bedrooms, and property type
        - As a renter I want to login so that I can save/favourite properties
        - As a landlord I want to be able to login and upload my property so that renters can see it
- Did writing automated tests catch any bugs?
    - No 
- Analyse unit testing results and review the outcomes, correcting errors. (S4)
## Deploy 
- Where/how did you deploy your application?
    - The page is deployed on Vercel
    - The main branch of the repository is continuously deployed and only working and tested features are added into the deployed product at any point. We did not employ a 'dev branch' approach and relied on strenuous testing & code reviews
- Review and justify their contribution to building, managing and deploying code into the relevant environment in accordance with the project specification (S10)

- What problems did you encounter during deployment?
    - No problems have yet occured during deployment.

## Maintain 
- Is it easy for someone make changes to the codebase?
    - yes
- Could a new person quickly be onboarded to contribute?
    - yes, as the product is an MVP there are limited routes
- Establishes a logical thinking approach to areas of work which require valid reasoning and/or justified decision making (B2)
- Describes how they have maintained a productive, professional and secure working environment throughout the project activity (B3)
