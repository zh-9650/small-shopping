<template>
  <div class="goods-comment" v-if="commentInfo">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(item, i) in commentInfo.tags"
            :key="item.title"
            @click="changeTag(i)"
            :class="{ active: currTagIndex === i }"
            >{{ item.title }} {{ item.tagCount }}</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        @click="changSort(null)"
        >默认</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="changSort('createTime')"
        >最新</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="changSort('praiseCount')"
        >最热</a
      >
    </div>
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              v-for="i in item.socre"
              :key="i + '1'"
              class="iconfont icon-wjx01"
            ></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref, watch } from '@vue/runtime-core'
import { findCommentInfoByGoods, findCommentListByGoods } from '../../../api/goods'
const getCommentInfo = (goods) => {
  const commentInfo = ref(null)
  findCommentInfoByGoods(goods.value.id).then(res => {
    // console.log(res.result);
    res.result.tags.unshift({ type: 'img', title: '有图', tagCount: res.result.hasPictureCount })
    res.result.tags.unshift({ type: 'all', title: '全部评价', tagCount: res.result.evaluateCount })
    commentInfo.value = res.result
    // console.log(commentInfo.value)
  })
  return commentInfo
}
export default {
  name: "GoodsComment",
  setup() {
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })
    const commentList = ref([])
    const goods = inject('goods')
    const currTagIndex = ref(0)
    // console.log(goods.value);
    const commentInfo = getCommentInfo(goods)
    // console.log(commentInfo);
    const changeTag = (i) => {
      currTagIndex.value = i
      // 设置有图和标签条件
      const currTag = commentInfo.value.tags[i]
      if (currTag.type === 'all') {
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (currTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = currTag.title
      }
      reqParams.page = 1
    }
    const changSort = (type) => {
      // console.log(type)
      reqParams.sortField = type
    }
    watch(reqParams, async () => {
      const data = await findCommentListByGoods(goods, reqParams)
      // console.log(data.result);
      commentList.value = data.result.items
    }, { immediate: true })
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }
    return { commentInfo, changeTag, currTagIndex, reqParams, changSort, formatSpecs, formatNickname, commentList }
  }

}
</script>

<style scoped lang="less">
@import url("../../../assets/style/variables.less");
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
  }
  .data {
    width: 340px;
    display: flex;
    padding: 20px;
    p {
      flex: 1;
      text-align: center;
      span {
        display: block;
        &:first-child {
          font-size: 32px;
          color: @priceColor;
        }
        &:last-child {
          color: #999;
        }
      }
    }
  }
  .tags {
    flex: 1;
    display: flex;
    border-left: 1px solid #f5f5f5;
    .dt {
      font-weight: bold;
      width: 100px;
      text-align: right;
      line-height: 42px;
    }
    .dd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      > a {
        width: 132px;
        height: 42px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        border: 1px solid #e4e4e4;
        background: #f5f5f5;
        color: #999;
        text-align: center;
        line-height: 40px;
        &:hover {
          border-color: @themeColor;
          background: lighten(@themeColor, 50%);
          color: @themeColor;
        }
        &.active {
          border-color: @themeColor;
          background: @themeColor;
          color: #fff;
        }
      }
    }
  }
}
.sort {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  margin: 0 20px;
  color: #666;
  > span {
    margin-left: 20px;
  }
  > a {
    margin-left: 30px;
    &.active,
    &:hover {
      color: @themeColor;
    }
  }
}
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
