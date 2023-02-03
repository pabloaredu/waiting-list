# Waiting List System

The waiting list system is a CLI program to manage waiting lists in a FIFO system. Each list will have multiple cohorts of maximum 10 creators.

You can have multiple waiting lists at the same time. Each list will be managed independently.

The main functionalities are:

- Create and manage multiple waiting lists
- Add creators (creators will be added automatically into cohorts of 10)
- Process creators (remove from list, FIFO)
- Get how many creators are in a waiting list
- Get how many cohorts are in a waiting list
- Show next cohort in list to be processed
- Show full list of creators, i.e show all available cohorts in a list

To start the program, clone this repo and run the following commands:

```
npm i
npm run start:dev

```

The program will start in dev mode. You will be able to use it in your local machine and make any changes. It has nodemon in the background so every change will be reflected and the program will restart automatically.

If you have questions about the available commands you can run "help" once you start the program and it will display an explanation for each command.

## General Coding Notes

There are 2 files in this package:

- index.ts: it's the entry point and keeps only the logic to interact in the terminal
- waiting-list.ts: contains the main logic for the waiting list system (you will find a brief explanation of how it works in the file)

Some small optimizations I did during my coding process:

- I was iterating through all cohorts to count the number of creators (getAmountOfCreators). Instead I created a variable to to keep track of it. This way, I can simply update the amount of creators every time I add or remove one.

- I was using a "for of" loop to add multiple creators. Instead I decided to use a traditional loop. This is a simple one, but sometimes I forget traditional loops are way faster. In this case the impact is very low, but it can be helpful if we were processing huge amounts of data.

Things that can be improved:

- Error handling (this is just a test with time restrictions, so I didn't add proper error handling)
- Add proper tests
- Add functionality to fetch cohorts by date range
- Store historical waiting lists for future use
- We could define the size of cohorts dynamically for each campaign or waiting list
- In this case users can have the same name and we wouldn't be able to differentiate. We need to add unique ids
- This system works only in memory. No persistant storage implementation
- Decided to use the terminal as the user interface, but it would be fun to manage the state in a client app based on waiting lists : )

## General Business Notes

- We could create a priority system, instead of a regular FIFO, i.e. process users based on how likely they are to get a loan or based on the start date of their courses (if starting soon, higher priority).

- We are getting data from prospects for creators and schools. We could help other creators find their niche and increase conversions, not only by providing financing but by finding prospects.
