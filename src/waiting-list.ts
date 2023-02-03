// The waintingList defines the behaivior of every new waiting list created
export interface WaitingList {
  addCreator: (creator: string) => void;
  addCreators: (creator: string[]) => void;
  removeCreator: () => void;
  getAmountOfCohorts: () => number;
  getAmountOfCreators: () => number;
  getAllCohorts: () => Cohort[];
  getCohort: () => Cohort;
}

// The cohort represents a group of creators (max 10)
export interface Cohort {
  createdAt: Date;
  creators: string[];
}

// This will return an instance of a waiting list based on its own interface. It initializes 2 private variables, one to store the cohorts and the other to keep track of the number of creators in waiting list.
export function newWaitingList(): WaitingList {
  let list: Cohort[] = [];
  let creatorsInWaitingList = 0;

  return {
    addCreator: function (creator: string) {
      if (list.length === 0 || list[list.length - 1].creators.length === 10) {
        // If there is no cohort in waiting list or all cohorts are full (max 10), then we add a new cohort and push the creator into it
        list.push({ createdAt: new Date(), creators: [creator] });
        creatorsInWaitingList++;
      } else {
        // Add new creator into most recent cohort
        list[list.length - 1].creators.push(creator);
        creatorsInWaitingList++;
      }
    },
    addCreators: function (creators: string[]) {
      for (let i = 0; i < creators.length; i++) {
        this.addCreator(creators[i]);
      }
    },
    removeCreator: function () {
      // Remove First In creator from First In Cohort
      if (list.length > 0) {
        list[0].creators.shift();
        creatorsInWaitingList--;
        if (list[0].creators.length === 0) {
          // If current cohort has no more users, remove it.
          list.shift();
        }
      }
    },
    getAmountOfCohorts: function () {
      return list.length;
    },
    getAmountOfCreators: function (): number {
      return creatorsInWaitingList;
    },
    getAllCohorts: function (): Cohort[] {
      return list;
    },
    getCohort: function (): Cohort {
      return list[0];
    },
  };
}

// Since we are not working on persistent storage for this test, I created this waitingLists object to store multiple waiting lists in memory and be able to test the functionality.
export const waitingLists: { [key: string]: WaitingList } = {};

// This function is a simple initializer to store multiple waiting lists in the object above.
export function createWaitingList(name: string): void {
  waitingLists[name] = newWaitingList();
}

//** The lines below are just for testing purposes */
// createWaitingList("list1");
// const waitingList = waitingLists["list1"];

// waitingList.addCreators([
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "11",
//   "12",
// ]);
// console.log(
//   "Expect 12 amount of creators to be =",
//   waitingList.getAmountOfCreators()
// );
// console.log(
//   "Expect 2 amount of cohorts to be =",
//   waitingList.getAmountOfCohorts()
// );
// waitingList.removeCreator();
// console.log(
//   "Expect 11 amount of creators to be =",
//   waitingList.getAmountOfCreators()
// );
