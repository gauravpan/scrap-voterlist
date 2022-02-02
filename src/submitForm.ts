import axios from "axios";
import FormData from "form-data";

const formHandlerAPI = `https://voterlist.election.gov.np/bbvrs/index_process_1.php`;

export const getDistricts = (state: string) => {
    return submitForm({ list_type: "district", state });
};

export const getVDC = (district: string) => {
    return submitForm({ list_type: "vdc", district });
};

export const getWard = (vdc: string) => {
    return submitForm({ list_type: "ward", vdc });
};

export const getElectionCenter = (vdc: string, ward: string) => {
    return submitForm({ list_type: "reg_centre", vdc, ward });
};

export const getVoterList = (
    vdc: string,
    ward: string,
    district: string,
    state: string,
    reg_centre: string
) => {

    // state = 5 & district=54 & vdc_mun=5553 & ward=8 & reg_centre=920
    return submitForm({ state, district, vdc, ward, reg_centre });
};

export function submitForm(formData: Record<string, string>) {
    var bodyFormData = new FormData();

    Object.entries(formData).forEach(([property, value]) => {
        bodyFormData.append(property, value);
    });

    return axios({
        url: formHandlerAPI,
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
    });
}

