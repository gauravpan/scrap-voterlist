import Puppeteer from "puppeteer";
import { objectToFile } from "./utils/object_to_file";

interface VDC {
    id: string;
    name: string;
    province_id: string
    district_id: string
}

export async function getVDCs(url: string, province_id: string, district_id: string): Promise<VDC[]> {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.select('#state', province_id);
    await page.waitForNetworkIdle()
    await page.select('#district', district_id);
    await page.waitForNetworkIdle()
    let _VDCList = await page.evaluate(() => {
        let VDCForm = Array.from(document.querySelectorAll('#vdc_mun option'));
        return VDCForm.map((ele) => {
            return { name: ele.innerHTML, id: ele.getAttribute('value'), };
        });
    })

    _VDCList.shift()
    let VDCList = _VDCList.map((vdc) => ({ province_id, district_id, ...vdc }))

    await objectToFile(VDCList, `VDCs_of_${district_id}`, `${district_id}_VDCs.js`)
    await browser.close();
    return VDCList;
}

