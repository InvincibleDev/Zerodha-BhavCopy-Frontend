<template>
  <div id="topScrips">
    <b-row>
      <b-col>
        <b-img
          v-if="loading"
          :src="loaderUrl"
          style="width: 300px; height: auto"
        ></b-img>
        <b-table
          v-else
          hover
          bordered
          responsive
          :sticky-header="true"
          :per-page="perPage"
          :items="data"
          :current-page="currentPage"
          style="margin: 20px"
        >
        </b-table>
        <button class="btn btn-lg btn-success" @click="csvExport">
          Export to CSV
        </button>
      </b-col>
    </b-row>
  </div>
</template>


<script>
export default {
  name: "topscrips",
  props: {
    search_text: String,
  },
  data() {
    return {
      loading: true,
      perPage: 10,
      currentPage: 1,
      data: [],
      top_data: [],
    };
  },
  watch: {
    search_text: {
      immediate: true,
      handler(val, oldVal) {
        console.log(oldVal);
        if (val != "") {
          this.searchScrip(val);
        } else {
          this.data = this.top_data;
        }
      },
    },
  },
  methods: {
    getTopScrips() {
      this.$store
        .dispatch("getTopScrips")
        .then((res) => {
          this.loading = false;
          if (res.status) {
            this.data = [];
            for (var key in res.result) {
              this.data.push({
                Name: key,
                Code: res.result[key].code,
                Open: res.result[key].open,
                High: res.result[key].high,
                Low: res.result[key].low,
                Close: res.result[key].close,
                Date: res.result[key].date,
              });
              this.top_data = this.data;
            }
          } else {
            this.$notify({
              group: "error",
              title: "Error",
              text: res.message,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$notify({
            group: "error",
            title: "Error",
            text: "Something Went Wrong",
          });
        });
    },
    searchScrip(val) {
      this.$store
        .dispatch("searchScrips", val)
        .then((res) => {
          this.loading = false;
          console.log(res);
          if (res.status == 1) {
            this.data = [];
            let scrip_name = Object.keys(res.result)[0];
            let stored_data = res.result[scrip_name];
            for (var value of stored_data) {
              this.data.push({
                Name: scrip_name,
                Code: value.code,
                Open: value.open,
                High: value.high,
                Low: value.low,
                Close: value.close,
                Date: value.date,
              });
            }
          } else {
            this.loading = false;
            this.$notify({
              group: "error",
              title: "Error",
              text: res.message,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$notify({
            group: "error",
            title: "Error",
            text: "Something Went Wrong",
          });
        });
    },
    csvExport() {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(this.data[0]).join(";"),
        ...this.data.map((item) => Object.values(item).join(";")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const downlodable_data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", downlodable_data);
      link.setAttribute(
        "download",
        this.search_text ? this.search_text + ".csv" : "export.csv"
      );
      link.click();
    },
  },
  computed: {
    rows() {
      return this.data.length;
    },
    loaderUrl() {
      return require("../assets/loader.gif");
    },
  },
  created() {
    this.getTopScrips();
  },
};
</script>