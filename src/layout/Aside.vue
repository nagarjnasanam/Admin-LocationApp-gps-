<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
  >
    <a-menu-item key="Dashboard">
      <router-link :to="{ name: 'Admin' }">
        <font-awesome-icon class="icon" :icon="['fas', 'dashboard']" />
        <span> Home </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="users">
      <router-link :to="{ name: 'users' }">
        <font-awesome-icon icon="fas fa-user-friends" />
        <span> Users </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="addUser">
      <router-link :to="{ name: 'addUser' }">
        <font-awesome-icon class="icon" icon="fas fa-user-tie" />
        <span> Add Users </span>
      </router-link>
    </a-menu-item>

    <a-sub-menu key="layout">
      <template v-slot:title
        ><sdFeatherIcons type="layout" /><span>Swith Theme</span></template
      >
      <a-menu-item @click="toggleCollapsed" key="light">
        <a
          @click="
            (e) => {
              e.preventDefault();
              toggleCollapsed();
              modeChangeLight();
            }
          "
          to="#"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-lightbulb" />
          <span>Light Mode</span>
        </a>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="dark">
        <a
          @click="
            (e) => {
              e.preventDefault();
              toggleCollapsed();
              modeChangeDark();
            }
          "
          to="#"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-moon" />
          <span>Dark Mode</span>
        </a>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
import {
  computed,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  defineComponent,
} from "vue";
import VueTypes from "vue-types";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import versions from "../demoData/changelog.json";

export default defineComponent({
  name: "AsideItems",
  props: {
    toggleCollapsed: VueTypes.func,
    events: VueTypes.object,
  },
  setup(props) {
    const store = useStore();
    const darkMode = computed(() => store.state.themeLayout.data);
    const mode = ref("inline");
    const { events } = toRefs(props);
    const {
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
    } = events.value;

    // const router = computed(() => useRoute());
    const state = reactive({
      selectedKeys: ["home"],
      openKeys: ["dashboard"],
      preOpenKeys: ["dashboard"],
    });

    watchEffect(() => {
      // if (router.value.matched.length) {
      //   if (router.value.matched.length > 2) {
      //     state.selectedKeys = [router.value.matched[2].name];
      //     state.openKeys = [router.value.matched[1].name];
      //     state.preOpenKeys = [router.value.matched[1].name];
      //   } else if (router.value.matched.length > 3) {
      //     state.selectedKeys = [router.value.matched[3].name];
      //     state.openKeys = [router.value.matched[1].name];
      //     state.preOpenKeys = [router.value.matched[1].name];
      //   } else {
      //     state.selectedKeys = [router.value.matched[1].name];
      //     state.openKeys = [router.value.matched[1].name];
      //     state.preOpenKeys = [router.value.matched[1].name];
      //   }
      // }
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    return {
      mode,
      ...toRefs(state),
      darkMode,
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
      versions,
    };
  },
});
</script>

<style scoped>
p.sidebar-nav-title {
  border-bottom: 1px solid gainsboro;
  margin: 12px !important;
}
</style>
