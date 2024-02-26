<template>
  <v-app>
    <v-main v-if="date.length > 0" class="main-container">
      <h4 class="mb-5">Vardiya Planlama</h4>
      <v-row class="ma-0 mb-5">
        <v-col cols="12" md="6" :class="$vuetify.display.width > 960 ? 'd-flex flex-column justify-start align-start pa-0' : 'd-flex flex-column justify-center align-center'">
          <StoreCard v-once/>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column justify-center align-center pa-0"
          style="gap: 10px"
        >
          <VueDatePicker class="datepicker" v-model="date" :format="format" week-picker :clearable="false" auto-apply/>
          <div class="d-flex justify-center flex-wrap" style="gap: 20px">
            <CustomButton
              buttonType="primary"
              buttonText="Kaydet"
              @onClick="handleSave"
            />
            <CustomButton
              buttonType="success"
              buttonText="Onaya Gönder"
              @onClick="handleCheck"
              disabled
            />
            <CustomButton
              buttonType="danger"
              buttonText="Temizle"
              @onClick="handleReset"
            />
          </div>
        </v-col>
      </v-row>
      <v-radio-group v-model="radios" inline>
        <div class="d-flex flex-wrap justify-center" style="gap: 15px">
          <CustomRadio
            v-for="listItem in radioList"
            :type="listItem.type"
            :item="listItem"
            radioValue="1"
          />
        </div>
      </v-radio-group>
      <ShiftTable :tableHeaders="tableHeaders" :tableList="tableList" :radios="radios" :radioList="radioList"/>
    </v-main>
  </v-app>
