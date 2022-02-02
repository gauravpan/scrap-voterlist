import { getDistricts } from "./getDistricts";
import { getStates } from "./getStates"
import { getVDCs } from "./getVDCs";

const URL = `https://voterlist.election.gov.np/bbvrs/index_2.php`;

(async function scrapAll() {
    let states = await getStates(URL);
    states.forEach(async (state) => {
        let province_id = state.id;
        let districts = await getDistricts(URL, province_id)

        districts.forEach(async (district) => {
            let district_id = district.id
            let VDCs = await getVDCs(URL, province_id, district_id)
        })
    })


})()