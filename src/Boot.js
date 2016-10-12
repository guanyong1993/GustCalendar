/**
 * Created by GuanYong on 16/9/1.
 */

/**
 * 日历控件
 * @constructor GustCalendar
 * @param dom {Object} 需要显示日历的文档对象(jQuery元素)
 */
var GustCalendar = function (dom) {
    var lunarInfo, solarMonth, animals, solarTerm, sTermInfo, nStr1, nStr2, sFtv, lFtv, currentMonth = 0, currentYear = 0, currentTime = 0, gridsDom, toggleDom;

    (function () {
        lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0];

        solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
        sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
        nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        nStr2 = ['初', '十', '廿', '卅'];
        sFtv = ["0101 元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0315 消费者权益日", "0401 愚人节", "0501 劳动节", "0504 青年节", "0512 护士节", "0601 儿童节", "0701 建党节", "0801 建军节", "0910 教师节",
            "0928 孔子诞辰", "1001 国庆节", "1006 老人节", "1024 联合国日", "1224 平安夜", "1225 圣诞节"];
        lFtv = ["0101 春节", "0115 元宵节", "0505 端午节", "0707 七夕节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年"];
    })();

    //返回农历y年的总天数
    var lYearDays = function (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1)sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + leapDays(y));
    };

    //返回农历y年闰月的天数
    var leapDays = function (y) {
        if (leapMonth(y))  return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        else return (0);
    };

    //判断y年的农历中那个月是闰月,不是闰月返回0
    var leapMonth = function (y) {
        return (lunarInfo[y - 1900] & 0xf);
    };

    //返回农历y年m月的总天数
    var monthDays = function (y, m) {
        return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    };

    //返回公历y年m+1月的天数
    var solarDays = function (y, m) {
        if (m == 1)
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        else
            return (solarMonth[m]);
    };

    //返回某年的第n个节气为几日(从0小寒起算)
    var sTerm = function (y, n) {
        var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        return (offDate.getUTCDate())
    };

    //保存y年m+1月的相关信息
    var fat = 9, mat = 9, eve = 0;

    //用中文显示农历的日期
    var cDay = function (d) {
        var s;
        switch (d) {
            case 10:
                s = '初十';
                break;
            case 20:
                s = '二十';
                break;
                break;
            case 30:
                s = '三十';
                break;
                break;
            default :
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return (s);
    };

    var cld;

    var drawCld = function (SY, SM) {
        currentYear = SY;
        currentMonth = SM;
        dom.find(".console .year .label").text(SY + "年");
        dom.find(".console .month .label").text((SM + 1) + "月");

        var i, sD, s;
        cld = calendar(SY, SM);
        var sx = animals[(SY - 4) % 12];    //生肖
        for (i = 0; i < 42; i++) {
            var gObj = gridsDom.find('#GD' + i);
            var sObj = gridsDom.find('#SD' + i)[0];
            var lObj = gridsDom.find('#LD' + i)[0];
            sD = i - cld.firstWeek;
            if (sD > -1 && sD < cld.length) { //日期内
                gObj.removeClass("disable");
                sObj.innerHTML = sD + 1;
                gObj.attr('data-value', sD + 1);
                if (cld[sD].isToday) {
                    gObj.addClass("today");
                } //设置今日样式
                else {
                    gObj.removeClass("today");
                }
                if (cld[sD].lDay == 1) { //显示农历月
                    lObj.innerHTML = '<b>' + (cld[sD].isLeap ? '闰' : '') + cld[sD].lMonth + '月' + (monthDays(cld[sD].lYear, cld[sD].lMonth) == 29 ? '小' : '大') + '</b>';
                }
                else {
                    lObj.innerHTML = cDay(cld[sD].lDay);
                }    //显示农历日
                var Slfw = null,Ssfw = null;
                s = cld[sD].solarFestival;
                for (var ipp = 0; ipp < lFtv.length; ipp++) {    //农历节日
                    if (parseInt(lFtv[ipp].substr(0, 2)) == (cld[sD].lMonth)) {
                        if (parseInt(lFtv[ipp].substr(2, 4)) == (cld[sD].lDay)) {
                            lObj.innerHTML = lFtv[ipp].substr(5);
                            Slfw = lFtv[ipp].substr(5);
                        }
                    }
                    if (12 == (cld[sD].lMonth)) {    //判断是否为除夕
                        if (eve == (cld[sD].lDay)) {
                            lObj.innerHTML = "除夕";
                            Slfw = "除夕";
                        }
                    }
                }
                for (var ipp = 0; ipp < sFtv.length; ipp++) {    //公历节日
                    if (parseInt(sFtv[ipp].substr(0, 2)) == (SM + 1)) {
                        if (parseInt(sFtv[ipp].substr(2, 4)) == (sD + 1)) {
                            lObj.innerHTML = sFtv[ipp].substr(5);
                            Ssfw = sFtv[ipp].substr(5);
                        }
                    }
                }
                if ((SM + 1) == 5) {    //母亲节
                    if (fat == 0) {
                        if ((sD + 1) == 7) {
                            Ssfw = "母亲节";
                            lObj.innerHTML = "母亲节"
                        }
                    }
                    else if (fat < 9) {
                        if ((sD + 1) == ((7 - fat) + 8)) {
                            Ssfw = "母亲节";
                            lObj.innerHTML = "母亲节"
                        }
                    }
                }
                if ((SM + 1) == 6) {    //父亲节
                    if (mat == 0) {
                        if ((sD + 1) == 14) {
                            Ssfw = "父亲节";
                            lObj.innerHTML = "父亲节"
                        }
                    }
                    else if (mat < 9) {
                        if ((sD + 1) == ((7 - mat) + 15)) {
                            Ssfw = "父亲节";
                            lObj.innerHTML = "父亲节"
                        }
                    }
                }

                if (s.length <= 0) {    //设置节气的颜色
                    s = cld[sD].solarTerms;
                    if (s.length > 0) s = s.fontcolor('limegreen');
                }
                if (s.length > 0) {
                    lObj.innerHTML = s;
                    Slfw = s;
                }    //节气
                if ((Slfw != null) && (Ssfw != null)) {
                    lObj.innerHTML = Slfw + "/" + Ssfw;
                }
            }
            else { //非日期
                //获取上月最后一天
                gObj.addClass("disable");
                gObj.attr('data-value', '');
                if (sD < 0) {
                    var prevLastDate = new Date(SM > 0 ? SY : SY - 1, SM > 0 ? SM : 12, 0).getDate();
                    sObj.innerHTML = prevLastDate + sD + 1;
                    lObj.innerHTML = '';
                } else {
                    sObj.innerHTML = sD - cld.length + 1;
                    lObj.innerHTML = '';
                }

            }
        }

        dom.find('.date-grid.active').removeClass('active');
        if (null != currentTime) {
            if (currentYear == currentTime.year && currentMonth == currentTime.month) {
                dom.find('.date-grid[data-value="' + currentTime.date + '"]').addClass('active');
            }
        }
    };

    var tY = new Date().getFullYear(), tM = new Date().getMonth(), tD = new Date().getDate();

    //算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
    var dianaday = function (objDate) {
        var i, leap = 0, temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;
        var dayCyl = offset + 40;
        var monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            monCyl += 12;
        }
        if (offset < 0) {
            offset += temp;
            i--;
            monCyl -= 12;
        }
        var year = i;
        var yearCyl = i - 1864;
        leap = leapMonth(i); //闰哪个月
        var isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && isLeap == false) {    //闰月
                --i;
                isLeap = true;
                temp = leapDays(year);
            }
            else {
                temp = monthDays(year, i);
            }
            if (isLeap == true && i == (leap + 1)) isLeap = false;    //解除闰月
            offset -= temp;
            if (isLeap == false) monCyl++;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
            if (isLeap) {
                isLeap = false;
            }
            else {
                isLeap = true;
                --i;
                --monCyl;
            }
        if (offset < 0) {
            offset += temp;
            --i;
            --monCyl;
        }
        var month = i;
        var day = offset + 1;
        return {
            dayCyl: dayCyl,
            monCyl: monCyl,
            year: year,
            yearCyl: yearCyl,
            isLeap: isLeap,
            month: month,
            day: day
        };
    };

    //记录公历和农历某天的日期
    var calElement = function (sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap) {
        return {
            isToday: false,
            sYear: sYear,
            sMonth: sMonth,
            sDay: sDay,
            week: week,
            lYear: lYear,
            lMonth: lMonth,
            lDay: lDay,
            isLeap: isLeap,
            lunarFestival: '',
            solarFestival: '',
            solarTerms: ''
        };
    };

    var calendar = function (y, m) {
        fat = mat = 0;
        var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2;
        var lDPOS = new Array(3);
        var n = 0;
        var firstLM = 0;
        sDObj = new Date(y, m, 1);    //当月第一天的日期
        var obj = {};
        obj.length = solarDays(y, m);    //公历当月天数
        obj.firstWeek = sDObj.getDay();    //公历当月1日星期几
        if ((m + 1) == 5) {
            fat = sDObj.getDay()
        }
        if ((m + 1) == 6) {
            mat = sDObj.getDay()
        }
        for (var i = 0; i < obj.length; i++) {
            if (lD > lX) {
                sDObj = new Date(y, m, i + 1);    //当月第一天的日期
                lDObj = dianaday(sDObj);     //农历
                lY = lDObj.year;           //农历年
                lM = lDObj.month;          //农历月
                lD = lDObj.day;            //农历日
                lL = lDObj.isLeap;         //农历是否闰月
                lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最後一天
                if (lM == 12) {
                    eve = lX
                }
                if (n == 0) firstLM = lM;
                lDPOS[n++] = i - lD + 1;
            }
            obj[i] = calElement(y, m + 1, i + 1, nStr1[(i + obj.firstWeek) % 7], lY, lM, lD++, lL);
            if ((i + obj.firstWeek) % 7 == 0) {
                obj[i].color = 'red';  //周日颜色
            }
        }
        //节气
        tmp1 = sTerm(y, m * 2) - 1;
        tmp2 = sTerm(y, m * 2 + 1) - 1;
        obj[tmp1].solarTerms = solarTerm[m * 2];
        obj[tmp2].solarTerms = solarTerm[m * 2 + 1];
        if ((obj.firstWeek + 12) % 7 == 5)    //黑色星期五
            obj[12].solarFestival += '黑色星期五';
        if (y == tY && m == tM) obj[tD - 1].isToday = true;    //今日
        return obj;
    };

    var builderDateGrid = function () {
        for (var i = 0; i < 6; i++) {
            var dateGridRow = document.createElement("div");
            if (i == 5) {
                dateGridRow.className = "date-grid-row last";
            } else {
                dateGridRow.className = "date-grid-row";
            }
            for (var j = 0; j < 7; j++) {
                var index = i * 7 + j;
                var dateGrid = document.createElement("div");
                dateGrid.id = "GD" + index;
                if (j == 6) {
                    dateGrid.className = "date-grid last";
                } else {
                    dateGrid.className = "date-grid";
                }
                var sd = document.createElement("span");
                sd.id = "SD" + index;
                sd.className = "sd";
                var ld = document.createElement("span");
                ld.id = "LD" + index;
                ld.className = "ld";
                dateGrid.appendChild(sd);
                dateGrid.appendChild(ld);
                dateGridRow.appendChild(dateGrid);
            }
            gridsDom[0].appendChild(dateGridRow);
        }
    };

    /**
     * 初始化日历视图
     */
    this.enableView = function () {
        var header = '<div class="console">' +
                '<div class="year">' +
                    '<div class="prev-btn">&lt;</div>' +
                    '<div class="next-btn">&gt;</div>' +
                    '<div class="label"></div>' +
                '</div>' +
                '<div class="month">' +
                    '<div class="prev-btn">&lt;</div>' +
                    '<div class="next-btn">&gt;</div>' +
                    '<div class="label"></div>' +
                '</div>' +
            '</div>';

        var week = '<div class="week">' +
                '<div class="label">日</div>' +
                '<div class="label">一</div>' +
                '<div class="label">二</div>' +
                '<div class="label">三</div>' +
                '<div class="label">四</div>' +
                '<div class="label">五</div>' +
                '<div class="label">六</div>' +
            '</div>';

        var content = '<div class="grids"></div>';

        dom.append(header + week + content);

        gridsDom = dom.find(".grids");
        builderDateGrid();
        drawCld(tY, tM);

        var self = this;
        dom.find(".console .year .prev-btn").click(function () {
            self.prevYear();
        });
        dom.find(".console .year .next-btn").click(function () {
            self.nextYear();
        });

        dom.find(".console .month .prev-btn").click(function () {
            self.prevMonth();
        });
        dom.find(".console .month .next-btn").click(function () {
            self.nextMonth();
        });
    };

    var startListener, endListener;

    /**
     * 初始化为表单控件
     */
    this.enableFormControl = function () {
        toggleDom = dom;
        var self = this;
        var isOpen = false;

        startListener = function () {
            if (!isOpen) {
                isOpen = true;
                var x = toggleDom.offset().left;
                var y = toggleDom.offset().top + toggleDom.outerHeight();
                var maxX = $('body').width() - $('body').offset().left;
                var maxY = $('body').height() - $('body').offset().top;
                if (x + 308 > maxX) {
                    x = maxX - 313;
                }
                if (y + 339 > maxY) {
                    y = maxY - 344;
                }
                var positionStyle = 'left: ' + x + 'px; ' +
                    'top: ' + y + 'px;';
                dom = $('<div id="__gust_calender_container" style="' + positionStyle + '"></div>').appendTo('body');
                self.enableView();

                if ('' != toggleDom.val()) {
                    var dateFormats = toggleDom.val().split('-');
                    if (dateFormats.length >= 3) {
                        self.gotoDate(parseInt(dateFormats[0]), parseInt(dateFormats[1]), parseInt(dateFormats[2]));
                    }
                }

                endListener = function (e) {
                    if ($(e.target).closest(dom).length == 0) {
                        isOpen = false;
                        dom.empty();
                        dom.remove();
                        document.body.removeEventListener('click', endListener, true);
                    }
                };
                document.body.addEventListener('click', endListener, true);

                dom.find(".grids .date-grid").click(function () {
                    if (!$(this).hasClass('disable')) {
                        dom.find(".grids .date-grid.active").removeClass('active');
                        $(this).addClass('active');
                        isOpen = false;
                        dom.empty();
                        dom.remove();
                        document.body.removeEventListener('click', endListener, true);
                        var m = currentMonth + 1;
                        var d = $(this).find('.sd').html();
                        toggleDom.val(currentYear + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d: d));
                    }
                });
            }
        };
        toggleDom[0].addEventListener('click', startListener, true);
    };
    
    this.destroy = function () {
        dom.empty();
        if (null != toggleDom) {
            toggleDom[0].removeEventListener('click', startListener, true);

            if (null != dom) {
                dom.remove();
            }
        }
        if (null != endListener) {
            document.body.removeEventListener('click', endListener, true);
        }

        toggleDom = null;
        startListener = null;
        endListener = null;
        dom = null;
    };

    this.prevYear = function () {
        if (currentYear == 1900) {
            drawCld(2050, currentMonth);
        } else {
            drawCld(currentYear - 1, currentMonth);
        }
    };

    this.nextYear = function () {
        if (currentYear == 2050) {
            drawCld(1900, currentMonth);
        } else {
            drawCld(currentYear + 1, currentMonth);
        }
    };

    this.prevMonth = function () {
        if (currentMonth == 0) {
            drawCld(currentYear - 1, 11);
        } else {
            drawCld(currentYear, currentMonth - 1);
        }
    };

    this.nextMonth = function () {
        if (currentMonth == 11) {
            drawCld(currentYear + 1, 0);
        } else {
            drawCld(currentYear, currentMonth + 1);
        }
    };

    this.gotoDate = function (year, month, date) {
        if (null != date) {
            currentTime = {year: year, month: month - 1, date: date};
        }
        drawCld(year, month - 1);
    };

	/**
     * 获取当前日历所在年份
     * @returns {number} 年份
     */
    this.getYear = function () {
        return currentYear;
    };

	/**
	 * 获取当前日历所在月份
     * @returns {number} 月份
     */
    this.getMonth = function () {
        return currentMonth;
    };
};