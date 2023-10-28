<template>
  <div class="p-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <h2>
      Daftar Serah Tugas :<strong>{{ selected.name }}</strong>
    </h2>
    <h2>
      <p>
        DateLine :<strong> {{ selected.dateline }} </strong>
      </p>
    </h2>
    <div class="card my-8" v-html="selected.desc"></div>
    <div v-if="is_view">
      <div class="mb-4">
        <input type="text" class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="keyword" placeholder="Search name .." />
      </div>
      <Tables :format="format" :datas="keyword == '' ? datas : filtered" @action="action" />
    </div>
    <Loading />
    <div style="display: none">
      <input type="file" class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2" id="urlId"
        @change="previewFiles(['pdf', 'docx', 'doc'], $event)" ref="uploadFile" />
    </div>
  </div>
</template>
<script lang="ts">
import Tables from "@/components/Global/Tables.vue";
import Loading from "@/components/Global/Loading.vue";
import Vue, { defineComponent } from "vue";
import { Format } from "~~/model/format";
import Action from "~~/model/action";
import api from "@/api/index";
import home from "@/api/home";
import mahasiswatugas from "@/api/mahasiswatugas";
//store
import * as store from "@/store/";
import Swal from "sweetalert2";
export default defineComponent({
  setup() {
    const loading = store.useLoading();
    const modal = store.useModal();
    return {
      loading,
      modal,
    };
  },
  mixins: [api],
  components: { Tables, Loading },
  props: {},
  methods: {
    async action(val: Action) {
      if (this.is_admin && val.action == "change_status") {
        //
      } else if (val.action == "upload_tugas") {
        this.id_mhs = val.val1;
        const inputElement = this.$refs.uploadFile;
        inputElement.click();
      } else if (val.action == "download") {
        this.downloadTugas(val.val1);
      } else if (val.action == "deletetugas") {
        this.delTugas(val.val1);
      } else if (val.action == "nilai") {

        //cek dulu sudah ada nilai belum
        const mhs = this.datas.find((e: any) => e.id == val.val1);
        if (!mhs.MahasiswaTugas || mhs.MahasiswaTugas.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Mahasiswa belum input tugas'
          })
          return
        }

        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'Message',
          inputPlaceholder: 'Type your message here...',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        })

        if (text) {
          this.updateNilai(mhs.MahasiswaTugas.id, text)
        }
      } else if (val.action == "lihatnilai") {
        Swal.fire({
          icon: 'info',
          title: 'Mau lihat apalu?',
          text: 'Lihat penilaian transfer dulu bos 🙏'
        })
      }
    },
    async updateNilai(idmhstugas: string, penilaian: string) {
      try {
        this.loading.set();
        const res = await this.sendRequest(
          mahasiswatugas.mahasiswatugasupdate(idmhstugas, { penilaian })
        );

        if (!res.status) console.log(res.message);

        await this.getTugas();
      } catch (e) {
      } finally {
        this.loading.unset();
      }
    },
    async delTugas(idmhs: string) {
      try {
        this.loading.set();
        const route = useRoute();
        const { id } = route.query;
        const res = await this.sendRequest(
          home.homedeletetugas({ id_tugas: id, id_mahasiswa: idmhs })
        );

        if (!res.status) console.log(res.message);

        await this.getTugas();
      } catch (e) {
      } finally {
        this.loading.unset();
      }
    },
    downloadTugas(id: string) {
      try {
        const mhs = this.datas.find((e: any) => e.id == id);
        if (mhs.MahasiswaTugas.length == 0) throw "not found detail tugas";
        window.open(`${this.$axios.defaults.baseURL}${mhs.MahasiswaTugas.url}`);
      } catch (e) {
        alert(e);
      } finally {
      }
    },
    async getTugas() {
      try {
        this.loading.set();
        //check url is admin with query id and status
        const route = useRoute();
        const { id, access } = route.query;

        if (!id) throw "not have id";

        const res = await this.sendRequest(home.homereadonetugas(id));
        if (!res.status) {
          throw res.message;
        }

        this.selected = res.data.tugas;
        this.datas = res.data.mahasiswa;
        for (let i of this.datas) {
          if (i.MahasiswaTugas.length != 0) {
            i.status = "true";
            i.penilaian = i.MahasiswaTugas.penilaian
          } else {
            i.status = "false";
          }
        }
        if (access == "4226") {
          this.is_admin = true;
          this.format = {
            header: ["Nama Mahasiswa", "Penilaian", "Status", "Action"],
            body: ["name", "penilaian"],
            btn2: [
              {
                model: "status",
                false: "false",
                title: "Enable",
                icon: "fas fa-download text-white",
                class: "rounded-sm text-white p-2 shadow-md bg-green-500",
                action: "download",
                titlefalse: "",
                iconfalse: "fas fa-close text-white",
                classfalse: "rounded-sm text-white p-2 shadow-md bg-red-500",
                actionfalse: "",
                key: "id",
                key2: "id",
              },
            ],
            action: [
              {
                action: "nilai",
                class: "rounded-sm text-white p-2 shadow-md bg-blue-500",
                model: "id",
                title: "",
                icon: "fas fa-pencil",
              },
              {
                action: "deletetugas",
                class: "rounded-sm text-white p-2 shadow-md bg-red-500",
                model: "id",
                title: "",
                icon: "fas fa-trash",
              },
            ]
          }


        }
      } catch (e) {
        alert(e);
        window.location.href = "/";
      } finally {
        this.loading.unset();
      }
    },
    async checkTugas(id_mhs: string) {
      try {
        this.loading.set();

        const route = useRoute();
        const { id } = route.query;

        const res = await this.sendRequest(
          home.homechecktugas({
            id_tugas: id,
            id_mahasiswa: id_mhs,
            url: this.form_upload.url,
            ext: this.form_upload.ext,
          }),
          true,
          false,
          true
        );
        if (!res.status) throw res.message;
        await this.getTugas();
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: e,
          text: "Lain kali lebih rajin makanya, semangat !",
        });

      } finally {
        this.loading.unset();
      }
    },
    previewFiles(extArr: string[] = ["pdf", "doc", "docx"], event: any) {
      const file = event.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if (!extArr.find((e) => e == ext)) {
        alert("Wrong extension!!");
        event.target.value = "";
        return;
      }
      this.form_upload.url = file;
      this.form_upload.ext = ext;

      this.checkTugas(this.id_mhs);
    },
  },
  data() {
    return {
      keyword: "",
      id_mhs: null,
      is_view: true,
      is_admin: false,
      selected: {
        name: "",
        desc: "",
        dateline: "",
      },
      form_upload: {
        url: "",
        ext: "",
      },
      datas: [],
      format: {
        header: ["Nama Mahasiswa", "Status"],
        body: ["name"],
        btn2: [
          {
            model: "status",
            false: "false",
            title: "Enable",
            icon: "fas fa-check text-white",
            class: "rounded-sm text-white p-2 shadow-md bg-green-500",
            action: "lihatnilai",
            titlefalse: "",
            iconfalse: "fas fa-upload text-white",
            classfalse: "rounded-sm text-white p-2 shadow-md bg-red-500",
            actionfalse: "upload_tugas",
            key: "id",
            key2: "id",
          },
        ],
        action: [],
      } as Format,
    };
  },
  mounted() { },
  async created() {
    await this.getTugas();
  },
  computed: {
    filtered() {
      return this.datas.filter((e: any) =>
        e.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
  watch: {},
});
</script>

<style>
.card {
  padding: 8px;
  border: 1px solid black;
}
</style>
