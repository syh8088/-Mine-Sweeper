import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store

export const START_MINE_SWEEPER_GAME = 'START_MINE_SWEEPER_GAME';
export const OPEN_BOX = 'OPEN';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_BOX = 'FLAG';
export const QUESTION_BOX = 'QUESTION';
export const NORMALIZE_BOX = 'NORMALIZE';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    OPENED: 0,
    NORMAL: -1,
    MINE: -2,
    QUESTION: -3,
    FLAG: -4,
    QUESTION_MINE: -5,
    FLAG_MINE: -6,
    BANG: -7,
};

const mineWatchAroundKeys = {
    0: [0, 1],
    1: [0, -1],
    2: [1, 0],
    3: [-1, 0],
    4: [1, 1],
    5: [-1, -1],
    6: [1, -1],
    7: [-1, 1]
};

const mineWatchAroundKeys1 = {
    0: [0, 1],
    1: [0, -1],
    2: [1, 0],
    3: [-1, 0],
};

export default new Vuex.Store({ // import store from './store';
  state: {
    mineSweeperData: [],
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
    [START_MINE_SWEEPER_GAME](state, { row, cell, mine }) {
      state.data = {
        row,
        cell,
        mine
      };

      state.mineSweeperData = plantMine(row, cell, mine);
      state.timer = 0;

    },
    [OPEN_BOX](state, { row, cell }) {
        console.log("row, cell", row, cell);
       let aroundMineCount = watchAroundMineCount(row, cell, state.data.row, state.data.cell, state.mineSweeperData);
        Vue.set(state.mineSweeperData[row], cell, aroundMineCount);

        function test(row, cell) {


            let i = 0;
            let watchAroundKeysLen = Object.keys(mineWatchAroundKeys1).length;

            for(; i < watchAroundKeysLen ; i++) {

                let objWatchAroundKeys = mineWatchAroundKeys1[i];

                let moveRow = row + objWatchAroundKeys[0];
                let moveCell = cell + objWatchAroundKeys[1];


          /*      if( moveRow <= 0 ||
                    moveCell <= 0 ||
                    state.mineSweeperData[moveRow][moveCell] === CODE.MINE) {
                    return;
                } else {
                    Vue.set(state.mineSweeperData[moveRow], moveCell, CODE.OPENED);
                    test(moveRow, moveCell);
                }
                */

                console.log("moveRow, moveCell", moveRow, moveCell);
                console.log("state.data.row, state.data.cell", state.data.row, state.data.cell);
                let aroundMineCount = watchAroundMineCount(row, cell, state.data.row, state.data.cell, state.mineSweeperData);
                if( aroundMineCount === 0 &&
                    moveRow > 0 &&
                    moveCell > 0 &&
                    state.data.row > moveRow &&
                    state.data.cell > moveCell &&
                    state.mineSweeperData[moveRow][moveCell] === CODE.NORMAL) {
                    Vue.set(state.mineSweeperData[moveRow], moveCell, CODE.OPENED);


                    test(moveRow, moveCell);
                } else if(
                    aroundMineCount > 0 &&
                    moveRow > 0 &&
                    moveCell > 0 &&
                    state.data.row > moveRow &&
                    state.data.cell > moveCell &&
                    state.mineSweeperData[moveRow][moveCell] === CODE.NORMAL) {
                    let aroundMineCount1 = watchAroundMineCount(moveRow, moveCell, state.data.row, state.data.cell, state.mineSweeperData);
                    Vue.set(state.mineSweeperData[moveRow], moveCell, aroundMineCount1);

                } else {

                }


            }


        }
        test(row, cell);
    },
    [CLICK_MINE](state, { row, cell }) {
        Vue.set(state.mineSweeperData[row], cell, CODE.BANG);
    },
    [FLAG_BOX](state, { row, cell }) {
        (state.mineSweeperData[row][cell] === CODE.MINE) ? Vue.set(state.mineSweeperData[row], cell, CODE.FLAG_MINE) : Vue.set(state.mineSweeperData[row], cell, CODE.FLAG);
    },
    [QUESTION_BOX](state, { row, cell }) {
        (state.mineSweeperData[row][cell] === CODE.FLAG_MINE) ? Vue.set(state.mineSweeperData[row], cell, CODE.QUESTION_MINE) : Vue.set(state.mineSweeperData[row], cell, CODE.QUESTION);
    },
    [NORMALIZE_BOX](state, { row, cell }) {
        (state.mineSweeperData[row][cell] === CODE.QUESTION_MINE) ? Vue.set(state.mineSweeperData[row], cell, CODE.MINE) : Vue.set(state.mineSweeperData[row], cell, CODE.NORMAL);
    },
    [INCREMENT_TIMER](state, { row, cell }) {

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
    return mines;
};

const watchAroundMineCount = (row, cell, totalRowCount, totalCellCount ,mineSweeperData) => {

    let i = 0;
    let watchAroundKeysLen = Object.keys(mineWatchAroundKeys).length;
    let mineCount = 0;
    for(; i < watchAroundKeysLen ; i++) {

        let objWatchAroundKeys = mineWatchAroundKeys[i];

        let moveRow = row + objWatchAroundKeys[0];
        let moveCell = cell + objWatchAroundKeys[1];

        if(
            (totalRowCount > moveRow  && totalCellCount > moveCell ) &&
            moveRow >= 0 &&
            moveCell >= 0 &&
            mineSweeperData[row + objWatchAroundKeys[0]][cell + objWatchAroundKeys[1]] === CODE.MINE) {
            mineCount++;
        }
    }
    return mineCount;
};

const mineCellFactory = (cell, objectMainRowCount) => {
    let storageCellNumber = [];
    let cellArray = [];
    let r = 0;

    for(; r < objectMainRowCount ; r++) {
        let cellNumber = getRandomCell(cell, storageCellNumber, r);
        storageCellNumber.push(cellNumber);
    }


    let i = 0;
    console.log("storageCellNumber", storageCellNumber);
    for(; i < cell ; i++) {
        let mineYn = (storageCellNumber.includes(i)) ?  CODE.MINE : CODE.NORMAL;
        cellArray.push(mineYn);
    }

    return cellArray;
};

const getRandomCell = (cell, storageCellNumber, r) => {
    let randomCell = getRandom(0, cell);
    if(storageCellNumber.includes(randomCell)) {
        console.log("r", r)
        return getRandomCell(cell, storageCellNumber, r);
    } else {
        return randomCell;
    }
};

const assignMaxScopeRow = (row, cell, mine) => {

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
