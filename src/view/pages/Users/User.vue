<template>
  <sdPageHeader title="Users detail page"></sdPageHeader>
  <sdButton @click="move_to_AddUser" class="adduser" type="primary">
    Add User
  </sdButton>
  <a-input-search
    class="search"
    v-model:value="input.value"
    placeholder="Enter username or id"
  />
  <br /><br />
  <CardToolbox>
    <ContactPageheaderStyle>
      <a-spin :spinning="loader.loading">
        <table class="table">
          <thead>
            <tr class="heading">
              <th>Object Id</th>
              <th>username</th>
              <th>Sharing</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="id in filterData" :key="id" @click="move_to_edit(id)">
              <td>{{ id.id }}</td>
              <td>{{ id.username }}</td>
              <td>{{id.sharing}}</td>
            
            </tr>
          </tbody>
        </table>
        <br /><br />
      </a-spin>
    </ContactPageheaderStyle>
  </CardToolbox>
  <center>
    <pager
      @changed="changed"
      :pageSize="pageSettings.limit"
      :total="pageSettings.total"
      @showSizeChange="onShowSizeChange"
      show-size-changer
    />
  </center>
</template>
<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import { CardToolbox } from "../../styled";
import { ContactPageheaderStyle } from "../style";
import user from "../../../server/user.js";
import pager from "../../../helper/pager.vue";
import moment from "moment";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    CardToolbox,
    ContactPageheaderStyle,
    pager,
  },

  setup() {
    const loader = reactive({ loading: false });
    const pageSettings = reactive({
      users: [],
      filterData: [],
      current: 1,
      limit: 20,
      skip: 0,
      total: null,
    });
    const onShowSizeChange = (current, pageSize) => {
      // console.log(current, pageSize);
      pageSettings.limit = pageSize;
      pageSettings.users = [];
      getUsers();
    };
    const router = useRouter();
    function move_to_edit(id) {
      router.push({ name: "edit", params: { id: id.id } });
    }
    function move_to_AddUser() {
      router.push("/addUser");
    }
    const user_input = reactive({ value: "" });
    const filterData = computed(() => {
      return pageSettings.users.filter((users) => {
        return (
          users.id.toLowerCase().includes(user_input.value.toLowerCase()) ||
          users.username.toLowerCase().includes(user_input.value.toLowerCase())
        );
      });
    });
    const User_length = async () => {
      const get_Users_Length = await user.getUsersLength();
      pageSettings.total = get_Users_Length;
    };

    onMounted(async () => {
      getUsers(1);
      User_length();
    });
    const getUsers = async (current) => {
      loader.loading = true;
      pageSettings.skip = (current - 1) * pageSettings.limit;
      try {
        const results = await user.getUsers(
          pageSettings.limit,
          pageSettings.skip
        );
        for (const object of results) {
          pageSettings.users.push({
            id: object.id,
            lastName: object.get("lastName"),
            emailVarified: object.get("emailVarified"),
            username: object.get("username"),
            sharing:object.get("state"),
            createdAt: moment(object.get("createdAt")).format(
              "MMMM Do YYYY,  HH:mm "
            ),
            firstName: object.get("firstName"),
            email: object.get("email"),
            deleted: object.get("deleted"),
          });
        }
        loader.loading = false;
      } catch (error) {
        console.log(error);
      }
    };

    const changed = async (current) => {
      pageSettings.users = [];
      await getUsers(current);
    };
    return {
      pageSettings: pageSettings,
      loader,
      users: pageSettings.users,
      input: user_input,
      filterData: filterData,
      changed,
      onShowSizeChange,
      move_to_edit,
      move_to_AddUser,
    };
  },
});
</script>
<style scoped>
.flights {
  background: #dbdbd9;
  padding: 1%;
}
.search-box {
  background: #dbdbd9;
  min-height: 45px;
}
table {
  border-collapse: collapse;
}
tr:nth-of-type(odd) {
  background: rgb(240, 239, 239);
}
th {
  background: #2c88b3;
  color: white;
  font-weight: bold;
}
td {
  white-space: nowrap;
  overflow: hidden;
  width: 125px;
  height: 25px;
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  /* text-align: left; */
}
.heading {
  text-align: left;
}
th,
td {
  padding: 15px;
}

tr:hover {
  background-color: rgb(221, 221, 221);
}
.pager {
  width: 5%;
}
.search {
  width: 200px;
  float: right;
}
.adduser {
  float: right;
}
</style>
