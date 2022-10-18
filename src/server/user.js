import Parse from "parse";
export default {
  async getUsers(limit, skip) {
    const currentUser = Parse.User.current();

    console.log(limit, skip);
    if (currentUser) {
      const query = new Parse.Query("_User");
      query.limit(limit);
      query.skip(skip);
      const results = await query.find({ useMasterKey: true });
      return results;
    }
  },

  async getUsersLength() {
    const Users = new Parse.Query("_User");
    Users.descending("createdAt");
    var num = await Users.count();
    return num;
  },

  async getPointer(id) {
    const UserClass = Parse.Object.extend("_User");
    const UserQuery = new Parse.Query(UserClass);
    var a = await UserQuery.get(id, { useMasterKey: true })
      .then((object) => {
        return object;
      })
      .catch((error) => {
        console.log("error", error);
      });

    return a;
  },
};
