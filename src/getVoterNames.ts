import Puppeteer from "puppeteer";
import { objectToFile } from "./utils/object_to_file";

interface ElectionCentre {
    id: string;
    name: string;
    province_id: string
    district_id: string
    vdc_id: string
    ward_no: string
    reg_centre: string
    serial_no: string
    age: string
    gender: string
    spouse_name: string
    father_name: string
    mother_name: string
}

export async function getVoterNames(url: string, province_id: string, district_id: string, vdc_id: string, ward_no: string, reg_centre: string): Promise<ElectionCentre[]> {
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
    await page.select('#reg_centre', reg_centre);
    await page.click('#btnSubmit');

    await page.waitForNetworkIdle()
    const _voterList = await page.evaluate(() => {
        let VoterListForm = Array.from(document.querySelectorAll('tbody tr'));
        console.log({ VoterListForm })
        return VoterListForm.map((ele) => {
            let father_name = ele.children[6]?.innerHTML?.split('/ ')?.[0];
            let mother_name = ele.children[6]?.innerHTML?.split('/ ')?.[1];

            return {
                serial_no: ele.children[0]?.innerHTML,
                id: ele.children[1]?.innerHTML,
                name: ele.children[2]?.innerHTML,
                age: ele.children[3]?.innerHTML,
                gender: ele.children[4]?.innerHTML,
                spouse_name: ele.children[5]?.innerHTML,
                father_name,
                mother_name
            };
        });
    })
    let VoterList = _voterList.map((ec) => ({ province_id, district_id, vdc_id, ward_no, reg_centre, ...ec }))
    await objectToFile(VoterList, `voter_list_of_${province_id}_${district_id}_${vdc_id}_${ward_no}`, `${province_id}_${district_id}_${vdc_id}_${ward_no}_voter_list.js`)
    await browser.close();
    return VoterList;
}

