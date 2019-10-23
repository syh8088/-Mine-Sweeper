<template>
  <div>
    <mine-sweeper-setting />
    <div>{{timer}}</div>
    <mine-sweeper-table></mine-sweeper-table>
    <div>{{result}}</div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import store from './store';
  import MineSweeperSetting from './MineSweeperSetting';
  import MineSweeperTable from './MineSweeperTable';

  export default {
    store,
    components: {
      MineSweeperSetting,
      MineSweeperTable,
    },
    data() {
      return {
        data: 1,
      }
    },
    computed: {
      ...mapState(['timer', 'result']),
    },
    methods: {

    }
  };
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>
