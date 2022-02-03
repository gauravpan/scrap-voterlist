import Puppeteer from "puppeteer";
import { objectToFile } from "./utils/object_to_file";

interface ElectionCentre {
    id: string;
    name: string;
    province_id: string
    district_id: string
    vdc_id: string
    ward_no: string
}

export async function getElectionCentres(url: string, province_id: string, district_id: string, vdc_id: string, ward_no: string): Promise<ElectionCentre[]> {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.select('#state', province_id);
    await page.waitForNetworkIdle()
    await page.select('#district', district_id);
    await page.waitForNetworkIdle()
    await page.select('#vdc_mun', vdc_id);
    await page.waitForNetworkIdle()
    await page.select('#ward', ward_no);
    await page.waitForNetworkIdle()
    const _ElectionCentreList = await page.evaluate(() => {
        let ElectionCentreForm = Array.from(document.querySelectorAll('#reg_centre option'));
        return ElectionCentreForm.map((ele) => {
            return { name: ele.innerHTML, id: ele.getAttribute('value'), };
        });
    })
    _ElectionCentreList.shift()
    let ElectionCentreList = _ElectionCentreList.map((ec) => ({ province_id, district_id, vdc_id, ward_no, ...ec }))
    await objectToFile(ElectionCentreList, `election_centres_of_${vdc_id}_${ward_no}`, `${vdc_id}_${ward_no}_election_centres.js`)
    await browser.close();
    return ElectionCentreList;
}

