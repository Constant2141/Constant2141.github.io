




$(document).ready(() => {
  const $darkMode = $('#darkMode')
  if ($darkMode.length > 0) {
  const  toggleDarkMode =  function () {
  
     const classList =  $('body').attr('class');
     const className  = 'dark-mode';
     let isDark = classList.indexOf(className) > -1;
     if(isDark){
      $('body').removeClass(className);
     }else{
      $('body').addClass(className);
    }
  }
  $darkMode.on('click', toggleDarkMode);
  }
})