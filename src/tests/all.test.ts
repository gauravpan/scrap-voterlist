const URL = `https://voterlist.election.gov.np/bbvrs/index_2.php`;
import { getDistricts } from "../getDistricts";
import { getElectionCentres } from "../getElectionCentres";
import { getStates } from "../getStates";
import { getVDCs } from "../getVDCs";
import { getWards } from "../getWards";
import { getVoterNames } from "../getVoterNames";

jest.setTimeout(500000)
// test('getStates', async () => {
//     let vdcs = await getStates(URL);
//     console.log(vdcs)
//     expect(vdcs).toBeTruthy()
// })

// test('getDistrict', async () => {
//     let vdcs = await getDistricts(URL, '5');
//     console.log(vdcs)
//     expect(vdcs).toBeTruthy()
// })



// test('getVDC', async () => {
//     let vdcs = await getVDCs(URL, '5', '54');
//     console.log(vdcs)
//     expect(vdcs).toBeTruthy()
// })

// test('getWard', async () => {
//     let vdcs = await getWards(URL, '5', '54', '5553');
//     console.log(vdcs)
//     expect(vdcs).toBeTruthy()
// })

// test('getElectionCentre', async () => {
//     let vdcs = await getElectionCentres(URL, '5', '54', '5553', '8');
//     console.log(vdcs)
//     expect(vdcs).toBeTruthy()
// })

test('getVoterList', async () => {
    let vdcs = await getVoterNames(URL, '5', '54', '5553', '8', '920');
    console.log(vdcs)
    expect(vdcs).toBeTruthy()
})