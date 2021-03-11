import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import {plural} from "@/utils/tz";

dayjs.extend(updateLocale);
dayjs.extend(utc);

function showDaysAgo(d, timestamp) {
    if (timestamp) {
        const hoursDiff = dayjs().diff(dayjs(timestamp), "hour") % (24 * (d - 1));
        if (hoursDiff % 24 < 1) {
            const minutesDiff = dayjs().diff(dayjs(timestamp), "minute") % 60;
            return `${plural(d, 'day')} ${plural(minutesDiff, 'min')} ago`;
        }

        const daysDiff = dayjs().diff(dayjs(timestamp), "day");
        return `${plural(daysDiff, 'day')} ${plural(hoursDiff % 24, 'hr')} ago`;
    }
    return `${plural(d, 'hour')}`;
}

dayjs.updateLocale('en', {
    relativeTime: {
        future: "Time Error!",
        past: "%s ago",
        s: function(_, timestamp) {
            if (timestamp) {
                return 'few seconds ago';
            }
            return `few seconds`;
        },
        m: function(_, timestamp) {
            if (timestamp) {
                return 'a minute ago';
            }
            return `a minute`;
        },
        mm: function(dd, timestamp) {
            if (timestamp) {
                return `${plural(dd, 'min')} ago`;
            }
            return `${plural(dd, 'minute')}`;
        },
        h: function(dd, timestamp) {
            if (timestamp) {
                const hoursDiff = dayjs().diff(dayjs(timestamp), "hour");
                return `${hoursDiff ? '1 hour ' : ''}${plural(dd % 60, 'min')} ago`;
            }
            return `an hour`;
        },
        hh: function(dd, timestamp) {
            if (timestamp) {
                const minutesDiff = dayjs().diff(dayjs(timestamp), "minute") % 60;
                const hoursDiff = dayjs().diff(dayjs(timestamp), "hour");
                return `${plural(hoursDiff, 'hr')} ${plural(minutesDiff, 'min')} ago`;
            }
            return `${plural(dd, 'hour')}`;
        },
        d: function(dd, timestamp) {
            if (timestamp) {
                const minutesDiff = dayjs().diff(dayjs(timestamp), "minute") % 60;
                if (dd === 24) {
                    return `1 day ${plural(minutesDiff, 'min')} ago`;
                } else if (dd > 24) {
                    return `1 day ${plural(dd - 24, 'hr')} ago`;
                }
                const hoursDiff = dayjs().diff(dayjs(timestamp), "hour");
                return `${plural(hoursDiff, 'hour')} ${plural(minutesDiff, 'min')} ago`;
            }
            return `${plural(dd, 'hour')}`;
        },
        dd: showDaysAgo,
        M: showDaysAgo,
        MM: showDaysAgo,
        y: showDaysAgo,
        yy: showDaysAgo
    }
});

export default dayjs;
