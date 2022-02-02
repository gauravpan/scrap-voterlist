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
    await page.select('#district', province_id);
    await page.waitForNetworkIdle()
    const VDCList = await page.evaluate((province_id) => {
        let stateForm = Array.from(document.querySelectorAll('#vdc_mun option'));
        return stateForm.map((ele) => {
            return { name: ele.innerHTML, id: ele.getAttribute('value'), province_id, district_id };
        });
    }, province_id)
    VDCList.shift()
    await objectToFile(VDCList, `VDCs_of_${district_id}`, `${district_id}_VDCs.js`)
    await browser.close();
    return VDCList;
}

