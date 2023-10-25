import { useLoading } from "@/store/loading";
import { useUsers } from "@/store/users";

import api from "@/api/index";
import authHub from "@/api/hub";
import authMaster from "@/api/master";
import Res from "@/model/response";
import { defineComponent } from "vue";
import { Auth } from "~~/model/auth";

export default defineComponent({
  mixins: [api],
  methods: {
    async Login() {
      const users = useUsers();
      try {
        const token = localStorage.getItem("token");
        const role_id = localStorage.getItem("role_id");
        if (token) {
          const res: typeof Res = await this.sendRequest(
            role_id == "1"
              ? authMaster.masterlogin_data({})
              : authHub.hublogin_data({})
          );
          if (!res.status) throw res.message;
          const data: Auth = res.data;
          users.set(data);
        } else {
          throw "Not Have Login Data";
        }
      } catch (err) {
        alert("Login Expired or Error");
        window.location.href = "/login";
      } finally {
      }
    },
  },
});
