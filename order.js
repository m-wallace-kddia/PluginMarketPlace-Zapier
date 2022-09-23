let errReturn = [];
const requests = {
  getAppFields: async (app) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/app/form/fields.json?app=${app.appID}`,
        {
          method: 'GET',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origapp.keyin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          }
        }
      );
      const json = await resp.json();
      return json.properties;
    } catch (error) {
      console.log(error);
    }
  },
  getRecordsofApp: async (app) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/records.json?app=${app.appID}`,
        {
          method: 'GET',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          }
        }
      );
      const json = await resp.json();
      return json.records;
    } catch (error) {
      console.log(error);
    }
  },
  updateRecordByID: async (app, inputRecord) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/record.json`,
        {
          method: 'PUT',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          },
          body: JSON.stringify(inputRecord)
        }
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
  addRecord: async (app, inputRecord) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/records.json`,
        {
          method: 'POST',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          },
          body: JSON.stringify(inputRecord)
        }
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
};

const findInJSON = (needle) => {
  let space;
  API_MAP.keys.map((key) => {
    // edge case where two apps could share same name? => go by id instead?
    if (key.appName.toLowerCase().includes(needle.toLowerCase())) space = key;
    return key;
  });
  return space;
};

const splitString = (input) => {
  let company_start = input.indexOf(':') + 1;
  let company_end = input.indexOf('Phone number:');

  let phone_start = input.indexOf(':', company_end) + 1;
  let phone_end = input.indexOf('kintone subdomain:');

  let domain_start = input.indexOf(':', phone_end) + 1;

  return {
    company: input.substring(company_start, company_end - 1).trim(),
    phone: input.substring(phone_start, phone_end - 1).trim(),
    domain: input.substring(domain_start).trim()
  };
};

const API_MAP = {
  'keys': [
    {
      'id': '0',
      'space': 'N/A',
      'spaceID': null,
      'guestSpace': false,
      'appName': 'PluginMarketPlace : Online Order',
      'appID': 110,
      'key': 'LtHyHKPc24zW4USF0vHQ21ueLzPHrMuRJQk4OZvg'
    },
    {
      'id': '1',
      'space': 'GrapeCity',
      'spaceID': 7,
      'guestSpace': true,
      'appName': 'Customer: GrapeCity',
      'appID': 62,
      'key': 'wONr1k1qtyXrCLtDze1q22EApf59jiWiMXdNETAP'
    },
    {
      'id': '2',
      'space': 'R3',
      'spaceID': 4,
      'guestSpace': true,
      'appName': 'Customer: R3 institute',
      'appID': 44,
      'key': 'Ib4HNWXWZc3Of2cjWFn6Y2XdBSxaTdSYpCUE1oYg'
    },
    {
      'id': '3',
      'space': 'OPRO',
      'spaceID': 2,
      'guestSpace': true,
      'appName': 'Customer: OPRO',
      'appID': 28,
      'key': 'KMZNCbsNE9BL8Hb7BO7iS4db0vs9wY8sHbWEkIyh'
    },
    {
      'id': '4',
      'space': 'RadicalBridge',
      'spaceID': 3,
      'guestSpace': true,
      'appName': 'Customer: RadicalBridge',
      'appID': 39,
      'key': 'MuysqvZlDcEvjiWu4bHXyf76Q6iWfvVlb6FETCJE'
    },
    {
      'id': '5',
      'space': 'Soulware',
      'spaceID': 9,
      'guestSpace': true,
      'appName': 'Customer: Soulware',
      'appID': 76,
      'key': 'TpwJPs2uM397K5e9rVGh59q7ZPS7N1ER6tag8JJv'
    },
    {
      'id': '6',
      'space': 'KAM',
      'spaceID': 12,
      'guestSpace': true,
      'appName': 'Customer: KDDI',
      'appID': 106,
      'key': 'YGI7ruciZ0HLmzOCY5XQHAG2ba4YAzMxQFtZ1j7I'
    },
    {
      'id': '7',
      'space': 'NovelWorks',
      'spaceID': 8,
      'guestSpace': true,
      'appName': 'Customer: NovelWorks',
      'appID': 73,
      'key': 'RoGfkIKHDTZIt2Qes7ghWIUqg3mhSYWpdXzMekxv'
    },
    {
      'id': '8',
      'space': 'Novel Works',
      'spaceID': 8,
      'guestSpace': true,
      'appName': 'Customer: Novel Works',
      'appID': 73,
      'key': 'RoGfkIKHDTZIt2Qes7ghWIUqg3mhSYWpdXzMekxv'
    },
    {
      'id': '9',
      'space': 'JOYZO',
      'spaceID': 19,
      'guestSpace': true,
      'appName': 'Customer: JOYZO',
      'appID': 149,
      'key': 'gdLZuBfBcXu8V1fixSEdQuPpHijhrUCBzPHHFM3R'
    },
    {
      'id': '10',
      'space': 'R3 Institute',
      'spaceID': 4,
      'guestSpace': true,
      'appName': 'Customer: R3 institute',
      'appID': 44,
      'key': 'Ib4HNWXWZc3Of2cjWFn6Y2XdBSxaTdSYpCUE1oYg'
    }
  ]
};

