import { defineComponent } from "vue";
import response from "@/model/response";
import middleware from "@/middleware/receiver";
import body from "@/model/body";
const env = process.env.NODE_ENV;
export default defineComponent({
  mixins: [middleware],
  methods: {
    async sendRequest(
      func: typeof body,
      is_decrypt: boolean = true,
      is_alert: boolean = false,
      is_form: boolean = false,
      is_encrypt: boolean = false,
    ) {
      try {
        let res: typeof response = {
          status: false,
          message: "Error",
          status_code: 0,
          data: "",
        };
        const token = localStorage.getItem("token");
        let headers = {};
        if (is_form == true) {
          headers = {
            Authorization: token,
            "Content-Type": `multipart/form-data`,
          };
        } else {
          headers = { Authorization: token };
        }

        if (func.method == "GET") {
          res = await this.$axios.get(func.url, { headers });
        } else if (func.method == "POST") {
          res = await this.$axios.post(func.url, is_encrypt ?
            this.encryptData(func.data) : func.data, { headers });
        } else if (func.method == "PUT") {
          res = await this.$axios.put(func.url, is_encrypt ?
            this.encryptData(func.data) : func.data, { headers });
        } else if (func.method == "DELETE") {
          res = await this.$axios.delete(func.url, { headers });
        } else {
          throw "method not found";
        }

        if (!res.status) throw res.message;

        return {
          status: true,
          message: res.data.message,
          data: is_decrypt ? this.decryptData(res.data.data) : res.data.data,
        };
      } catch (error) {
        if (env == "development") {
          if (is_alert) {
            if (error.response) {
              alert(error.response.data.message);
            } else {
              alert(error);
            }
          }
        }

        if (env == "development") {
          (error.response)
            ? console.log(error.response)
            : console.log(error);
        }

        return {
          status: false,
          message: error.response ? error.response.data.message : error,
        };
      }
    },
    arrToParam(url: string, obj: { [key: string]: string }): string {
      const urlParams = Object.keys(obj)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join("&");
      return `${url}?${urlParams}`;
    },

    generateRules(validationNames: any, field: any): boolean {
      const fieldRules = validationNames.map(validationName => {
        const ruleFunction = this.validationRules[validationName];
        if (ruleFunction) {
          return ruleFunction(field);
        }
      });
      console.log(fieldRules)
      return fieldRules;
    },
    validateForm(rules: any, formData: any) {
      this.formErrors = {};
      this.countError = 0
      const fieldRules = {};

      for (const rule of rules) {
        if (rule.validation && rule.validation.length > 0) {
          fieldRules[rule.model] = this.generateRules(rule.validation, rule.model)
        }
      }

      for (const field in fieldRules) {
        for (const rule of fieldRules[field]) {
          if (rule(formData[field]) != true) {
            this.formErrors[field] = rule(formData[field]);
            this.countError++
          }
        }
      }

      if (this.countError == 0) {
        return true
      } else {
        return false
      }
    },
  },
  data() {
    return {
      formErrors: {},
      countError: 0,
      validationRules: {
        required: field => value => !!value || `${field} is required.`,
        email: field => value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
        numeric: field => value => /^\d+$/.test(value) || `Must contain only numbers.`,
        noSpace: field => value => /^\S+$/.test(value) || `${field} cannot contain spaces.`,
        noSymbol: field => value => /^[a-zA-Z0-9\s]*$/.test(value) || `${field} cannot contain symbols.`,
        combinedValidation: field => value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s]+$/.test(value) ||
          `${field} must contain at least one lowercase letter, one uppercase letter, one number, and one special character.`,


      },
    };
  },
});
