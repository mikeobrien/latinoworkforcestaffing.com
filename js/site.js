$(document).ready(function(){
  // Poor mans captcha...
  $(".captcha-image").click(function() {
    var captcha = $(this);
    var action = captcha.attr('data-action');
    var checkedImageSrc = captcha.attr('data-checked-src');
    captcha.closest('form').attr('action', action);
    captcha.attr('src', checkedImageSrc);
  });

  $(".form-submit").click(function(e) {
    e.preventDefault();
    var submit = $(this);
    var form = submit.closest('form');
    var action = form.attr('action');

    if (!action) return;

    var resultContainer = $(submit.attr('data-result-selector'));
    var successMessage = submit.attr('data-success-message');
    var failureMessage = submit.attr('data-failure-message');
    let data = new FormData(form[0]);

    $.ajax({
      url: action,
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      success: function(r) {
        resultContainer.html('<b style="color: green">' + successMessage + '</b>');
      },
      error: function(r) {
        resultContainer.html('<b style="color: red">' + failureMessage + '</b>');
      }
    });
  });
});