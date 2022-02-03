import Puppeteer from "puppeteer";
import { objectToFile } from "./utils/object_to_file";

interface District {
    id: string;
    name: string;
    province_id: string
}

export async function getDistricts(url: string, province_id: string): Promise<District[]> {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.select('#state', province_id);
    await page.waitForNetworkIdle()
    const _districtList = await page.evaluate(() => {
        let districtForm = Array.from(document.querySelectorAll('#district option'));
        return districtForm.map((ele) => {
            return { name: ele.innerHTML, id: ele.getAttribute('value'), };
        });
    })
    _districtList.shift()
    let districtList = _districtList.map((district) => ({ ...district, province_id }))
    await objectToFile(districtList, `districts_of_${province_id}`, `${province_id}_districts.js`)
    await browser.close();
    return districtList;
}

