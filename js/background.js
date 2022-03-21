chrome.storage.local.get('github_comment_templates', function(items) {
  if (Object.keys(items).length == 0) {
    chrome.storage.local.set({'github_comment_templates': [
      { id: 'comment-template-1', key: '::n', value: '[nits]\nEnter nits comments.' },
      { id: 'comment-template-2', key: '::i', value: '[imo]\nEnter imo comments.' },
      { id: 'comment-template-3', key: '::s', value: '[should]\nEnter should comments.' },
      { id: 'comment-template-4', key: '::m', value: '[must]\nEnter must comments.' },
      { id: 'comment-template-5', key: '::q', value: '[quession]\nEnter quession comments.' },
    ]}, function(items) {});
  }
});
