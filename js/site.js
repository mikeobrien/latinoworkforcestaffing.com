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

    $.post(action, form.serialize())
        .done(function(msg){
          resultContainer.text(successMessage);
        })
        .fail(function(xhr, status, error) {
          resultContainer.text(failureMessage);
        });
  });
});