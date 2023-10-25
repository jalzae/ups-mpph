<template>
  <form method="post" @submit.prevent="submit">
    <div v-for="item in form" :key="item.model" class="form-group mb-4">
      <label>{{ item.label }}</label>
      <div v-if="item.type == 'text'">
        <input
          v-if="item.action"
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          @change="change(item.action)"
        />
        <input
          v-else
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />
      </div>
      <div v-else-if="item.type == 'readonly'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          readonly
        />
      </div>
      <div v-else-if="item.type == 'email'">
        <input
          type="email"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />
      </div>

      <div v-else-if="item.type == 'textarea'">
        <textarea
          class="border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        ></textarea>
      </div>
      <div
        v-else-if="item.type == 'editor'"
        class="border border-gray-300 outline-none p-2 w-full mt-2"
      >
        <client-only>
          <button
            type="button"
            @click="openGallery"
            class="rounded-sm text-white p-2 shadow-md bg-blue-500 m-4"
          >
            <i class="fas fa-image" />
          </button>
          <div class="divider"></div>
          <ckeditor
            class="border border-gray-300 outline-none p-2 w-full mt-2"
            :aria-placeholder="'Content Here'"
            :editor="editor"
            v-model="selected[item.model]"
            :config="editorConfig"
            ref="ckeditor"
            @ready="onEditorReady"
          ></ckeditor>
        </client-only>
      </div>
      <div v-else-if="item.type == 'date'">
        <input
          type="date"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />
      </div>
      <div v-else-if="item.type == 'pass'">
        <input
          type="password"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />
      </div>
      <div v-else-if="item.type == 'showpass'">
        <input
          :type="[item.status ? 'password' : 'text']"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />

        <input type="checkbox" @click="item.status = !item.status" />
        <label> {{ item.title }}</label>
      </div>
      <div v-else-if="item.type == 'number'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          @keypress="isNumber"
          v-model="selected[item.model]"
        />
      </div>
      <div v-else-if="item.type == 'currency'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          @keypress="isNumber"
          @blur="focusOut(item.model, item.display, $event)"
          @focus="focusIn(item.model, item.display, $event)"
          v-model="selected[item.display]"
        />
      </div>
      <div v-else-if="item.type == 'datetime'">
        <input
          type="datetime-local"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />
      </div>
      <div v-else-if="item.type == 'time'">
        <input
          type="time"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        />
      </div>
      <div v-else-if="item.type == 'file'">
        <input
          type="file"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :id="selected[item.model]"
          @change="previewFiles(item.model, item.extension, item.allow, $event)"
          :aria-describedby="item.model"
        />
        <small :id="item.model" class="form-text text-muted"
          >Allowed :<b> {{ item.allow }}</b></small
        >
      </div>
      <div v-else-if="item.type == 'select'">
        <select
          v-if="item.action"
          class="border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          @change="change(item.action)"
        >
          <option disabled value="">Pilih Opsi</option>
          <option
            v-for="items in item.list"
            :key="items[item.value]"
            :value="items[item.value]"
          >
            {{ items[item.display] }}
          </option>
        </select>
        <select
          v-else
          class="border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
        >
          <option disabled value="">Pilih Opsi</option>
          <option
            v-for="items in item.list"
            :key="items[item.value]"
            :value="items[item.value]"
          >
            {{ items[item.display] }}
          </option>
        </select>
      </div>
      <div v-else>
        <div class="flex items-center justify-items-center">
          <b>Input not Found</b>
        </div>
      </div>
      <p v-if="formErrors[item.model]" class="text-red-500 text-l">
        {{ formErrors[item.model] }}
      </p>
    </div>
    <br />
    <div class="form-group">
      <button
        type="submit"
        class="rounded-sm text-white p-2 shadow-md bg-blue-500 w-full"
        :class="submitclass"
      >
        {{ submitname ? submitname : "Submit" }}
      </button>
    </div>
    <br />
    <div
      v-if="response"
      class="card p-6 bg-white text-red-600 border-x-2 border-b-black"
    >
      <p>{{ response ?? "" }}</p>
    </div>
    <br />
  </form>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import ClassicEditor from "ckeditor5/build/ckeditor";
