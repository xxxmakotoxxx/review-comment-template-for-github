$(document).bind('input', function(e){
  const $target_element = $(e.target);
  if (!$target_element.is('textarea')) return;
  if ($target_element.attr('name') != 'comment[body]') return;

  // 入力値取得
  const input_text = $target_element.val();
  // テンプレートのkeyに一致する文字列があればvalueに置換
  chrome.storage.local.get('github_comment_templates', function(items) {
    for (item of items.github_comment_templates) {
      if (input_text.indexOf(item.key) != -1) {
        $target_element.val(input_text.replace(item.key, item.value));
      }
    }
  });
});
