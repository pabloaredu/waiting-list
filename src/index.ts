import { createWaitingList, waitingLists } from "./waiting-list";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question(
    "Enter a command (create-list, add-creator, add-multiple-creators, process-creator, number-of-cohorts, number-of-creators, get-cohorts, get-cohort, help, exit): ",
    (command) => {
      switch (command) {
        case "create-list":
          rl.question("Enter a name for the waiting list: ", (name) => {
            if (!waitingLists[name]) {
              createWaitingList(name);
              console.log(`Waiting list '${name}' created.`);
              prompt();
            } else {
              console.log(
                `Waiting list '${name}' already exists. Please choose a different name`
              );
              prompt();
            }
          });
          break;
        case "add-creator":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            rl.question("Enter the name of the creator: ", (creator) => {
              waitingLists[listName].addCreator(creator);
              console.log(
                `Creator '${creator}' added to waiting list '${listName}'.`
              );
              prompt();
            });
          });
        case "add-multiple-creators":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            rl.question(
              "Enter the names of the creators (separated by comma, e.g. Chris, Pablo): ",
              (creators) => {
                waitingLists[listName].addCreators(creators.split(","));
                console.log("Creators added", creators);
                prompt();
              }
            );
          });
          break;
        case "process-creator":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            if (waitingLists[listName]) {
              waitingLists[listName].removeCreator();
              console.log(
                `A creator was removed from waiting list '${listName}'.`
              );
              prompt();
            }
          });
          break;
        case "number-of-cohorts":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            if (waitingLists[listName]) {
              console.log(
                `Waiting list '${listName}' has ${waitingLists[
                  listName
                ].getAmountOfCohorts()} cohorts.`
              );
              prompt();
            }
          });
          break;
        case "number-of-creators":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            if (waitingLists[listName]) {
              console.log(
                `Waiting list '${listName}' has ${waitingLists[
                  listName
                ].getAmountOfCreators()} creators.`
              );
              prompt();
            }
          });
          break;
        case "get-cohorts":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            if (waitingLists[listName]) {
              console.log(`All cohorts in waiting list '${listName}':`);
              console.log(waitingLists[listName].getAllCohorts());
              prompt();
            }
          });
          break;
        case "get-cohort":
          rl.question("Enter the name of the waiting list: ", (listName) => {
            checkIfListExists(listName);
            if (waitingLists[listName]) {
              console.log(
                `Next cohort to process in waiting list '${listName}' (FIFO system):`
              );
              console.log(waitingLists[listName].getCohort());
              prompt();
            }
          });
          break;
        case "exit":
          rl.close();
          break;
        case "help":
          console.log("Welcome to waiting list managment system \n");
          console.log(
            "You can add multiple waiting lists and manage them separately. Each waiting list works in a FIFO system. Every time you process a creator will choose the first in from the first in cohort automatically \n"
          );
          console.log(
            "Each cohort contains 10 creators. If you add a new creator and the previous cohort is full, it will automatically create a new cohort for you"
          );
          console.log(
            "Cohorts will contain 10 creators and the date they were created \n"
          );
          console.log("Commands:");
          console.log(
            "*** create-list: use this command to create a new list. Each list will contain cohorts of 10 creators \n"
          );
          console.log(
            "Each of the following commands are based on a list. To run them make sure you choose the right list you are working on. \n"
          );
          console.log(
            "*** add-creator: use this command to add a single creator to the last available cohort on a list. \n"
          );
          console.log(
            "*** add-multiple-creators: use this command to add multiple creators at the same time (separated by comma, e.g. Chris, Pablo). If you add more than 10 users or previous cohorts are full, it will automatically create a new one for you. \n"
          );
          console.log(
            "*** process-creator: use this command to remove the first in creator of the first in cohort. \n"
          );
          console.log(
            "*** number-of-cohorts: use this command to view the number of cohorts existing in a specific list. \n"
          );
          console.log(
            "*** number-of-creators: use this command to view the number of creators existing in a specific list. \n"
          );
          console.log(
            "*** get-cohorts: use this command to view the data for every cohort available in a waiting list \n"
          );
          console.log(
            "*** get-cohort: use this command to view the data for the next cohort in line in a waiting list \n"
          );
          prompt();
          break;
        default:
          console.log(
            "You might misspelled a command, please try again. Or if you are trying to leave the program press ctl + c"
          );
          prompt();
          break;
      }
    }
  );
}

prompt();

function checkIfListExists(listName: string) {
  if (!waitingLists[listName]) {
    console.log(
      `${listName} not available. Existing lists: ${Object.keys(waitingLists)}`
    );
    prompt();
  }
}