import CKEditor from "@ckeditor/ckeditor5-vue";

//store
import * as store from "@/store/";
export default defineComponent({
  setup() {
    const modal = store.useModal();
    return {
      modal,
    };
  },
  computed: {},
  mixins: [],
  components: {
    ckeditor: CKEditor.component,
  },
  props: [
    "selected",
    "form",
    "action",
    "submitname",
    "submitclass",
    "messageshow",
    "response",
    "formErrors",
  ],

  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Hello from CKEditor 5!</p>",
      editorInstance: null,
      isEditorReady: false,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "numberedList",
            "bulletedList",
            "alignment",
            "|",
            "heading",
            "fontSize",
            "|",
            "link",
            "imageUpload",
            "|",
            "blockQuote",
            "code",
            "highlight",
            "|",
            "indent",
            "outdent",
            "|",
            "insertTable",
            "mediaEmbed",
            "|",
            "removeFormat",
            "htmlEmbed",
            "horizontalLine",
            "subscript",
            "superscript",
            "insertImage",
          ],
        },
      },
    };
  },
  methods: {
    async submit() {
      this.$emit(this.action, this.selected);
    },
    async change() {
      this.$emit(this.action, this.selected);
    },
    async openGallery() {
      this.modal.set("gallery");
      this.modal.setTitle("Gallery");
    },
    focusOut(current: string, formatted: string, evt: any) {
      // Recalculate the currencyValue after ignoring "$" and "," in user input
      this.selected[current] = parseFloat(
        this.selected[formatted].replace(/[^\d\.]/g, "")
      );
      // Ensure that it is not NaN. If so, initialize it to zero.
      // This happens if user provides a blank input or non-numeric input like "abc"
      if (isNaN(this.selected[current])) {
        this.selected[current] = 0;
      }
      // Format display value based on calculated currencyValue
      const format = this.selected[current]
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

      this.selected[formatted] = format;
      evt.target.value = format;
    },
    focusIn(current: string, formatted: string, evt: any) {
      // Unformat display value before user starts modifying it
      const format = this.selected[current].toString();
      this.selected[formatted] = format;
      evt.target.value = format;
    },
    previewFiles(
      model: string,
      extension: string,
      extArr: string[],
      event: any
    ) {
      const file = event.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if (!extArr.find((e) => e == ext)) {
        alert("Wrong extension!!");
        event.target.value = "";
        return;
      }
      this.selected[model] = file;
      this.selected[extension] = ext;
    },
    onEditorReady(editor: any) {
      this.editorInstance = editor;
      this.isEditorReady = true;
      this.editorInstance.model.document.on("change:data", () => {});
    },
    addImageToEditor() {
      if (this.isEditorReady && this.editorInstance) {
        const imageUrl =
          "https://www.researchgate.net/profile/Samithamby-Senthilnathan/publication/256033196/figure/tbl1/AS:1083988802310146@1635454478882/2-An-example-of-dummy-activity.png";

        const editorInstance = this.editorInstance;

        editorInstance.model.change((writer) => {
          const imageElement = writer.createElement("image", {
            src: imageUrl,
            alt: "Uploaded Image",
          });

          // Insert the image element into the editor's content
          editorInstance.model.insertContent(imageElement);
        });
      } else {
        console.error("CKEditor is not ready.");
      }
    },
  },
  mounted() {},

  watch: {},
  created() {},
});
</script>

<style scoped>
.ck-editor__editable_inline {
  max-height: 600px !important;
  min-height: 300px !important;
  border: 1px solid black;
}
.divider {
  border: 1px solid black;
}
</style>
