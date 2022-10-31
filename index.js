/////////////////////////////////////////// JS for Page change//////////////////////////////////////
function page(evt, pageno) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageno).style.display = "block";
    evt.currentTarget.className += " active";
}

//////////////////////////////////////////// add field//////////////////////////////////////////
var id = 1;
var url_names = [];
var a;
var i;
var k;
var j = 0;
var d_arr = [];

// Show New FOrm
$("#button").click(function() {
    $(".addFieldForm").show();
});

// Accept URL (CANCEL)
$(".addFieldForm .cancel").click(function() {
    $(".addFieldForm").hide();
});

// Accept URL (ADD)
$(".addFieldForm .add").click(function() {
    var a = $(".addFieldForm #addFieldInput").val();
    console.log(a);
    // a = prompt("URL for");
    if (a) {
        console.log(a);
        url_names.push(a);
        var name = a + " url";
        $(".form-group").append(
            '<div class="just"><label class="url_in" data-title="' +
            a +
            '" for="' +
            id +
            '">' +
            name +
            ':</label><input name="extraURLs[' + a + ']"  type="text" class="url-input" placeholder="add url here" value="" autocomplete="off" id="' +
            id +
            '"></div><br>'
        );
        id++;
    }
    // $('.btn-div').append('<h1>Field can not be empty</h1>')
    else alert("Field can not be empty");
    $(".addFieldForm").hide();
});
$("#ads_preview").click(function() {
    var client_in = document.getElementById("client_in").value;
    console.log(client_in);
    var campaign_in = document.getElementById("campaign_in").value;
    console.log(campaign_in);
    var fcat_in = document.getElementById("fcat_in").value;
    console.log(fcat_in);
    var width_in = document.getElementById("width_in").value;
    console.log(width_in);
    var height_in = document.getElementById("height_in").value;
    console.log(height_in);
    var r = document.querySelector(":root");
    r.style.setProperty("--width", width_in + "px");
    r.style.setProperty("--height", height_in + "px");
    if (
        client_in <= 0 ||
        campaign_in <= 0 ||
        fcat_in == null ||
        width_in == null ||
        height_in == null
    ) {
        alert("Please fill all the details");
    }
    i = 0;
    while (i < id) {
        $("#images").append(
            '<img class="ad_imgs" id="a' +
            i +
            '" style="position:absolute;" src="' +
            document.getElementById(i).value +
            '">'
        );
        i++;
    }

    while (j < i - 1) {
        $("#animation").append(
            "<h3 class='asset_name'>" +
            url_names[j] +
            "</h3><select class='select_anim' name='anim'" +
            j +
            " id=anim" +
            j +
            "><option value='none'>none</option><option value='top'>top</option><option value='bottom'>bottom</option><option value='left'>left</option><option value='right'>right</option><option value='bounce'>bounce</option><option value='flash'>flash</option><option value='pulse'>pulse</option><option value='front'>front</option><option value='back'>back</option><option value='opacity'>opacity</option><option value='shake'>shake</option><option value='rotation'>rotation</option><option value='swing'>swing</option><option value='skewX'>skewX</option><option value='skewX'>skewY</option><option value='flipX'>flipX</option><option value='doubleflipper'>doubleflipper</option><option value='stretchup'>stretchup</option><option value='stretchright'>stretchright</option><option value='stretchleft'>stretchleft</option><option value='stretchdown'>stretchdown</option><option value='lightspeed'>lightspeed</option></select><input class='delay_num' id='delay_" +
            j +
            "' type='number' placeholder='" +
            url_names[j] +
            " delay'/><br>"
        );
        j++;
    }
});
$("#preview").click(function() {
    for (var l = 0; l < i - 1; l++) {
        d_arr.push(parseFloat(document.getElementById("delay_" + l).value));
    }
    console.log(d_arr);
    k = 0;
    var ani1 = "";
    while (k < i - 1) {
        var repeat = parseFloat(document.getElementById("repeat").value);
        var rdelay = parseFloat(document.getElementById("repeat_delay").value);
        var select = document.getElementById("anim" + k);
        var animation_use = select.options[select.selectedIndex].value;
        var delay = parseFloat(document.getElementById("delay_" + k).value);
        console.log(delay, rdelay);
        if (isNaN(delay)) {
            delay = 0;
        }
        if (isNaN(repeat)) {
            repeat = 0;
        }
        if (isNaN(rdelay)) {
            rdelay = 0;
        }
        rdelay = rdelay + Math.max(...d_arr);
        console.log(rdelay);
        ////////////////////////////////ANIMATIONS STARTS///////////////////////////////////////////////////
        function top_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            gsap.from("#a" + (k + 1), 0.7, {
                y: -100,
                opacity: 0,
                ease: Power1.easeOut,
                delay: delay,
            });
        }

        function bottom_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            gsap.from("#a" + (k + 1), 0.7, {
                y: 50,
                opacity: 0,
                ease: Power1.easeOut,
                delay: delay,
            });
        }

        function left_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            gsap.from("#a" + (k + 1), 0.7, {
                x: -300,
                opacity: 0,
                ease: Power1.easeOut,
                delay: delay,
            });
        }

        function right_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            gsap.from("#a" + (k + 1), 0.7, {
                x: 300,
                opacity: 0,
                ease: Power1.easeOut,
                delay: delay,
            });
        }

        function bounce_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0 + rdelay - delay,
            });
            gsap.fromTo(
                "#a" + (k + 1), { opacity: 0 }, {
                    opacity: 1,
                    keyframes: {
                        y: [0, -20, 0, -15, 0, -10, 0, -7, 0, -2, 0],
                        ease: "power2.in",
                    },
                    duration: 2,
                    delay: delay,
                }
            );
        }

        function flash_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0 + rdelay - delay,
            });
            gsap.fromTo(
                "#a" + (k + 1), { opacity: 0 }, {
                    keyframes: {
                        opacity: [1, 0.5, 0.2, 0.5, 1, 0.5, 0.2, 0.5, 1],
                        ease: "power1.in",
                    },
                    duration: 2,
                    delay: delay,
                }
            );
        }

        function pulse_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1 + rdelay - delay,
            });
            gsap.fromTo(
                "#a" + (k + 1), { opacity: 0 }, {
                    opacity: 1,
                    keyframes: {
                        scale: [1, 0.9, 1, 0.9, 1],
                        ease: "power1.in",
                    },
                    duration: 1,
                    delay: delay,
                }
            );
        }

        function front_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            gsap.from("#a" + (k + 1), 0.7, {
                scale: 1.5,
                opacity: 0,
                ease: Power1.easeOut,
                delay: delay,
            });
        }

        function back_a() {
            var gsap = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            gsap.from("#a" + (k + 1), 0.7, {
                scale: 0.5,
                opacity: 0,
                ease: Power1.easeOut,
                delay: delay,
            });
        }

        function opacity_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.3 + rdelay - delay,
            });
            tll.from("#a" + (k + 1), 0.7, {
                opacity: 0,
                ease: Power0.easeIn,
                delay: delay,
            });
        }

        function shake_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.3 + rdelay - delay,
            });
            tll.fromTo(
                "#a" + (k + 1),
                1.7, { rotation: -3 }, { rotation: 0, ease: Elastic.easeOut.config(5, 0.2), delay: delay }
            );
        }

        function rotation_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0 + rdelay - delay,
            });
            tll.to("#a" + (k + 1), 2, { rotation: "+=360", delay: delay });
        }

        function swing_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0 + rdelay - delay,
            });
            tll.to("#a" + (k + 1), 0.6, { rotation: -30, delay: delay });
            tll.to("#a" + (k + 1), 0.6, { rotation: 30 });
            tll.to("#a" + (k + 1), 0.6, { rotation: 0 });
        }

        function skewX_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.3 + rdelay - delay,
            });
            tll.fromTo(
                "#a" + (k + 1),
                1.7, { skewX: -1 }, { skewX: 0, ease: Elastic.easeOut.config(10, 0.1), delay: delay }
            );
        }

        function skewY_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.3 + rdelay - delay,
            });
            tll.fromTo(
                "#a" + (k + 1),
                1.7, { skewY: -1 }, { skewY: 0, ease: Elastic.easeOut.config(10, 0.2), delay: delay }
            );
        }

        function flipX_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.5 + rdelay - delay,
            });
            tll.fromTo(
                "#a" + (k + 1),
                0.5, { rotationY: -180, opacity: 0 }, { rotationY: 0, opacity: 1, ease: Power0.easeIn, delay: delay }
            );
        }

        function doubleflipper_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.5 + rdelay - delay,
            });
            tll.fromTo(
                "#a" + (k + 1),
                0.5, { rotationY: 180, opacity: 0 }, { rotationY: -360, opacity: 1, ease: Power0.easeIn, delay: delay }
            );
        }

        function stretchup_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.8 + rdelay - delay,
            });
            tll.from("#a" + (k + 1), 0.4, {
                y: 200,
                opacity: 1,
                ease: Power0.easeIn,
                delay: delay,
            });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1, delay: 0.4 });
        }

        function stretchright_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.8 + rdelay - delay,
            });
            tll.from("#a" + (k + 1), 0.4, {
                x: 40,
                opacity: 0,
                ease: Power0.easeIn,
                delay: delay,
            });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
            tll.to("#a" + (k + 1), { scaleX: 1, delay: 0.4 });
        }

        function stretchleft_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.8 + rdelay - delay,
            });
            tll.from("#a" + (k + 1), 0.4, {
                x: -150,
                opacity: 0,
                ease: Power0.easeIn,
                delay: delay,
            });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1, delay: 0.4 });
        }

        function stretchdown_a() {
            var tll = new TimelineMax({
                repeat: repeat,
                repeatDelay: 0.8 + rdelay - delay,
            });
            tll.from("#a" + (k + 1), 0.4, {
                y: -400,
                opacity: 0,
                ease: Power0.easeIn,
                delay: delay,
            });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
            tll.to("#a" + (k + 1), 0.2, { scaleX: 1, delay: 0.4 });
        }

        function lightspeed_a() {
            var tl = new TimelineMax({
                repeat: repeat,
                repeatDelay: 1.5 + rdelay - delay,
            });
            tl.from("#a" + (k + 1), 0.5, {
                x: "-300",
                skewX: "60deg",
                ease: Back.easeOut,
                autoAlpha: 0,
                delay: delay,
            });
        }
        ////////////////////////////////ANIMATION END//////////////////////////////////////////////////////
        switch (animation_use) {
            case "none":
                var ani1 = "";
                break;
            case "top":
                top_a();
                var ani1 =
                    ani1 +
                    `function top() {
          var gsap = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1.3 + rdelay - delay) +
                    `,
          });
          gsap.from("#` +
                    url_names[k] +
                    `", 0.7, {
            y: -100,
            opacity: 0,
            ease: Power1.easeOut,
            delay: ` +
                    delay +
                    `});
        }top();`;
                break;
            case "bottom":
                bottom_a();
                var ani1 =
                    ani1 +
                    `function bottom_a() {
              var gsap = new TimelineMax({
                repeat: ` +
                    repeat +
                    `,
                repeatDelay: ` +
                    (1.3 + rdelay - delay) +
                    `,
              });
              gsap.from("#` +
                    url_names[k] +
                    `", 0.7, {
                y: 50,
                opacity: 0,
                ease: Power1.easeOut,
                delay: ` +
                    delay +
                    `,
              });
            }bottom_a();`;
                break;
            case "left":
                left_a();
                var ani1 =
                    ani1 +
                    `function left_a() {
          var gsap = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1.3 + rdelay - delay) +
                    `,
          });
          gsap.from("#` +
                    url_names[k] +
                    `", 0.7, {
            x: -300,
            opacity: 0,
            ease: Power1.easeOut,
            delay: ` +
                    delay +
                    `,
          });
        }left_a();`;
                break;
            case "right":
                right_a();
                var ani1 =
                    ani1 +
                    `function right_a() {
              var gsap = new TimelineMax({
                repeat: ` +
                    repeat +
                    `,
                repeatDelay: ` +
                    (1.3 + rdelay - delay) +
                    `,
              });
              gsap.from("#` +
                    url_names[k] +
                    `", 0.7, {
                x: 300,
                opacity: 0,
                ease: Power1.easeOut,
                delay: ` +
                    delay +
                    `,
              });
            }right_a();`;
                break;
            case "bounce":
                bounce_a();
                var ani1 =
                    ani1 +
                    `function bounce_a() {
                var gsap = new TimelineMax({
                  repeat: ` +
                    repeat +
                    `,
                  repeatDelay: ` +
                    (0 + rdelay - delay) +
                    `,
                });
                gsap.fromTo(
                  "#` +
                    url_names[k] +
                    `",
                  { opacity: 0 },
                  {
                    opacity: 1,
                    keyframes: {
                      y: [0, -20, 0, -15, 0, -10, 0, -7, 0, -2, 0],
                      ease: "power2.in",
                    },
                    duration: 2,
                    delay: ` +
                    delay +
                    `,
                  }
                );
              }bounce_a();`;
                break;
            case "flash":
                flash_a();
                var ani1 =
                    ani1 +
                    `function flash_a() {
          var gsap = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (0 + rdelay - delay) +
                    `,
          });
          gsap.fromTo(
            "#` +
                    url_names[k] +
                    `",
            { opacity: 0 },
            {
              keyframes: {
                opacity: [1, 0.5, 0.2, 0.5, 1, 0.5, 0.2, 0.5, 1],
                ease: "power1.in",
              },
              duration: 2,
              delay: ` +
                    delay +
                    `,
            }
          );
        }flash_a();`;
                break;
            case "pulse":
                pulse_a();
                var ani1 =
                    `function pulse_a() {
          var gsap = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1 + rdelay - delay) +
                    `,
          });
          gsap.fromTo(
            "#` +
                    url_names[k] +
                    `",
            { opacity: 0 },
            {
              opacity: 1,
              keyframes: {
                scale: [1, 0.9, 1, 0.9, 1],
                ease: "power1.in",
              },
              duration: 1,
              delay: ` +
                    delay +
                    `,
            }
          );
        }pulse_a();`;
                break;
            case "front":
                front_a();
                var ani1 =
                    ani1 +
                    `function front_a() {
          var gsap = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1.3 + rdelay - delay) +
                    `,
          });
          gsap.from("#` +
                    url_names[k] +
                    `", 0.7, {
            scale: 1.5,
            opacity: 0,
            ease: Power1.easeOut,
            delay: ` +
                    delay +
                    `,
          });
        }front_a();`;
                break;
            case "back":
                back_a();
                var ani1 =
                    ani1 +
                    `function back_a() {
          var gsap = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1.3 + rdelay - delay) +
                    `,
          });
          gsap.from("#` +
                    url_names[k] +
                    `", 0.7, {
            scale: 0.5,
            opacity: 0,
            ease: Power1.easeOut,
            delay: ` +
                    delay +
                    `,
          });
        } back_a();`;
                break;
            case "opacity":
                opacity_a();
                var ani1 =
                    ani1 +
                    `function opacity_a() {
    var tll = new TimelineMax({
      repeat:` +
                    repeat +
                    `,
      repeatDelay:` +
                    (1.3 + rdelay - delay) +
                    `,
    });
    tll.from("#` +
                    url_names[k] +
                    `",0.7,{
      opacity:0,ease:Power0.easeIn, delay:` +
                    delay +
                    `
    });
  }opacity_a();`;
                break;
            case "shake":
                shake_a();
                var ani1 =
                    ani1 +
                    `function tshake() { var tll = new TimelineMax({ repeat:` +
                    repeat +
                    `,repeatDelay:` +
                    (0.3 + rdelay - delay) +
                    `,}); tll.fromTo("#` +
                    url_names[k] +
                    `", 1.7, { rotation: -3}, {rotation: 0,ease:Elastic.easeOut.config( 5, 0.2), delay:` +
                    delay +
                    `});}shake_a();`;
                break;
            case "rotation":
                rotation_a();
                var ani1 =
                    ani1 +
                    `function rotation_a() {
              var tll = new TimelineMax({
                repeat:` +
                    repeat +
                    `,
                repeatDelay: ` +
                    (0 + rdelay - delay) +
                    `,
              });
              tll.to("#` +
                    url_names[k] +
                    `", 2, { rotation: "+=360", delay: ` +
                    delay +
                    ` });
            }rotation_a();`;
                break;
            case "swing":
                swing_a();
                var ani1 =
                    ani1 +
                    `function swing_a() {
                var tll = new TimelineMax({
                  repeat: ` +
                    repeat +
                    `,
                  repeatDelay: ` +
                    (0 + rdelay - delay) +
                    `,
                });
                tll.to("#` +
                    url_names[k] +
                    `", .6, { rotation: -30 ,delay: ` +
                    delay +
                    `});
                tll.to("#` +
                    url_names[k] +
                    `", .6, { rotation: 30 });
                tll.to("#` +
                    url_names[k] +
                    `", .6, { rotation: 0 });
              }
            swing_a();`;
                break;
            case "skewX":
                skewX_a();
                var ani1 =
                    ani1 +
                    `function tskewX() {
          var tll = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (0.3 + rdelay - delay) +
                    `,
          });
          tll.fromTo(
            "#` +
                    url_names[k] +
                    `",
            1.7,
            { skewX: -1 },
            { skewX: 0, ease: Elastic.easeOut.config(10, 0.1), delay: ` +
                    delay +
                    ` }
          );
        }skewX_a();`;
                break;
            case "skewY":
                skewY_a();
                var ani1 =
                    ani1 +
                    `function skewY_a() {
            var tll = new TimelineMax({
              repeat: ` +
                    repeat +
                    `,
              repeatDelay: ` +
                    (0.3 + rdelay - delay) +
                    `,
            });
            tll.fromTo(
              "#` +
                    url_names[k] +
                    `",
              1.7,
              { skewY: -1 },
              { skewY: 0, ease: Elastic.easeOut.config(10, 0.2), delay: ` +
                    delay +
                    `}
            );
          }skewY_a();`;
                break;
            case "flipX":
                flipX_a();
                var ani1 =
                    ani1 +
                    `function flipX_a() {
          var tll = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1.5 + rdelay - delay) +
                    `,
          });
          tll.fromTo(
            "#` +
                    url_names[k] +
                    `",
            0.5,
            { rotationY: -180, opacity: 0 },
            { rotationY: 0, opacity: 1, ease: Power0.easeIn, delay: ` +
                    delay +
                    ` }
          );
        }flipX_a();`;
                break;
            case "doubleflipper":
                doubleflipper_a();
                var ani1 =
                    ani1 +
                    `function doubleflipper_a() {
            var tll = new TimelineMax({
              repeat: ` +
                    repeat +
                    `,
              repeatDelay: ` +
                    (1.5 + rdelay - delay) +
                    `,
            });
            tll.fromTo(
              "#` +
                    url_names[k] +
                    `",
              0.5,
              { rotationY: 180, opacity: 0 },
              { rotationY: -360, opacity: 1, ease: Power0.easeIn, delay: ` +
                    delay +
                    ` }
            );
          }doubleflipper_a();`;
                break;
            case "stretchup":
                stretchup_a();
                var ani1 =
                    ani1 +
                    `function stretchup_a() {
          var tll = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (0.8 + rdelay - delay) +
                    `,
          });
          tll.from("#` +
                    url_names[k] +
                    `", 0.4, {
            y: 200,
            opacity: 1,
            ease: Power0.easeIn,
            delay: ` +
                    delay +
                    `,
          });
          tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
          tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1, delay: 0.4 });
        }stretchup_a();`;
                break;
            case "stretchright":
                stretchright_a();
                var ani1 =
                    ani1 +
                    `function stretchright_a() {
            var tll = new TimelineMax({
              repeat: ` +
                    repeat +
                    `,
              repeatDelay: ` +
                    (0.8 + rdelay - delay) +
                    `,
            });
            tll.from("#` +
                    url_names[k] +
                    `", 0.4, {
              x: 40,
              opacity: 0,
              ease: Power0.easeIn,
              delay: ` +
                    delay +
                    `,
            });
            tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
            tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1, delay: 0.4 });}tstretchright();`;
                break;
            case "stretchleft":
                stretchleft_a();
                var ani1 =
                    ani1 +
                    `function stretchleft_a() {
          var tll = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (0.8 + rdelay - delay) +
                    `,
          });
          tll.from("#` +
                    url_names[k] +
                    `", 0.4, {
            x: -150,
            opacity: 0,
            ease: Power0.easeIn,
            delay: ` +
                    delay +
                    `,
          });
          tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
          tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1, delay: 0.4 });
        }stretchleft_a();`;
                break;
            case "stretchdown":
                stretchdown_a();
                var ani1 =
                    ani1 +
                    `function stretchdown_a() {
          var tll = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (0.8 + rdelay - delay) +
                    `,
          });
          tll.from("#` +
                    url_names[k] +
                    `", 0.4, {
            y: -400,
            opacity: 0,
            ease: Power0.easeIn,
            delay: ` +
                    delay +
                    `,
          });
          tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1.1, ease: Bounce.easeOut });
          tll.to("#` +
                    url_names[k] +
                    `", 0.2, { scaleX: 1, delay: 0.4 });
        }stretchdown_a();`;
                break;
            case "lightspeed":
                lightspeed_a();
                var ani1 =
                    ani1 +
                    `function lightspeed_a() {
          var tl = new TimelineMax({
            repeat: ` +
                    repeat +
                    `,
            repeatDelay: ` +
                    (1.5 + rdelay - delay) +
                    `,
          });
          tl.from("#` +
                    url_names[k] +
                    `", 0.5, {
            x: "-300",
            skewX: "60deg",
            ease: Back.easeOut,
            autoAlpha: 0,
            delay: ` +
                    delay +
                    `,
          });
        }lightspeed_a();`;
                break;
        }

        k++;
    }
    document.getElementById("function").value = ani1;
});

//////////////////////////COPY FUNCTION///////////////////////////////////////////////
function copy() {
    document.getElementById("function").select();
    document
        .getElementById("function")
        .setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(document.getElementById("function").value);
}

$(document).on("keyup", "#btnPrepend", function() {});

function collectURLS() {
    var allURL = "";

    $(".url-input").each(function() {
        var title = $(this).prev().attr("data-title");
        var value = $(this).val();

        var objString = title + ": " + value + ",";
        console.log(title);
        console.log(value);

        allURL += objString;
        $(".allURL").val(allURL);
    });
}