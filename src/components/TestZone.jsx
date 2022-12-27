import React from "react";
// dayjs imports
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Box } from "@mui/material";

// dayjs config
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayjsRelativeTime);
dayjs.extend(advancedFormat);

// dayjs timezone config
let tzLocal = dayjs.tz.guess(); // gets local client timezone - Europe/Madrid (CET)
tzLocal = "America/New_York"; // reassign to specific timezone - America/New_York (EST)
dayjs.tz.setDefault(tzLocal); // sets default timezone ONLY when .tz() is chained !!

/**
 * NOTE: benchmarks for Number(string) VS parseInt(string, 10)
 * show Number() approx 33% faster performance
 * ref: http://phrogz.net/js/string_to_number.html
 */

const FormatHelper = {
  formatDateLocal: (date) => {
    // LOCAL timezone - Europe/Madrid (CET)
    // IGNORES dayjs.tz.setDefault() setting because .tz() NOT chained
    return dayjs(Number(date)).format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateUTC: (date) => {
    // UTC universal time
    // IGNORES dayjs.tz.setDefault() setting because .tz() NOT chained
    return dayjs.utc(Number(date)).format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateNYC: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
    dayjs.tz.setDefault("America/New_York");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  },
};

const now = String(Date.now()); // timestamps will be fetched as strings
console.log('now :>> ', now);
const now2 = '2022-12-21T20:02:47.697Z'
let c2 = Date.parse(now2) 

const TestZone = () => {
  return (
    <Box>
        <Box display="flex" alignItems="center">
          <Box flex="2 1 0">
            <strong>formatDateLocal(now)</strong>
          </Box>
          <Box flex="3 1 0">{FormatHelper.formatDateLocal(c2)}</Box>
        </Box>
        <hr />

        <Box display="flex" alignItems="center">
          <Box flex="2 1 0">
            <strong>formatDateUTC(now)</strong>
          </Box>
          <Box flex="3 1 0">{FormatHelper.formatDateUTC(c2)}</Box>
        </Box>
        <hr />

        <Box display="flex" alignItems="center">
          <Box flex="2 1 0">
            <strong>
              formatDateNYC(now){" "}
              <span style={{ color: "silver" }}>
                set by dayjs.tz.setDefault("America/New_York")
              </span>
            </strong>
          </Box>
          <Box flex="3 1 0"> {FormatHelper.formatDateNYC(c2)}</Box>
        </Box>
        <hr />
    </Box>
  );
};

export default TestZone;