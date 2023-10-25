import Vue, { defineComponent } from "vue";
import { Buffer } from "buffer";
import base64url from "base64url";
export default defineComponent({
  methods: {
    encryptData(jsonData: any): string {
      const data = JSON.stringify(jsonData);
      const base64Data = Buffer.from(data).toString("base64");
      const hexData = Buffer.from(base64Data, "base64").toString("hex");
      return hexData;
    },

    decryptData(hexData: string): any {
      const decodedBase64Data = Buffer.from(hexData, "hex").toString("base64");
      const decodedData = Buffer.from(decodedBase64Data, "base64").toString(
        "utf-8"
      );
      const payload = decodedData.split(".")[0];
      const decodedPayload = atob(payload);
      const decodedDataObject = JSON.parse(decodedPayload);
      const jsonData = decodedDataObject;
      return jsonData;
    },
  },
  data() {
    return {
      key: "MyebasidKey12345",
    };
  },
});
