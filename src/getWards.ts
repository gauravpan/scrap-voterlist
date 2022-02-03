import Puppeteer from "puppeteer";
import { objectToFile } from "./utils/object_to_file";

interface Ward {
    id: string;
    name: string;
    province_id: string
    district_id: string
    vdc_id: string
}

export async function getWards(url: string, province_id: string, district_id: string, vdc_id: string,): Promise<Ward[]> {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.select('#state', province_id);
    await page.waitForNetworkIdle()
    await page.select('#district', district_id);
    await page.waitForNetworkIdle()
    await page.select('#vdc_mun', vdc_id);
    await page.waitForNetworkIdle()
    const _WardList = await page.evaluate(() => {
        let wardForm = Array.from(document.querySelectorAll('#ward option'));
        return wardForm.map((ele) => {
            return { name: ele.innerHTML, id: ele.getAttribute('value') };
        });
    })
    _WardList.shift()
    let WardList = _WardList.map((ward) => ({ province_id, district_id, vdc_id, ...ward }))
    await objectToFile(WardList, `wards_of_${vdc_id}`, `${vdc_id}_wards.js`)
    await browser.close();
    return WardList;
}

