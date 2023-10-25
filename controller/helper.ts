import moment from 'moment'
import * as _ from 'lodash';

export default {
  async getLocation() {
    try {
      const position: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      if (!position) throw "Cant get location";

      return {
        status: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (err) {
      return {
        status: false,
        message: err,
      };
    }
  },
  formatDesc(originalString: string) {
    const limitedString = originalString.length > 100 ? originalString.substring(0, 100) + '...' : originalString;
    return limitedString;
  },
  formatDate(dateToFormat: string) {
    const parsedDate = moment(dateToFormat, 'YYYY-MM-DD HH:mm:ss');
    const formattedDate = parsedDate.format('dddd, D MMMM YYYY');
    return formattedDate;
  },
  formatNumber(num: number): string {
    // Convert the number to a string
    const numStr: string = num.toString();
    // Use regular expression to add commas every three digits
    const formattedNum: string = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedNum;
  },
  removeFormat(str: string): number {
    // Remove commas from the string
    const numStr: string = str.replace(/./g, '');
    // Parse the string back into a number
    const num: number = parseFloat(numStr);
    return num;
  },
  formatToTwoDigits(number: number): string {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number.toString();
    }
  },
  findOne<T>(arr: T[], conditions: FilterCondition<T>[]): T | false {
    const foundItem = _.find(arr, (item: any) => {
      return conditions.every((condition) => {
        const value = item[condition.key];
        const filterValue = condition.value;

        switch (condition.operator) {
          case '!=':
            return value !== filterValue;
          case '>':
            return value > filterValue;
          case '>=':
            return value >= filterValue;
          case '<':
            return value < filterValue;
          case '<=':
            return value <= filterValue;
          default:
            return value === filterValue;
        }
      });
    });

    return foundItem !== undefined ? foundItem : false;
  },
  findAll<T>(arr: T[], conditions: FilterCondition<T>[], logicalOperator: '&&' | '||' = '&&'): T[] | false {
    const foundItem = _.filter(arr, (item: any) => {
      return conditions.every((condition) => {
        const value = item[condition.key];
        const filterValue = condition.value;

        switch (condition.operator) {
          case '!=':
            return value !== filterValue;
          case '>':
            return value > filterValue;
          case '>=':
            return value >= filterValue;
          case '<':
            return value < filterValue;
          case '<=':
            return value <= filterValue;
          default:
            return value === filterValue;
        }
      });
    });
    return (foundItem !== undefined || foundItem.length !== 0) ? foundItem : false;
  },
  delete<T>(arr: T[], conditions: FilterCondition<T>[], logicalOperator: '&&' | '||' = '&&'): T[] {
    return _.reject(arr, (item: any) => {
      return conditions.every((condition) => {
        const value = item[condition.key];
        const filterValue = condition.value;

        switch (condition.operator) {
          case '!=':
            return value !== filterValue;
          case '>':
            return value > filterValue;
          case '>=':
            return value >= filterValue;
          case '<':
            return value < filterValue;
          case '<=':
            return value <= filterValue;
          default:
            return value === filterValue;
        }
      });
    });
  },
  checkArr(data: any): boolean {
    if (Array.isArray(data)) {
      return isArrayEmpty(data) ? false : true;
    } else if (typeof data === "object" && data !== null) {
      //object
      return isObjectEmpty(data) ? false : true;
    } else {
      return false;
    }
  },

  isArrayEmpty(arr: any[]): boolean {
    return Array.isArray(arr) && arr.length === 0;
  },

};
function isArrayEmpty(arr: any[]): boolean {
  return Array.isArray(arr) && arr.length === 0;
}

function isObjectEmpty(obj: object): boolean {
  return (
    typeof obj === "object" && obj !== null && Object.keys(obj).length === 0
  );
}

type FilterCondition<T> = {
  key: keyof T;
  value: any;
  operator?: '==' | '!=' | '>' | '>=' | '<' | '<=';
};
