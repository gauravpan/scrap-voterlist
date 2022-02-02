import { getDistricts, submitForm } from "./submitForm";
import fs from 'fs'

// submitForm()
const provinces = ['1', '2', '3', '4', '5']

provinces.forEach(async (province) => {
    let res = await getDistricts(province)
    console.log(res.data)
    // fs.writeFileSync(`../raw/district_by_provinces/${province}`, res.data.result);
})
