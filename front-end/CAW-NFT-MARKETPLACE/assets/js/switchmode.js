// Dark light version
const themeCookieName = 'theme'
const themeDark = 'is_dark'
const themeLight = 'is_light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
      var name = cname + "="
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1)
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length)
          }
      }
      return ""
  }
loadTheme()

function loadTheme() {
    var theme = getCookie(themeCookieName)
    body.classList.add(theme === "" ? themeDark : theme)
}

function switchTheme() {

    if (body.classList.contains(themeLight)) {
        body.classList.remove(themeLight)
        body.classList.add(themeDark)
        setCookie(themeCookieName, themeDark)
        
        if($('.body').hasClass('is_dark')) {
            document.getElementById("img-mode").src = "assets/images/icon/moon.png";
            document.getElementById("logo_header").src = "assets/images/logo/logo_dark.png";
            document.getElementById("logo_footer").src = "assets/images/logo/logo_dark.png";

        } else  if($('.body').hasClass('is_light')) {
                document.getElementById("img-mode").src = "assets/images/icon/sun.png";
                document.getElementById("logo_header").src = "assets/images/logo/logo.png";
                document.getElementById("logo_footer").src = "assets/images/logo/logo.png";
            }
        

    } else {
        body.classList.remove(themeDark)
        body.classList.add(themeLight)
        setCookie(themeCookieName, themeLight)
        
        if($('.body').hasClass('is_dark')) {
            document.getElementById("img-mode").src = "assets/images/icon/moon.png";
            document.getElementById("logo_header").src = "assets/images/logo/logo_dark.png";
            document.getElementById("logo_footer").src = "assets/images/logo/logo_dark.png";

        } else  if($('.body').hasClass('is_light')) {
                document.getElementById("img-mode").src = "assets/images/icon/sun.png";
                document.getElementById("logo_header").src = "assets/images/logo/logo.png";
                document.getElementById("logo_footer").src = "assets/images/logo/logo.png";
            }

        
    }
}
