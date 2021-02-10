module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 !== 0) {
        return false;
    }

    let expression = (function (conf) {
        let rE = "";
        for (const bracket of conf) {
            rE +=
                conf.length > 1
                    ? "(\\" + bracket.join("\\") + ")|"
                    : "\\" + bracket.join("\\");
        }

        rE = conf.length > 1 ? rE.slice(0, -1) : rE;

        if (/\d/.test(rE)) {
            rE = rE.replace(/\\/g, "");
        }

        return rE;
    })(bracketsConfig);


    const regExp = new RegExp(expression, "g");

    while (str.length && regExp.test(str)) {
        str = str.replace(regExp, "");
    }

    return str.length === 0;
}
