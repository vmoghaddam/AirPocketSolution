Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};
function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    var dfirst = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var dsecond = new Date(second.getFullYear(), second.getMonth(), second.getDate());
    return Math.round((dsecond - dfirst) / (1000 * 60 * 60 * 24));
}

function daysBetween(date1, date2) {   //Get 1 day in milliseconds   
    var one_day = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();    // Calculate the difference in milliseconds  
    var difference_ms = date2_ms - date1_ms;        // Convert back to days and return   
    return Math.round(difference_ms / one_day);
}
function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number.toString();
}
function minutesToHourString(m) {
    return pad(Math.floor(m / 60)).toString() + ':' + pad(m % 60).toString();
}
if (!Date.prototype.toUTCDateTimeDigits) {
    (function () {



        Date.prototype.toUTCDateTimeDigits = function () {
            return this.getUTCFullYear() +
                pad(this.getUTCMonth() + 1) +
                pad(this.getUTCDate()) +
                'T' +
                pad(this.getUTCHours()) +
                pad(this.getUTCMinutes()) +
                pad(this.getUTCSeconds()) +
                'Z';
        };

    }());
}

if (!Date.prototype.toDateTimeDigits) {
    (function () {



        Date.prototype.toDateTimeDigits = function () {
            return this.getFullYear() +
                pad(this.getMonth() + 1) +
                pad(this.getDate()) +
                'T' +
                pad(this.getHours()) +
                pad(this.getMinutes()) +
                pad(this.getSeconds()) +
                'Z';
        };

    }());
}
Date.prototype.getDatePart = function () {
    return this.getFullYear() +
        pad(this.getMonth() + 1) +
        pad(this.getDate());
};
Date.prototype.getDatePartSlash = function () {
    return this.getFullYear() + "/" +
        pad(this.getMonth() + 1) + "/" +
        pad(this.getDate());
};
Date.prototype.getDatePartArray = function () {
    var result = [];
    result.push(this.getFullYear());
    result.push(this.getMonth());
    result.push(this.getDate());
    return result;
};
Date.prototype.getTimePartArray = function () {
    var result = [];
    result.push(this.getHours());
    result.push(this.getMinutes());
    result.push(this.getSeconds());
    return result;
};
Date.prototype.addYears = function (n) {
    var y = this.getFullYear();
    this.setFullYear(y + n);
    return this;
};
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};
Date.prototype.addMinutes = function (h) {
    this.setTime(this.getTime() + (h * 60 * 1000));
    return this;
};
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
Date.prototype.addMonths = function (ms) {
     
    var date = new Date(this.valueOf());
    date.setDate(date.getMonth() + ms);
    return date;
};
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};
Date.prototype.yyyymmddtime = function (utc) {


    if (!utc) {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
        var result = [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('/');
        result += " " + this.toLocaleTimeString();
    }

    else {
        result = "";
        var umm = this.getUTCMonth() + 1; // getMonth() is zero-based
        var udd = this.getUTCDate();
        var uhh = this.getUTCHours();
        var umi = this.getUTCMinutes();
        var uss = this.getUTCSeconds();
        result = this.getUTCFullYear() + "/"
            + ((umm > 9 ? '' : '0') + umm) + "/"
            + ((udd > 9 ? '' : '0') + udd) + " "
            +
            ((uhh > 9 ? '' : '0') + uhh) + ":" + ((umi > 9 ? '' : '0') + umi) + ":" + ((uss > 9 ? '' : '0') + uss);
    }

    return result;
};

Date.prototype.yyyymmddtimenow = function (utc) {
    var now = new Date();

    if (!utc) {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
        var result = [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('/');
        var hh = now.getHours();
        var mi = now.getMinutes();
        var ss = now.getSeconds();
        result += " " //+ this.toLocaleTimeString();
          + ((hh > 9 ? '' : '0') + hh) + ":" + ((mi > 9 ? '' : '0') + mi) + ":" + ((ss > 9 ? '' : '0') + ss);
    }

    else {
        result = "";
        var umm = this.getUTCMonth() + 1; // getMonth() is zero-based
        var udd = this.getUTCDate();
        var uhh = now.getUTCHours();
        var umi = now.getUTCMinutes();
        var uss = now.getUTCSeconds();
        result = this.getUTCFullYear() + "/"
            + ((umm > 9 ? '' : '0') + umm) + "/"
            + ((udd > 9 ? '' : '0') + udd) + " "
            +
            ((uhh > 9 ? '' : '0') + uhh) + ":" + ((umi > 9 ? '' : '0') + umi) + ":" + ((uss > 9 ? '' : '0') + uss);
    }

    return result;
};
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
function getUTCHour(hour) {
    var dt = new Date();
    dt.setHours(hour, 0, 0, 0);
    var hh = dt.getUTCHours();
    var mi = dt.getUTCMinutes();
    return ((hh > 9 ? '' : '0') + hh) + ":" + ((mi > 9 ? '' : '0') + mi);
}

Date.prototype.hhmmnow = function (utc) {

    var result = "";
    if (!utc) {
        result = "";
        var hh = this.getHours();
        var mi = this.getMinutes();
        var ss = this.getSeconds();
        result +=
            ((hh > 9 ? '' : '0') + hh) + ":" + ((mi > 9 ? '' : '0') + mi);// + ":" + ((ss > 9 ? '' : '0') + ss);
    }

    else {
        result = "";

        var uhh = this.getUTCHours();
        var umi = this.getUTCMinutes();
        var uss = this.getUTCSeconds();
        result =
            ((uhh > 9 ? '' : '0') + uhh) + ":" + ((umi > 9 ? '' : '0') + umi);// + ":" + ((uss > 9 ? '' : '0') + uss);
    }

    return result;
};

Date.prototype.ToUTC = function () {
    //2017-12-31T20:30:00.000Z

    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return this.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + ((dd > 9 ? '' : '0') + dd) + 'T' + '12:00:00.000Z';

};

Date.prototype.ToUTC2 = function (i) {
    //2017-12-31T20:30:00.000Z

    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return this.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + ((dd > 9 ? '' : '0') + dd) + 'T' + (!i ? '12:00:00.000Z' : '00:00:00.000Z');

};


if (typeof JSON.clone !== "function") {
    JSON.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
}
if (typeof JSON.copy !== "function") {
    JSON.copy = function (source, destination) {
        for (var key in source) {

            var value = source[key];
            destination[key] = value;

        }
    };
}

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

function GetTimeStr(minutes) {
    var hours = Math.floor(minutes / 60);
    var minutes = minutes % 60;
    var pad = "00"
    var ans = hours.toString() + ":" + pad.substring(0, pad.length - minutes.toString().length) + minutes.toString();
    return ans;
};
General = {};
General.MonthDataSource = [
    { Id: 1, Title: 'فروردین' },
    { Id: 2, Title: 'اردیبهشت' },
    { Id: 3, Title: 'خرداد' },
    { Id: 4, Title: 'تیر' },
    { Id: 5, Title: 'مرداد' },
    { Id: 6, Title: 'شهریور' },
    { Id: 7, Title: 'مهر' },
    { Id: 8, Title: 'آبان' },
    { Id: 9, Title: 'آذر' },
    { Id: 10, Title: 'دی' },
    { Id: 11, Title: 'بهمن' },
    { Id: 12, Title: 'اسفند' },

];
General.IsNumber = function (obj) {
    return !isNaN(parseFloat(obj))
};
General.getDsUrl = function (e) {
    var url = e.url;
    var parts = [];
    if (e.params.$filter)
        parts.push('$filter=' + e.params.$filter);
    if (e.params.$orderby)
        parts.push('$orderby=' + e.params.$orderby);
    if (parts.length > 0) {
        var ext = parts.join("&");
        url = url + "?" + ext;
    }
    return url;
};
General.getDigitalDateByUnix = function (unix) {
    var day = new persianDate(unix);

    var result = Number(day.year().toString() + day.month().toString().padStart(2, "0") + day.date().toString().padStart(2, "0"));
    return result;
};

General.ShowOK = function () {
    DevExpress.ui.notify({
        type: 'success',
        message: "تغییرات با موفقیت ذخیره شد",
        position: {
            my: "center top",
            at: "center top"
        }
    });
};
General.ShowNotify = function (str, t) {
    //'info' | 'warning' | 'error' | 'success' | 'custom'
    DevExpress.ui.notify({
        message: str,
        position: {
            my: "center top",
            at: "center top"
        },
        type: t,
        displayTime: 3000,
    });
};
General.Confirm = function (str, callback) {
    var myDialog = DevExpress.ui.dialog.custom({
        rtlEnabled: true,
        title: "Confirm",
        message: str,
        buttons: [{ text: "No", onClick: function () { callback(false); } }, { text: "Yes", onClick: function () { callback(true); } }]
    });
    myDialog.show();

};

General.Modal = function (str, callback) {
    var myDialog = DevExpress.ui.dialog.custom({
        rtlEnabled: true,
        title: "",
        message: str,
        buttons: [{ text: "Ok", onClick: function () { callback(); } }]
    });
    myDialog.show();

};
General.generateINTFull = function (key) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;

    var day = d.getDate();
    var h = d.getHours();
    var min = d.getMinutes();

    var ms = d.getMilliseconds();
    var s = d.getSeconds();
    return key.toString() + '_' + year.toString() + month.toString() + day.toString() + h.toString() + min.toString() + s.toString() + ms.toString();
};
General.addComma = function (str) {
    if (!str)
        return str;
    str = str.toString();
    var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');

    while (objRegex.test(str)) {
        str = str.replace(objRegex, '$1,$2');
    }

    return str;
};
General.removeComma = function (str) {

    if (str) {
        str = str.toString();
        return str.replace(/,/g, '');
    }
    return str;
};

General.removeHtmlTags = function (str) {

    if (str) {
       str=str.replace(/<\/?[^>]+(>|$)/g, "");
       return str;
    }
    return str;
};
General.shortenString = function (str,n) {
var temp=str;
    if (str) {
    switch(n)
{
case 200:
str=str.replace(/^(.{200}[^\s]*).*/, "$1")  ;
 
break;
case 150:
str=str.replace(/^(.{150}[^\s]*).*/, "$1")  ;
 
break;

case 300:
str=str.replace(/^(.{300}[^\s]*).*/, "$1")  ;
break;
  default:
    str=str.replace(/^(.{100}[^\s]*).*/, "$1")  ;
break;
}
      // str=str.replace(/^(.{100}[^\s]*).*/, "$1")  ;
       if (temp.length>str.length)
            str+=" ...";
       return str;
    }
    return str;
};


///////////////////////////////////
Flight = {};
Flight.statusDataSource = [
    { id: 1, title: 'Scheduled', bgcolor: '#ffd480', color: '#fff', class: 'schedule', selectable: true },
{ id: 5, title: 'Delay', bgcolor: '#ff0000', color: '#fff', class: 'schedule', selectable: true },
   // { id: 22, title: 'Boarding', bgcolor: '#ff66ff', color: '#fff', class: 'boarding', selectable: true },
   // { id: 20, title: 'Start', bgcolor: '#80ffff', color: '#000', class: 'start', selectable: false },
   //  { id: 14, title: 'Off Block', bgcolor: '#80ffff', color: '#fff', class: 'offblock', selectable: true },
  //  { id: 21, title: 'Taxi', bgcolor: '#00b3b3', color: '#fff', class: 'taxi', selectable: true },


 
   // { id: 2, title: 'Take Off', bgcolor: '#00ff00', color: '#000', class: 'takeoff', selectable: true },
   // { id: 3, title: 'Landed', bgcolor: '#99ccff', color: '#000', class: 'landing', selectable: true },
    { id: 15, title: 'On Block', bgcolor: '#66b3ff', color: '#000', class: 'onblock', selectable: true },
    { id: 4, title: 'Canceled', bgcolor: '#808080', color: '#fff', class: 'cancel', selectable: true },
  //  { id: 9, title: 'Returned To Ramp', bgcolor: '#9900cc', color: '#fff', class: 'returntoramp', selectable: true },

    { id: 17, title: 'Diverted', bgcolor: '#e6e600', color: '#000', class: 'redirect', selectable: true },
   // { id: 7, title: 'Diverted', bgcolor: '#e6e600', color: '#000', class: 'diverted' },

   // { id: 6, title: 'Inactive', bgcolor: '#cccccc', color: '#000', class: 'inactive', selectable: true },

   // { id: 8, title: 'Ground', bgcolor: '#ff8000', color: '#fff', class: 'ground' },

   // { id: 10, title: 'Overlap', bgcolor: '#f44336', color: '#fff', class: 'overlap' },
   // { id: 11, title: 'Gap', bgcolor: '#ff5722', color: '#fff', class: 'gap' },
   // { id: 12, title: 'New', bgcolor: '#2196F3', color: '#fff', class: 'new' },
   // { id: 13, title: 'Updated', bgcolor: '#4CAF50', color: '#fff', class: 'updated' },


    //{ id: 16, title: 'Gap-Overlap', bgcolor: '#8b0000', color: '#fff', class: 'gapoverlap' },

    // { id: 10000, title: 'ACheck', bgcolor: 'slategray', color: '#fff', class: 'st10000 hatch-aog' },
    //  { id: 10001, title: 'CCheck', bgcolor: 'slategray', color: '#fff', class: 'st10001 hatch-aog' },
    //  { id: 10002, title: 'AOG', bgcolor: 'slategray', color: '#fff', class: 'st10002 hatch-aog' },






];

//t.replace(/^(.{100}[^\s]*).*/, "$1") + "\n")