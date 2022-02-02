import Puppeteer from "puppeteer";
import { objectToFile } from "./utils/object_to_file";

interface State {
    id: string;
    name: string
}

export async function getStates(url: string): Promise<State[]> {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const stateList = await page.evaluate(() => {
        let stateForm = Array.from(document.querySelectorAll('#state option'));
        return stateForm.map((ele) => {
            return { name: ele.innerHTML, id: ele.getAttribute('value') };
        });
    })
    stateList.shift()
    await objectToFile(stateList, 'states', 'states.js')
    await browser.close();
    return stateList;
}

