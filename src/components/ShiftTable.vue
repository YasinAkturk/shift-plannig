<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableList"
    item-key="name"
    items-per-page="0"
    :row-props="colorRowItem"
    :cell-props="colorCellItem"
  >
    <template v-slot:item="{ item, index, columns }">
      <tr
        :class="[0, 1].includes(index) ? 'table-row-yellow' : 'table-row-blue'"
      >
        <td style="width: 300px">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <span>{{ `${item.employee.fullname} (${item.employee.id})` }}</span>
            <span>{{ item.employee.rol }}</span>
          </div>
        </td>
        <td style="width: 100px">{{ item.equivalent }}</td>
        <td style="width: 100px">{{ item.aim }}</td>
        <td
          style="width: 100px"
          :class="item.plan === 45 ? 'plan-success' : 'plan-error'"
        >
          {{ calculatePlan(index, item, columns) }}
        </td>
        <td
          v-for="(column, columnIndex) in columns.slice(4, 11)"
          :key="`day-column-${columnIndex}`"
          class="day-column"
        >
          <AddShift
            @handle-day-click="
              (item, index, columnName) =>
                handleDayClick(item, index, columnName.toString())
            "
            :item="item[column.key]"
            :index="index"
            :columnName="[column.key]"
          />
        </td>
      </tr>
    </template>
    <template #bottom></template>
    <template #top>
      <v-dialog transition="dialog-top-transition" v-model="alertDialog" width="auto"
        ><CustomModal :text="alertText"
      /></v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import AddShift from "./AddShift.vue";
import CustomModal from "./CustomModal.vue";
export default {
  components: {
    AddShift,
    CustomModal,
  },
  props: {
    tableHeaders: {
      type: Array,
    },
    tableList: {
      type: Array,
    },
    radios: {
      type: Object,
    },
    radioList: {
      type: Array,
    },
  },
  watch: {
    alertDialog(newValue, oldValue) {
      console.log(newValue)
    }
  },
  data() {
    return {
      alertText: "",
      alertDialog: false,
    };
  },
  methods: {
    colorRowItem(item) {
      if ([0, 1].includes(item.index)) {
        return { class: "table-row-yellow" };
      } else {
        return { class: "table-row-blue" };
      }
    },
    colorCellItem(item) {
      if (
        !["employee", "equivalent", "aim", "plan"].includes(item.columnName)
      ) {
        return { class: "table-cell-color" };
      }
    },
    calculatePlan(index, item, columns) {
      const plan = columns
        .slice(4, 11)
        .reduce((sum, column) => sum + (item[column.key].timeSkor || 0), 0);
      this.tableList[index].plan = plan || 0;
      return this.tableList[index].plan;
    },
    handleDayClick(item, index, columnName) {
      if (Object.keys(this.radios).length !== 0) {
        // haslabel4 = tıklanan hücrenin satırında daha öncesinde tatil girilmiş mi?
        const hasLabel4 = this.tableHeaders
          .slice(4, 11)
          .some((header) => this.tableList[index][header.value]?.value === 4);

        item = this.radios;
        this.tableList[index][columnName] = this.radios;
        const lastEmptyCell = this.isLastEmptyCell(columnName, index);
        if (hasLabel4 && this.radios.value === 4) {
          this.alertDialog = true;
          this.alertText = "Hafta tatili hafta da sadece bir kez kullanılır.";
          this.tableList[index][columnName] = {};
        }

        if (lastEmptyCell && item.value !== 4) {
          // Tıklanan hücre, satırdaki son boş hücre ve haftalık tatil girilmişse
          this.alertDialog = true;
          this.alertText = "Haftanın bir günü izin girmek zorundasınız.";
          this.tableList[index][columnName] = {};
          if (hasLabel4 && this.radios.value !== 4) {
            this.tableList[index][columnName] = this.radioList[3];
          }
          return;
        }

        if ([0, 1].includes(index)) {
          if ([1, 2].includes(this.radios.value)) {
            const hasLabel4Column = [columnName].some((day) =>
              [4].includes(this.tableList[index === 0 ? 1 : 0][day]?.value)
            );
            const lastEmptyCell = this.isLastEmptyCell(
              columnName,
              index === 0 ? 1 : 0
            );
            if (!hasLabel4Column) {
              //tıkladığı hücrenin karşısına tatil girilmemişse
              this.tableList[index === 0 ? 1 : 0][columnName] =
                this.radios.value === 1 ? this.radioList[1] : this.radioList[0];
              if (lastEmptyCell && this.tableList[index][columnName].value) {
                //tıkladığı hücrenin tam karşısı son boş hücreyse ve henüz tatil girilmemişse
                this.alertDialog = true;
                this.alertText = "Haftanın bir günü izin girmek zorundasınız.";
                this.tableList[index === 0 ? 1 : 0][columnName] = {};
              }
            }
          }
        }
      } else {
        console.log("vRDİYa seçilmedi")
        this.alertDialog = true;
        this.alertText =
          "Vardiya seçimi yapmadınız. Lüften önce vardiya seçiniz.";
      }
    },
    //isLastEmptyCell = Tıklanan hücre son boş hücre mi kontrolü yapılır.
    isLastEmptyCell(cellName, rowIndex) {
      const daysOfWeek = this.tableHeaders.slice(4, 11).map((day) => day.value);

      const labelsInRow = daysOfWeek
        .filter((day) => day !== cellName)
        .map((day) => this.tableList[rowIndex][day]?.value);

      const hasLabelsAfterCell = labelsInRow.every(
        (value) => ![undefined, "", null].includes(value)
      );
      const isFreeday = labelsInRow.some((value) => value === 4);

      return hasLabelsAfterCell && !isFreeday;
    },
  },
};
</script>

<style scoped>
.v-dialog {
  align-items: start;
  margin-top: 200px !important;
  justify-content: center;
  margin: auto;
}
</style>
