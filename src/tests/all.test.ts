const URL = `https://voterlist.election.gov.np/bbvrs/index_2.php`;
import { getDistricts } from "../getDistricts";
import { getElectionCentres } from "../getElectionCentres";
import { getStates } from "../getStates";
import { getVDCs } from "../getVDCs";
import { getWards } from "../getWards";
import { getVoterNames } from "../getVoterNames";

jest.setTimeout(500000)
test('getStates', async () => {
    let states = await getStates(URL);
    console.log(states)
    expect(states).toBeTruthy()
})

test('getDistrict', async () => {
    let districts = await getDistricts(URL, '5');
    console.log(districts)
    expect(districts).toBeTruthy()
})



test('getVDC', async () => {
    let vdcs = await getVDCs(URL, '5', '54');
    console.log(vdcs)
    expect(vdcs).toBeTruthy()
})

test('getWard', async () => {
    let wards = await getWards(URL, '5', '54', '5553');
    console.log(wards)
    expect(wards).toBeTruthy()
})

test('getElectionCentre', async () => {
    let centres = await getElectionCentres(URL, '5', '54', '5553', '8');
    console.log(centres)
    expect(centres).toBeTruthy()
})

test('getVoterList', async () => {
    let voter_list = await getVoterNames(URL, '5', '54', '5553', '8', '920');
    console.log(voter_list)
    expect(voter_list).toBeTruthy()
})