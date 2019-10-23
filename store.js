import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store

export const START_MINE_SWEEPER_GAME = 'START_MINE_SWEEPER_GAME';

export default new Vuex.Store({ // import store from './store';
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,

    },
    timer: 0,
    result: '',
  }, // vue의 data와 비슷
  getters: {

  }, // vue의 computed와 비슷
  mutations: {
    [START_GAME](state, { row, cell, mine }) {
      state.data = {
        row,
        cell,
        mine
      };

      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;

    },
  }, // state를 수정할 때 사용해요. 동기적으로
  actions: {}, // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 때
});

const plantMine = (row, cell, mine) => {
    let minesRowCount = assignMaxScopeRow(row, cell, mine);
    let mines = [];

    let r = 0;
    let mineRowCountLen = minesRowCount.length;

    for(; r < mineRowCountLen ; r++) {
        let objectMainRowCount = minesRowCount[r];
        let mineRow = mineCellFactory(cell, objectMainRowCount);
        mines.push(mineRow);
    }



console.log("mines", mines);
};

const watchAroundMine = (mines) => {
    let r = 0;
    let minesLen = mines.length;

    for(; r < minesLen ; r++) {
        let objMine = mines[r];

        let i = 0;
        let objMineLen = objMine.length;
        for(; i < objMineLen ; i++) {

            let objMine = objMine[i];
            getWatchAroundMineCount(r, i);

        }
    }
};

const getWatchAroundMineCount = (row, cell) => {
/*    let WatchAroundKey =   {
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
                [1, 1],
                [-1, -1],
                [1, -1],
                [-1, 1]
            };*/



};

const mineCellFactory = (cell, objectMainRowCount) => {
    let storageCellNumber = [];
    let cellArray = [];
    let r = 0;

    for(; r < objectMainRowCount ; r++) {
        let cellNumber = getRanDomCell(cell, storageCellNumber, r);
        storageCellNumber.push(cellNumber);
    }


    let i = 0;
console.log("storageCellNumber", storageCellNumber);
    for(; i < cell ; i++) {
        let mineYn = (storageCellNumber.includes(i)) ?  "Y" : "N";
        cellArray.push(mineYn);
    }

    return cellArray;
};

const getRanDomCell = (cell, storageCellNumber, r) => {
    let randomCell = getRandom(0, cell);
    if(storageCellNumber.includes(randomCell)) {
        console.log("sssssssssssssssssssssssssssss")
        console.log("r", r)
        return getRanDomCell(cell, storageCellNumber, r);
    } else {
        return randomCell;
    }
};

const assignMaxScopeRow = (row, cell, mine) => {

    let tableData = [];
    let mineRowCount = [];
    let assignMaxScopePlus = Math.ceil( ( Math.ceil(mine *  1.8) + mine ) / row ) ;

    console.log("assignMaxScopePlus", assignMaxScopePlus);
    console.log("cell", cell);

    let remainingMineCount = mine;
    let r = 0;
    for(; r < row ; r++) {
        let minRandom = (r >= cell) ? cell : r;
        //let maxRandom = (r === 0) ? assignMaxScopePlus : remainingMineCount;
        minRandom = 0;
        console.log("minRandom : " + minRandom + " ~ maxRandom : " + assignMaxScopePlus);
       // console.log("maxRandom", maxRandom);
        console.log("remainingMineCount", remainingMineCount);

        let assignMineRowCount = 0;


        if(remainingMineCount > 0) {
            if(row.length === r + 1) {
                assignMineRowCount = remainingMineCount;
            } else {
                assignMineRowCount = getRandom(minRandom, assignMaxScopePlus);

                if(remainingMineCount < assignMineRowCount) {
                    remainingMineCount = remainingMineCount - remainingMineCount;

                } else {
                    remainingMineCount = remainingMineCount - assignMineRowCount;
                }
            }
        }

        mineRowCount.push(assignMineRowCount);
        //console.log("remainingMineCount", remainingMineCount);

    }
    console.log("mineRowCount", mineRowCount);
    return mineRowCount;
};

const getRandom = (min, max) => {
    return Math.floor(Math.random() * max) + min
};
