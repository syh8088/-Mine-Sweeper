<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
              v-for="(cellData, cellIndex) in rowData"
              :key="cellIndex"
              :style="cellDataStyle(rowIndex, cellIndex)"
              @click="onClickTd(rowIndex, cellIndex)"
              @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        {{cellDataText(rowIndex, cellIndex)}}
      </td>
    </tr>
  </table>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    computed: {

    },
    methods: {
      onClickTd() {

      },

    }
  };
</script>
