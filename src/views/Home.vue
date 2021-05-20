<template>
  <div>
    <div>
      <div class="wrapper">
        <div class="wave-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 380"
            preserveAspectRatio="none"
          >
            <path
              fill="#000b76"
              fill-opacity="1"
              d="M0,320L48,309.3C96,299,192,277,288,261.3C384,245,480,235,576,224C672,213,768,203,864,208C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>

          <b-row
            style="color: white; position: relative; top: 0; left: 0"
            class="p-5"
          >
            <b-col>
              <div style="text-align: left">
                <b-jumbotron header="Zerodha-BhavCopy">
                  <p>Intital Screening Process</p>
                </b-jumbotron>
              </div>
            </b-col>
            <b-col offset-md-3>
              <div class="problem-statement">
                <h5 style="color: lightgreen; font-weight: bold">
                  Problem Statement:
                </h5>
                <p style="font-size: medium">
                  This tool downloads the BhavCopy data from BSEIndia website
                  everyday at 6 PM IST, and presents it in an understanble
                  manner, allowing you to search for a specific scrip and export
                  the same into CSV.
                </p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <b-container fluid class="data-container">
        <div>
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
              <form class="card card-sm" @submit="searchScrip">
                <div class="card-body row no-gutters align-items-center">
                  <div class="col">
                    <input
                      ref="search_string"
                      class="form-control form-control-lg form-control-borderless"
                      placeholder="Scrip Name (eg: HDFC, ICICILIQ)"
                    />
                  </div>
                  <!--end of col-->
                  <div class="col-auto">
                    <button
                      v-if="search_text == ''"
                      class="btn btn-lg btn-success"
                      style="background-color: #000b76"
                    >
                      Search
                    </button>
                    <a
                      v-else
                      class="btn btn-lg btn-success"
                      style="background-color: red"
                      @click="clearSelection"
                      >Clear</a
                    >
                  </div>
                  <!--end of col-->
                </div>
              </form>
            </div>
            <!--end of col-->
          </div>
        </div>
        <br /><br />
      </b-container>
      <TopScrips :search_text="search_text" style="margin-top: 35px" />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
// @ is an alias to /src
import TopScrips from "@/components/TopScrips.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  data() {
    return {
      search_text: "",
    };
  },
  components: {
    TopScrips,
    Footer,
  },
  methods: {
    clearSelection() {
      this.search_text = "";
      this.$refs.search_string.value = "";
    },
    searchScrip(e) {
      e.preventDefault();
      let search_value = this.$refs.search_string.value;
      if (search_value) {
        this.search_text = search_value.trim();
      } else {
        this.search_text = "";
        this.$refs.search_string.value = "";
      }
    },
  },
};
</script>
<style scoped>
.footer,
.push {
  height: 50px;
}
.wrapper {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -142px;
}
.problem-statement {
  text-align: left;
  margin-left: 10px;
}

.data-container {
  margin-top: -15em;
}

.wave-container {
  display: block;
  position: relative;
  background: #fff;
  width: 100%;
  /* color: #FFF; */
  overflow: hidden;
}

@keyframes animateWave {
  0% {
    transform: scale(1, 0);
  }
  100% {
    transform: scale(1, 1);
  }
}
.wave-container > svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
  transform-origin: top;
  animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@media (min-width: 320px) {
  /* smartphones, iPhone, portrait 480x320 phones */
  .wave-container {
    height: 45em;
  }
  .problem-statement {
    margin-top: 15px;
  }
}
@media (min-width: 481px) {
  /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
  .wave-container {
    height: 30em;
  }
}
@media (min-width: 641px) {
  /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
  .data-container {
    margin-top: -10em;
  }
}
@media (min-width: 961px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
}
@media (min-width: 1025px) {
  /* big landscape tablets, laptops, and desktops */
}
@media (min-width: 1281px) {
  /* hi-res laptops and desktops */
}
</style>
