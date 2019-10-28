<template>
  <table>
    <tr v-for="(rowData, rowIndex) in mineSweeperData" :key="rowIndex">
      <td
              v-for="(cellData, cellIndex) in rowData"
              :key="cellIndex"
              :style="cellDataStyle(rowIndex, cellIndex)"
              @click="detectionMineEvent(rowIndex, cellIndex)"
              @contextmenu.prevent="detectionMineOptionEvent(rowIndex, cellIndex)"
      >
        {{resultText(rowIndex, cellIndex)}}
      </td>
    </tr>
  </table>
</template>
<script>
  import { mapState } from 'vuex';
  import { CLICK_MINE, CODE, FLAG_BOX, NORMALIZE_BOX, OPEN_BOX, QUESTION_BOX } from './store';

  export default {
    computed: {

      ...mapState(['mineSweeperData']),
      cellDataStyle(state) {
        return (row, cell) => {
          switch (this.$store.state.mineSweeperData[row][cell]) {
            case CODE.NORMAL:
            case CODE.MINE:
              return {
                background: '#444',
              };
            case CODE.MINE:
            case CODE.OPENED:
              return {
                background: 'white',
              };
            case CODE.FLAG:
            case CODE.FLAG_MINE:
              return {
                background: 'red',
              };
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
              return {
                background: 'yellow',
              };
            default:
              return {};
          }
        };
      },
      resultText() {
        return (row, cell) => {
          switch (this.$store.state.mineSweeperData[row][cell]) {
            case CODE.MINE:
              return 'X';
            case CODE.NORMAL:
              return '';
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              return '!';
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
              return '?';
            case CODE.BANG:
              return '쾅';
            default:
              return this.$store.state.mineSweeperData[row][cell] || '';
          }
        };
      },
    },
    methods: {
      detectionMineEvent(row, cell) {
        console.log(this.mineSweeperData[row][cell]);
        switch (this.mineSweeperData[row][cell]) {
          case CODE.NORMAL:
            return this.$store.commit(OPEN_BOX, { row, cell });
          case CODE.MINE:
            return this.$store.commit(CLICK_MINE, { row, cell });
          default:
            return;
        }
      },
      detectionMineOptionEvent(row, cell) {
        console.log(this.mineSweeperData[row][cell]);
        switch (this.mineSweeperData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            this.$store.commit(FLAG_BOX, { row, cell });
            return;
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            this.$store.commit(QUESTION_BOX, { row, cell });
            return;
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            this.$store.commit(NORMALIZE_BOX, { row, cell });
            return;
          default:
            return;
        }
      }
    }
  };
</script>
