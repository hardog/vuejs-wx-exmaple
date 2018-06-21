<style lang="less" scoped>
.wrapper{
  background-color: #282B33;
}
.head{
  width: 10rem;
  height: 6.4rem;
  box-sizing: border-box;
  padding-top: 0.59rem;
  padding-left: 0.8rem;
}
.avator{
  width: 2.13rem;
  height: 2.13rem;
  border-radius: 1.065rem;
}
.nick{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.19rem;

  .name{
    font-size: 19px;
    font-family: PingFangSC-Semibold;
    color: rgba(255,255,255,1);
  }
  .gender{
    margin-left: 0.16rem;
    width: 0.43rem;
    height: 0.43rem;
  }
}
.opacityText{
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(255,255,255,1);
  margin-top: 0.21rem;
  opacity: 0.4;
}
.meta{
  margin-top: 0.4rem;
}
.metaNum{
  font-size: 18px;
  font-family: DIN-BlackItalic;
  color: rgba(255,255,255,1);
}
.tabs{
  display: flex;
  width: 10rem;
  height: 1.33rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.tab{
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:15px;
  font-family: PingFangSC-Semibold;
  color: rgba(255,255,255, 0.2);
  background-color: rgba(255,255,255,0.1);
}
.tabSelected{
  background-color: rgba(255,255,255, 0.2);
  color: #ffffff;
  font-size:15px;
  font-family: PingFangSC-Semibold;
}
.content{
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
}
.item{
  width: 10rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0.13rem;
  justify-content: flex-start;
}
.left{
  margin-left: 0.13rem;
}
.hide{
  display: none;
}
.videoWrapper{
  width: 4.8rem;
  height: 2.72rem;
  margin-top: 0.13rem;
  border-radius: 5px;
  background-color: #282B33;
  position: relative;
}
.poster{
  width: 4.8rem;
  height: 2.72rem;
  position: absolute;
  top: 0;
  left: 0;
}
.more{
  width: 9.7rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  margin-left: 0.13rem;
  font-size: 15px;
  font-family: PingFangSC-Semibold;
  color: rgba(0,0,0,0.5);
}
.watchWrapper{
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 0.27rem;
  bottom: 0.29rem;
}
.watchIcon{
  width: 0.37rem;
  height: 0.37rem;
}
.watch{
  font-size: 14px;
  font-family: DIN-BoldItalic;
  color: rgba(255,255,255,0.7);
}
</style>

<template>
  <div class="wrapper">
    <div class="head">
      <img :src="user.iconUrl" class="avator" id="avator"/>
      <div class="nick">
        <span class="name" id="nick">{{user.nickName}}</span>
        <img :src="user.gender" class="gender" id="gender"/>
      </div>
      <div class="opacityText" id="description">{{user.description}}</div>
      <div class="meta">
        <span class="metaNum" id="attentionNum">{{user.attentionNum}}</span>
        <span class="opacityText">关注</span>
        <span class="metaNum" id="fansNum">{{user.fansNum}}</span>
        <span class="opacityText" >粉丝</span>
        <span class="metaNum" id="praiseNum">{{user.praiseNum}}</span>
        <span class="opacityText">赞</span>
      </div>
    </div>
    <ul class="tabs">
      <li class="tab">喜欢</li>
      <li class="tab tabSelected">我的</li>
      <li class="tab">其它</li>
    </ul>
    <ul class="content">
      <li :class="['item', selected === index ? '' : 'hide']"
        :key="index"
        v-for="(item, index) in videos">
        <div :class="['videoWrapper', vi % 2 == 1 ? 'left' : '']"
          v-for="(v, vi) in item" :key="vi">
          <a :href="v.littdeoH5Url"><img :src="v.lidIcon" class="poster"/></a>
          <div class="watchWrapper">
            <img src="#" class="watchIcon"/>
            <span class="watch">{{v.lookNum}}</span>
          </div>
        </div>
        <div v-if="hasMore[index]" class="more" :tab="index">查看更多</div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from 'zepto';

export default{
  data(){
    return {
      base: 'domain host',
      api: {
        user: '/path/to',
        videos: '/path/to'
      },
      pageSize: 20,
      pageNos: [0,0,0],
      hasMore: [true, true, true],
      selected: 1,
      videos: [[], [], []],
      user: {},
      userID: ''
    };
  },
  created(){
    var _this = this;
    _this.getHashKey('data');

    $(function(){
      _this.getUserInfo();
      _this.getVideos(_this.selected);

      $('.tabs').on('click', '.tab', function(evt){
        var $tab = $(evt.currentTarget)[0];
        var index = $('.tabs li').indexOf($tab);

        _this.selected = parseInt(index, 10);
        $('.tabs li')
        .removeClass('tabSelected')
        .eq(index)
        .addClass('tabSelected');

        $('.content li')
        .addClass('hide')
        .eq(index)
        .removeClass('hide');
        _this.getVideos(_this.selected);
      });

      $('.content').on('click', '.more', function(evt){
        var index = parseInt($(this).attr('tab'), 10);
        _this.getVideos(index);
      });
    })
  },
  methods: {
    getUserInfo(){
     // todo
    },
    getVideos(index){
      // todo
    },
    getHashKey(key){
      let reg = new RegExp(`[?|&]${key}=([^&]+)`);
      let match = window.location.search.match(reg);
      this.userID = match && match[1];
    }
  }
}
</script>