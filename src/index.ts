import EventEmitter from "events";
import { getDistricts } from "./getDistricts";
import { getElectionCentres } from "./getElectionCentres";
import { getStates } from "./getStates"
import { getVDCs } from "./getVDCs";
import { getWards } from "./getWards";
export const URL = `https://voterlist.election.gov.np/bbvrs/index_2.php`;
const emitter = new EventEmitter()
emitter.setMaxListeners(0);

(async function scrapAll() {
    let states = await getStates(URL);
    states.forEach(async (state) => {
        let province_id = state.id;
        let districts = await getDistricts(URL, province_id)

        districts.forEach(async (district) => {
            let district_id = district.id
            let VDCs = await getVDCs(URL, province_id, district_id)

            VDCs.forEach(async (vdc) => {
                let vdc_id = vdc.id;
                const wards = await getWards(URL, province_id, district_id, vdc_id)

                wards.forEach(async (ward) => {
                    const ward_no = ward.id
                    const centers = await getElectionCentres(URL, province_id, district_id, vdc_id, ward_no)
                })
            })
        })
    })


})()