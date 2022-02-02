import { getDistricts } from "./getDistricts";
import { getStates } from "./getStates"

const URL = `https://voterlist.election.gov.np/bbvrs/index_2.php`;

(async function scrapAll() {
    let states = await getStates(URL);
    states.forEach(async ({ id }) => {
        let districts = await getDistricts(URL, id)
    })


})()