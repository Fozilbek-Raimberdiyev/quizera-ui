<template>
  <div class="back">
    <div>
    <!-- <Spinner v-if="isLoading"/> -->
    <div v-if="isLoading">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum vero repellendus nam vitae dolore cum nobis error natus, numquam repudiandae in adipisci consequatur quidem itaque voluptate corrupti. Labore numquam, ipsa odio placeat fugiat sed cum cumque et velit beatae enim modi quasi eveniet sequi quia voluptatem dolorum recusandae qui? Voluptas voluptatem iure omnis fugiat quasi labore tempora sapiente iste alias ducimus autem aperiam molestias beatae assumenda tenetur ipsam, totam consequatur reiciendis! Eius, a esse? Molestias quia accusantium aut fugit distinctio veritatis possimus facere aliquid voluptatibus eum, fugiat optio sapiente sit ab assumenda deleniti quidem consectetur deserunt sequi minus natus quasi ea suscipit. Ducimus officia vel, hic dolore sapiente temporibus, tenetur sequi provident veritatis, accusantium qui facere voluptatem amet repellat quisquam! Aperiam sapiente autem aliquam ad fugiat? Nesciunt iure tempora placeat. Est dolorem doloremque aperiam dignissimos culpa facere minus magni sed iste commodi quas voluptatem a soluta fuga consequatur ipsum, praesentium nemo voluptate sit! Temporibus impedit pariatur nostrum eius sint aliquam dolorum totam enim perspiciatis aliquid. Assumenda repellat ipsum quia id impedit rem nihil aspernatur perspiciatis nam? Repellendus cumque necessitatibus nulla nihil nesciunt omnis fugit, est debitis. Dolore fuga rerum labore reiciendis odio, eos dolor nostrum aperiam facilis corporis. Rem explicabo voluptas suscipit hic voluptatum eius quasi tempore eum magnam possimus aut aliquam placeat voluptatibus corporis, tempora ipsum minus temporibus, enim inventore? Natus quas dicta sint, commodi officia neque voluptas labore alias facilis eum non rem sit odit nobis cumque? Asperiores, est. Tempora tenetur officia eum voluptates omnis in itaque ipsum reiciendis vitae blanditiis? Harum soluta provident, est iure voluptate vitae quae earum deleniti nulla commodi. Nihil nemo iusto distinctio sed. Excepturi odit aut perferendis inventore incidunt voluptatibus sequi soluta asperiores culpa sint numquam vel recusandae vitae minima accusantium alias ut nobis ex hic esse at deserunt a, porro exercitationem. Debitis nesciunt eos eveniet repellat id, nam alias numquam recusandae illo quos, dolore, assumenda laboriosam at nulla soluta. Autem saepe nam cumque reiciendis corrupti architecto, placeat nisi perferendis! Quidem distinctio ratione explicabo, quia, cumque nulla illo tenetur odit ea vel saepe hic nihil magnam rerum ipsam incidunt quas quam. Laborum officiis in nesciunt minima doloremque dignissimos beatae fugit sequi aliquid natus! Fugiat corrupti, eum reiciendis alias maxime accusantium nam asperiores obcaecati quas velit quibusdam eos mollitia placeat reprehenderit, quos, incidunt magnam eveniet deleniti est illum! At ea perferendis ex provident placeat non. Dolores molestias quis nihil aliquam similique quasi! Totam numquam laboriosam perspiciatis sunt eius explicabo dolorem, ipsam nesciunt consequatur ullam asperiores ea natus non id mollitia architecto quae assumenda cupiditate deserunt, nisi fugiat maxime. Cum fuga sit tempore ipsam? Ratione maiores dolor repellat id optio quam, animi, laborum dolore distinctio ab accusamus sed odit officiis blanditiis omnis eveniet fugiat, magni laudantium? Corporis itaque placeat praesentium delectus quos repellendus illum distinctio perspiciatis vero incidunt, cupiditate officiis consequatur repellat quia tempore minima fugiat tenetur illo atque? Minima architecto repellendus, excepturi, vero labore alias ipsa sit omnis est magnam sed. Cupiditate sit nesciunt pariatur iusto! Praesentium nemo inventore earum atque, nesciunt mollitia ipsa?</div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>
<script>
import { mapActions, mapStores } from 'pinia'
import { loadingStore } from './stores/loading.store'
export default {
  data() {
    return {
      isLoading : true
    }
  },
  methods : {
    ...mapActions(loadingStore,["setLoader", "startLoading", "hideLoading"])
  },
  computed : {
    ...mapStores(loadingStore)
  },
  watch : {
    // "loadingStore.loading"(val) {
    //   if(val) {
    //     this.startLoading()
    //   } else {
    //     this.hideLoading()
    //   }
    // }
  },
  mounted() {
    this.$nextTick(() => {
        this.isLoading = false
      })
      this.isLoading = false
    },
  created() {
    // this.setLoader()
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
  .back {
    /* background: #eef0f8;
    height: 100vh; */
  }
</style>