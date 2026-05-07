<template>
  <div>
    <!-- 蓝贴速递 -->
    <section class="mb-12">
      <BluePost :posts="latestBluePosts" />
    </section>

    <!-- Hero区域 -->
    <section class="text-center mb-12">
      <h2 class="diablo-title text-4xl md:text-5xl font-bold mb-4">
        暗黑破坏神玩家导航
      </h2>
      <p class="text-xl text-gray-400 mb-8">
        一站式资源入口 - D2 / D3 / D4
      </p>
      
      <!-- 搜索栏 -->
      <div class="max-w-2xl mx-auto">
        <SearchBar v-model="searchQuery" @search="handleSearch" />
      </div>
    </section>

    <!-- 赛季倒计时 -->
    <section class="mb-12 max-w-md mx-auto">
      <SeasonCountdown />
    </section>

    <!-- 游戏版本快速入口 -->
    <section class="mb-12">
      <h3 class="diablo-title text-2xl mb-6">选择游戏版本</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div 
          v-for="game in games"
          :key="game.version"
          class="diablo-card cursor-pointer text-center"
          @click="goToGame(game.path)"
        >
          <div class="text-6xl mb-4">{{ game.icon }}</div>
          <h4 class="text-2xl font-bold text-[#c8860a] mb-2">{{ game.name }}</h4>
          <p class="text-gray-400">{{ game.description }}</p>
        </div>
      </div>
    </section>

    <!-- 热门资源推荐 -->
    <section class="mb-12">
      <h3 class="diablo-title text-2xl mb-6">热门资源</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <ResourceCard 
          v-for="resource in hotResources"
          :key="resource.id"
          :resource="resource"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '../components/SearchBar.vue';
import ResourceCard from '../components/ResourceCard.vue';
import SeasonCountdown from '../components/SeasonCountdown.vue';
import BluePost from '../components/BluePost.vue';
import { resources } from '../data/resources.js';
import { bluePosts } from '../data/bluePosts.js';

const router = useRouter();
const searchQuery = ref('');

const games = [
  {
    version: 'D2',
    name: '暗黑破坏神2',
    icon: '⚔️',
    description: 'D2/D2R 攻略、工具、社区',
    path: '/guides?version=D2'
  },
  {
    version: 'D3',
    name: '暗黑破坏神3',
    icon: '🩸',
    description: 'D3 攻略、工具、社区',
    path: '/guides?version=D3'
  },
  {
    version: 'D4',
    name: '暗黑破坏神4',
    icon: '🔥',
    description: 'D4 攻略、工具、社区',
    path: '/guides?version=D4'
  }
];

const hotResources = computed(() => {
  return resources.filter(r => r.isHot);
});

const latestBluePosts = computed(() => {
  return bluePosts.slice(0, 5);
});

const handleSearch = (query) => {
  if (query.trim()) {
    router.push({ path: '/guides', query: { search: query } });
  }
};

const goToGame = (path) => {
  router.push(path);
};
</script>
