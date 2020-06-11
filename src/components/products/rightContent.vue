<template>
  <div class="wrapper">
    <div id="map">
      <!-- 百度地图 -->
    </div>
    <div class="right-list">
      <p class="ifLike">猜你喜欢</p>
      <ul class="card">
        <li v-for="(item,index) in list" :key="index">
          <img :src="item.image" class="image" />
          <p class="title">{{item.title}}</p>
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <span class="font-style">{{item.commentNum}}人评价</span>

          <span class="font-style">{{item.address.slice(0,3)}}</span>
          <p>
            <span class="deal-price">￥{{item.avgPrice}}</span>
            <span class="normal">起</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { MP } from "./map.js";
import api from "@/api/index.js";
export default {
  beforeCreate() {
    // 挂载前参数置空
    window._bd_share_main = "";
  },
  mounted() {
    // map
    MP(this.ak).then(BMap => {
      var map = new BMap.Map("map");
      var point = new BMap.Point(121.450981, 31.214427);
      map.centerAndZoom(point, 11); // 初始化
      // 控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      var icon = new BMap.Icon(require("./ps.png"), new BMap.Size(100, 100));
      var marker = new BMap.Marker(new BMap.Point(121.450981, 31.214427), {
        icon: icon
      });
      map.addOverlay(marker);
      map.setCurrentCity("上海");
      map.enableScrollWheelZoom(true); // 鼠标滚轮缩放
      var marker = new BMap.Marker(point); // 标注
      marker.setAnimation(Animation);
    });
    //刷新一次
     if(location.href.indexOf("#reloaded")==-1){
        location.href=location.href+"#reloaded";
        location.reload();
    }

  },
  created() {
    api.getProductsList().then(res => {
      this.list = res.data.data;
    });
  },
  data() {
    return {
      list: [],
      ak: "BVy7xaeyWQ3TDvT2K1bpA8R3EtraWZbF",
      location: null
    };
  }
};
</script>

<style>
/* map区域 */
#map {
  width: 275px;
  height: 220px;
  border: 1px solid #ccc;
  margin-left: 10px;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}

/* 商品区 */
.right-list {
  list-style: none;
  width: 100%;
  height: 100%;
  padding-left: 10px;
}
.right-list .ifLike {
  font-size: 16px;
  margin: 6px 0;
}
.right-list .card img {
  border-radius: 10px;
  display: inline-block;
}
.right-list .card img:hover {
  cursor: pointer;
}
.right-list ul li {
  margin-bottom: 20px;
}
.right-list .card .title {
  font-weight: bold;
  margin: 3px 5px;
}
.font-style {
  font-weight: 400;
  color: #606266;
  cursor: text;
  font-size: 10px;
  display: inline-block;
  margin: 5px 0;
}
.deal-price {
  font-size: 20px;
  font-weight: bold;
  color: #ff6600;
}
.normal {
  font-size: 13px;
  font-weight: bold;
  color: #ff6600;
}
</style>
