<template>
  <div id="app">
    <vue-scroll :ops="ops" ref="vs">
      <div class="con">
        <div v-for="(post,index) in posts" class="item clearfix">
          <a @click="slideToggle(index,$event)">{{post.title}}</a>
          <div class="post">
            <p class="time">{{post.time}}</p>
            <div></div>
            <button type="button" class="closeButton" @click="buttonClose($event)">close</button>
          </div>
        </div>
      </div>
      <div id="goTop" @click="gotoTop">
        <img src="/data/img/toTop.png" alt="" style="width: 70px;">
      </div>
    </vue-scroll>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        posts: [],
        content: '',
        hascontent:false,
        // vue scroll
        ops: {
          vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            pullRefresh: {
              enable: false,
              tips: {
                deactive: 'Pull to Refresh',
                active: 'Release to Refresh',
                start: 'Refreshing...',
                beforeDeactive: 'Refresh Successfully!'
              }
            },
            pushLoad: {
              enable: false,
              tips: {
                deactive: 'Push to Load',
                active: 'Release to Load',
                start: 'Loading...',
                beforeDeactive: 'Load Successfully!'
              }
            },
            paging: false,
            zooming: true,
            snapping: {
              enable: false,
              width: 100,
              height: 100
            },
            scroller: {
              bouncing: true,
              locking: true,
              minZoom: 0.5,
              maxZoom: 3,
              speedMultiplier: 1,
              penetrationDeceleration: 0.03,
              penetrationAcceleration: 0.08,
              preventDefault: true
            }
          },
          scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: true,
            scrollingY: true,
            speed: 300,
            easing: undefined
          },
          scrollContent: {
            tag: 'div',
            padding: false,
            props: {},
            attrs: {}
          },
          rail: {
            vRail: {
              width: '6px',
              pos: 'right',
              background: '#fff',
              opacity: 0
            },
            //
            hRail: {
              height: '6px',
              pos: 'bottom',
              background: '#fff',
              opacity: 0
            }
          },
          bar: {
            showDelay: 500,
            vBar: {
              background: '#fff',
              keepShow: false,
              opacity: 1,
              hover: false
            },
            hBar: {
              background: '#fff',
              keepShow: false,
              opacity: 1,
              hover: false
            }
          }
        },
      }
    },
    methods: {
      buttonClose: function (ev) {
        ev.target.parentElement.classList.remove("post-show")
      },
      gotoTop() {
        this.$refs['vs'].scrollTo({x: 0, y:0})
      },
      slideToggle: function (index, ev) {
        if (ev.target.nextElementSibling.classList == "post") {
          ev.target.nextElementSibling.classList = "post post-show hascontent"
          this.log_data(index + 1, ev)
        } else if (ev.target.nextElementSibling.classList == "post hascontent") {
          ev.target.nextElementSibling.classList.add("post-show")
        } else {
          ev.target.nextElementSibling.classList.remove("post-show")
        }
      },
      log_data: function (page, ev) {
        this.$http.get(`/data/json/p${page}.json`)
          .then(response => {
            var content = ev.target.nextElementSibling.querySelector('div')
            content.innerHTML = response.data.content
          })
      }
    },
    mounted() {
      this.$http.get(`/data/json/preview.json`)
        .then(response => {
          this.posts = response.data.posts;
        })
    }
  }


</script>

<style>
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
    color: white;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .actives {
    display: block;
  }

  .vuescroll-content {
    width: 100% !important;
  }

  .con {
    margin-bottom: 200px;
  }

  .con p {
    color: white;
  }

  body {
    background: #000;
  }

  a {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  .item {
    width: 100%;
    min-height: 20px;
    margin-bottom: 10px;
    color: #fff;
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    font-stretch: normal;
    font-family: "Comic Sans MS";
  }

  .post {
    padding: 15px;
    margin: 10px;
    font-size: 14px;
    position: relative;
    display: none;
    border: 0.5px solid white;
    padding-bottom: 60px;
    border-radius: 10px;
  }

  .post img {
    display: block;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .post-show {
    display: block;
  }

  .post .closeButton {
    position: absolute;
    line-height: 30px;
    padding: 0 12px;
    text-align: center;
    margin-left: -30px;
    font-size: 14px;
    font-weight: bold;
    bottom: 15px;
    border-color: transparent;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    color: #24292e;
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
  }

  .post .closeButton:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg, #f0f3f6 0%, #e6ebf1 90%);
    background-position: -.5em;
    border-color: rgba(27, 31, 35, 0.1);
    transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .post p.time {
    font-size: 16px;
    text-align: center;
    padding: 5px;
  }

  .clearfix {
    clear: both;
  }

  .back-to-top {
    display: none;
  }

  #goTop {
    position: fixed;
    right: 20px;
    bottom: 30px;
    opacity: 0.85;
    z-index: 100;
    cursor: pointer;
    transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  #goTop:hover {
    opacity: 1;
    transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
</style>
