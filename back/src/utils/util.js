import moment from 'moment';
class util {
    static regexp(data) {
        const regex = new RegExp(/\d{4}-\d{2}-\d{2}/);

        const result = regex.test(data);

        if (result === true) {
            return true;
        } else {
            return false;
        }
    }

    static dateDiff(standard) {
        const standardDate = moment(standard);
        const checkDate = moment();
        const dayDiff = standardDate.diff(checkDate, 'days');
        const hourDiff = standardDate.diff(checkDate, 'hours');
        const minuteDiff = standardDate.diff(checkDate, 'minutes');

        if (dayDiff === 0 && hourDiff === 0) {
            // 작성한지 1시간도 안지났을때
            const minutes = Math.ceil(-minuteDiff);
            return minutes + '분 전'; // '분' 로 표시
        }

        if (dayDiff === 0 && hourDiff <= 24) {
            // 작성한지 1시간은 넘었지만 하루는 안지났을때,
            const hour = Math.ceil(-hourDiff);
            return hour + '시간 전'; // '시간'으로 표시
        }

        return -dayDiff + '일 전';
    }
}

export { util };