const ordersApp = API_MAP.keys[0];

// get the records of the app we requested
const orderRecords = await requests.getRecordsofApp(ordersApp);

// go through input records and request records of app in space we want to integrate with
await Promise.all(orderRecords.map(async (orderRecord) => {
  // skip if this record is already processed
  if (orderRecord.Imported.value.length) return orderRecord;
  
  // string manipulation and fixing of fields
  let newFields = splitString(orderRecord.reason.value);

  // update the app
  let updatePackage = {
    'app': ordersApp.appID,
    'id': orderRecord.Record_number.value,
    'record': {
      'CompanyName': {
        'value': newFields.company
      },
      'Phone': {
        'value': newFields.phone
      },
      'subdomain': {
        'value': newFields.domain
      }
    }
  };
  await requests.updateRecordByID(ordersApp, updatePackage);

  const appToUpdate = findInJSON(orderRecord.VendorName.value);
  const appRecords = await requests.getRecordsofApp(appToUpdate);

  // now we have to request records from vendor app and find if trial exists for this prodcut and subdomain
  const checks = await Promise.all(appRecords.map(async (vendorRecord) => {
    // for each order record look at all the trial records and compare subdomain and vendor
    let orderSub = orderRecord.subdomain.value.toLowerCase();
    let vendorSub = vendorRecord.subdomain.value.toLowerCase();
    let orderCompany = orderRecord.CompanyName.value.toLowerCase();
    let vendorCompany = vendorRecord.company_name.value.toLowerCase();
    if (orderSub.indexOf('.') !== -1) orderSub = orderSub.substring(0, orderSub.indexOf('.'));
    if (vendorSub.indexOf('.') !== -1) vendorSub = vendorSub.substring(0, vendorSub.indexOf('.'));
    if (orderSub !== vendorSub || orderCompany !== vendorCompany) return true;

    // update the vendor record
    updatePackage = {
      'app': appToUpdate.appID,
      'id': vendorRecord.Record_number.value,
      'record': {
        'Drop_down': {
          'value': 'Active'
        },
        'ProductDetails': {
          'value': orderRecord.ProductDetails.value
        }
      }
    };
    await requests.updateRecordByID(appToUpdate, updatePackage);

    updatePackage = {
      'app': ordersApp.appID,
      'id': orderRecord.Record_number.value,
      'record': {
        'Imported': {
          'value': [ 'Yes' ]
        }
      }
    };
    await requests.updateRecordByID(ordersApp, updatePackage);
    return false;
  }));

  // if we have to add the order record to the trial app as well as the sub vendor space 
  // because we have not found an active trial yet (rare case?)
  if (!checks.includes(false)) {
    // add new record to the found vendor sub app
    const objectToAdd = {
      'app': appToUpdate.appID,
      'records': [
        {
          'company_name': {
            'value': orderRecord.CompanyName.value
          },
          'first_name': {
            'value': orderRecord.FirstName.value
          },
          'last_name': {
            'value': orderRecord.LastName.value
          },
          'email': {
            'value': orderRecord.Email.value
          },
          'phone': {
            'value': orderRecord.Phone.value
          },
          'subdomain': {
            'value': orderRecord.subdomain.value
          },
          'ProductName': {
            'value': orderRecord.ProductName.value
          },
          'VendorName': {
            'value': orderRecord.VendorName.value
          },
          'ProductDetails': {
            'value': orderRecord.ProductDetails.value
          },
          'aggreed_to_personal_information_sharing': {
            'value': ['Agree']
          },
          'us_only': {
            'value': ['Agree']
          },
          'Drop_down': {
            'value': 'Active'
          }
        }
      ]
    };
    let addedRequest = await requests.addRecord(appToUpdate, objectToAdd);
    if(addedRequest) {
      // update record
      let updatePackage = {
        'app': ordersApp.appID,
        'id': orderRecord.Record_number.value,
        'record': {
          'Imported': {
            'value': [ 'Yes' ]
          }
        }
      };
      await requests.updateRecordByID(ordersApp, updatePackage);
    } 
    return orderRecord;
  }
}));

output = {id: 1, errs: errReturn};