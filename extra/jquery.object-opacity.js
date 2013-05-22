/*!
 *      _____ ____  __  ____  _______________    ______  __
 *     / ___// __ \/ / / / / /_  __/ ____/   |  / __ \ \/ /
 *     \__ \/ / / / / / / /   / / / __/ / /| | / /_/ /\  /
 *    ___/ / /_/ / /_/ / /___/ / / /___/ ___ |/ _, _/ / /
 *   /____/\____/\____/_____/_/ /_____/_/  |_/_/ |_| /_/ 
 * 
 *     jQuery Object Opacity [2013-05-22]
 *     soulteary
 *     http://soulteary.com
 */
;
(function ($) {
    $.fn.extend({
        "objOpacity": function (params) {
            params = $.extend({
                warp: false,    //WARP ID,LIKE: #warp
                hover: 'effect',
                event: 'mouseover',
                bevent: 'mouseout',
                focus: 1,
                blur: .1,
                speed: 600
            }, params);
            var target = $(this);
            if (!target.length) {
                return this;
            }
            if(params.warp){
                var warp = $(params.warp);
            }
            else{
                var warp = params.warp;
            }
            if (warp && warp.length && target.length>1) {
                $(function () {
                    warp.on(params.event, function (e) {
                        e.stopPropagation();
                        var cur = $(e.target);
                        if(target.filter(cur).length){
                            target.removeClass(params.hover).unbind(params.bevent);
                            cur.addClass(params.hover).on(params.bevent,function(){
                                if (cur.is(':animated')) {
                                    cur.stop().animate({'opacity': params.blur}, params.speed);
                                } else {
                                    cur.animate({'opacity': params.blur}, params.speed);
                                }
                            });
                            if (cur.is(':animated')) {
                                cur.stop().animate({'opacity': params.focus}, params.speed);
                            } else {
                                cur.animate({'opacity': params.focus}, params.speed);
                            }
                            var other = target.not(cur);
                            if (other.is(':animated')) {
                                other.stop().animate({'opacity': params.blur}, params.speed);
                            } else {
                                other.animate({'opacity': params.blur}, params.speed);
                            }
                        }
                    });
                });
            }else if(!warp && target.length>1){
                $(function () {
                    target.on(params.event,function (e) {
                        var cur = $(e.target);
                        cur.addClass(params.hover);
                        if (cur.is(':animated')) {
                            cur.stop().animate({'opacity': params.focus}, params.speed);
                        } else {
                            cur.animate({'opacity': params.focus}, params.speed);
                        }
                    }).on(params.bevent, function (e) {
                        var cur = $(e.target);
                            cur.removeClass(params.hover);
                        if (cur.is(':animated')) {
                            cur.stop().animate({'opacity': params.blur}, params.speed);
                        } else {
                            cur.animate({'opacity': params.blur}, params.speed);
                        }
                    });
                });
            }else{
                //!warp && target.length == 1
                target.on(params.event, function () {
                    if (target.is(':animated')) {
                        target.stop().animate({'opacity': params.focus}, params.speed);
                    } else {
                        target.animate({'opacity': params.focus}, params.speed);
                    }
                })
                .on(params.bevent, function () {
                    if (target.is(':animated')) {
                        target.stop().animate({'opacity': params.blur}, params.speed);
                    } else {
                        target.animate({'opacity': params.blur}, params.speed);
                    }
                });
            }
            return this;
        }
    });
})(jQuery, 'SOULTEARY.COM');