chrome.storage.local.get('github_comment_templates', function(items) {
  if (Object.keys(items).length == 0) {
    chrome.storage.local.set({'github_comment_templates': [
      { id: 'comment-template-1', key: '::n', value: '[nits]\nEnter nits comments.' },
      { id: 'comment-template-2', key: '::i', value: '[imo]\nEnter imo comments.\n\n■In My Option\n' },
      { id: 'comment-template-3', key: '::s', value: '[should]\nEnter should comments.\n\n■Solution\n' },
      { id: 'comment-template-4', key: '::m', value: '[must]\nEnter must comments.\n\n■Solution\n' },
      { id: 'comment-template-5', key: '::a', value: '[ask]\nEnter ask comments.' },
      { id: 'comment-template-6', key: '::c', value: 'Thanks for the review!\nCorrected the noted items.\n\n■Correction details\n\n■Commitment Links\n' },
    ]}, function(items) {});
  }
});