</template>
<style>
.main-container{
  margin: 100px auto 0px;
  padding: 50px !important;
}
@media only screen and (max-width: 550px) {
  .main-container {
    padding: 10px !important;
  }
}
.v-table > .v-table__wrapper > table {
  width: 1440px;
  border-spacing: 0;
}
.datepicker{
  width: 100%;
  max-width: 550px; 
}
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > td {
  height: 100px !important;
  text-align: center;
  border: 1px solid rgb(209 209 209 / 12%);
}
.v-data-table-header__content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: smaller;
  font-weight: 500;
}
.v-table > .v-table__wrapper > table {
  border: 1px solid rgb(209 209 209 / 12%);
}
tr {
  background-color: #f5f7fa;
}
.day-column {
  background-color: white;
  padding: 0px;
  width: 100px;
}
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  text-align: center;
  border: 1px solid rgb(209 209 209 / 12%);
  font-size: small;
  font-weight: 400 !important;
}
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: none !important;
}
.table-row-blue {
  background-color: #eaf9fb;
}
.table-row-yellow {
  background-color: #fef8dd;
}
.table-cell-color {
  background-color: #ffffff;
}
.plan-error {
  background-color: #fddcdb;
}
.plan-success {
  background-color: #e8fff3;
}
.v-table--density-default {
  --v-table-header-height: 45px !important;
}
.plus-button {
  border: 1px dashed black !important;
  min-width: 20px !important;
  height: 20px !important;
  width: 20px;
  font-weight: 900 !important;
  padding: 0px !important;
}
</style>
<script>
import CustomButton from "./components/CustomButton.vue";
import CustomRadio from "./components/CustomRadio.vue";
import StoreCard from "./components/StoreCard.vue";
import dayjs from "dayjs";
import ShiftTable from "./components/ShiftTable.vue";
import { getCurrentWeek, getDaysBetweenDates } from "./utils/dates";
export default {
  components: {
    CustomButton,
    CustomRadio,
    StoreCard,
    ShiftTable,
  },
  data() {
    return {
      date: [],
      radios: {},
      saveObject: [],
      radioList: [
        {
          label: "Sabah Vardiyası",
          value: 1,
          timeLabel: "08.45 - 17.15",
          timeSkor: 8.5,
          type: "sabah",
        },
        {
          label: "Akşam Vardiyası",
          value: 2,
          timeLabel: "12.45 - 21.15",
          timeSkor: 8.5,
          type: "aksam",
        },
        {
          label: "Tam Gün",
          value: 3,
          timeLabel: "08.45 - 21.15",
          timeSkor: 12.5,
          type: "tamgun",
        },
        {
          label: "Hafta Tatili",
          value: 4,
          timeSkor: 0,
          type: "izin",
        },
        {
          label: "Diğer",
          value: 5,
          timeSkor: 2.5,
          type: "diger",
        },
      ],
      tableHeaders: [
        { title: "Personel", value: "employee", width: 100 },
        { title: "Denk", value: "equivalent", width: 100 },
        { title: "Hedef", value: "aim", width: 100 },
        { title: "Plan", value: "plan", width: 100 },
        { title: "", value: "dayOne", width: 100 },
        { title: "", value: "dayTwo", width: 100 },
        { title: "", value: "dayThree", width: 100 },
        { title: "", value: "dayFive", width: 100 },
        { title: "", value: "dayFour", width: 100 },
        { title: "", value: "daySix", width: 100 },
        { title: "", value: "daySeven", width: 100 },
      ],
      tableList: [
        {
          employee: {
            fullname: "Yasin Aktürk",
            id: "123",
            rol: "Mağaza Sorumlusu",
          },
          equivalent: 9.93,
          aim: 45,
          plan: 0,
        },
        {
          employee: {
            fullname: "Tutku Aktürk",
            id: "456",
            rol: "Mağaza Sorumlusu Yardımcı",
          },
          equivalent: 9.93,
          aim: 45,
          plan: 0,
        },
        {
          employee: {
            fullname: "Okan Aktürk",
            id: "789",
            rol: "Mağaza Personeli",
          },
          equivalent: 9.93,
          aim: 45,
          plan: 0,
        },
      ],
      dateItem: [],
    };
  },
  watch: {
    date(newValue, oldValue) {
      const start = newValue[0];
      const end = newValue[1];

      this.dateItem = getDaysBetweenDates(start, end);
      this.tableHeaders = [
        { title: "Personel", value: "employee" },
        { title: "Denk", value: "equivalent" },
        { title: "Hedef", value: "aim" },
        { title: "Plan", value: "plan" },
        { title: this.dateItem[0], value: this.dateItem[0] },
        { title: this.dateItem[1], value: this.dateItem[1] },
        { title: this.dateItem[2], value: this.dateItem[2] },
        { title: this.dateItem[3], value: this.dateItem[3] },
        { title: this.dateItem[4], value: this.dateItem[4] },
        { title: this.dateItem[5], value: this.dateItem[5] },
        { title: this.dateItem[6], value: this.dateItem[6] },
      ];
      const result = this.tableList.map((user) => {
        const newUser = { ...user };
        this.dateItem.forEach((date) => {
          newUser[date] = {};
        });
        return newUser;
      });

      this.tableList = result;
    },
  },
  methods: {
    format(){
        return `${dayjs(this.date[0]).format("DD/MM/YYYY")} - ${dayjs(this.date[1]).format("DD/MM/YYYY")}` 
    },
    handleSave() {
      this.saveObject = [];
      for (let x = 0; x < this.tableList.length; x++) {
        for (let i = 0; i < this.dateItem.length; i++) {
          if (this.tableList[x][this.dateItem[i]].value != undefined) {
            this.saveObject.push({
              registrationNumber: this.tableList[x].employee.id,
              day: this.dateItem[i],
              selectType: this.tableList[x][this.dateItem[i]].value,
            });
          }
        }
      }
      this.saveObject.length > 0
        ? console.log("Save Object: ", this.saveObject)
        : console.log("Vardiya seçimi yapılmadan kayıt edilemez.");
    },
    handleCheck(buttonType) {
      console.log(`Button of type ${buttonType} clicked`);
    },
    handleReset() {
      this.tableList = [
        {
          employee: {
            fullname: "Yasin Aktürk",
            id: "123",
            rol: "Mağaza Sorumlusu",
          },
          equivalent: 9.93,
          aim: 45,
          plan: 0,
        },
        {
          employee: {
            fullname: "Tutku Aktürk",
            id: "456",
            rol: "Mağaza Sorumlusu Yardımcı",
          },
          equivalent: 9.93,
          aim: 45,
          plan: 0,
        },
        {
          employee: {
            fullname: "Okan Aktürk",
            id: "789",
            rol: "Mağaza Personeli",
          },
          equivalent: 9.93,
          aim: 45,
          plan: 0,
        },
      ];
      this.date = [];
      const [startOfWeek, endOfWeek] = getCurrentWeek();
      this.date = [startOfWeek, endOfWeek];
      this.saveObject = [];
    },
  },
  mounted() {
    const [startOfWeek, endOfWeek] = getCurrentWeek();
    this.date = [startOfWeek, endOfWeek];
  },
};
</script>
