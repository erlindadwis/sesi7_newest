const { test, expect } = require("@playwright/test")
const { Ajv } = require("ajv");

const ajv = new Ajv()

    test('Test Case 1', async ({ request }) => {
        const response = await request.get('https://api.restful-api.dev/objects/7');
        expect(response.status()).toBe(200)

        const responseData = await response.json()

        expect(responseData.id).toBe("7")
        expect(responseData.name).toBe("Apple MacBook Pro 16")
        expect(responseData.data.year).toBe(2019)
        expect(responseData.data["CPU model"]).toBe("Intel Core i9")

        const valid = ajv.validate(require('./jsonshcema/get-object-schema.json'), responseData)

        if (!valid) {
            console.log("AJV Validation Errors:", ajv.errorsText());
        }

        console.log(responseData);
        expect(valid).toBe(true);
    });

    test('Test Case 2', async ({ request }) => {

        const bodyData = {
            "name": "Laptop 07",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }
        const headerData = {
            Accept: 'application/json'
        }

        const response = await request.post('https://api.restful-api.dev/objects', {
            headers: headerData,
            data: bodyData
        })

        expect(response.status()).toBe(200)

    });



