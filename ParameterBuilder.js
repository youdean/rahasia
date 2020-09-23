function getParameter(params) {
    const map = {};
    map.currCd = params.currCd;
    map.channelCode = params.channelCode;
    map.prodCd = params.prodCd;
    return map;
}

export default {
    getParameter
};