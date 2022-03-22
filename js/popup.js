$(function() {
  // strageの入力テキスト一覧を取得
  refreshElemtnts();

  // イベント登録(追加ボタン押されたらkey,valueの入力値で追加)
  $(document).on("click", "#template-list ul li button.add_button", function (e) {
    // buttonエレメント取得
    const $button_element = $(e.target);
    // buttonエレメントから兄弟エレメントのkey(テキストボックス),value(テキストエリア)取得
    const $parent_element = $button_element.parent();
    const add_key = $parent_element.find('input').val();
    const add_value = $parent_element.find('textarea').val();


    // 追加処理
    chrome.storage.local.get('github_comment_templates', function(items) {
      // 同一のkeyが既に登録されていないかチェック
      if (items.github_comment_templates.some(item => { return item.key == add_key })) {
        alert('Already registered Key.');
        return false;
      }

      // 追加
      let new_github_comment_templates = items.github_comment_templates;
      new_github_comment_templates.push({id: createId(), key: add_key, value: add_value});

      // ストレージにセット
      chrome.storage.local.set({'github_comment_templates': new_github_comment_templates}, function() {
        // リフレッシュ
        refreshElemtnts();
      });
    });
  });

  // イベント登録(更新ボタン押されたら該当keyのオブジェクトを入力値で更新)
  $(document).on("click", "#template-list ul li button.update_button", function (e) {
    // keyの重複チェック
    // buttonエレメント取得
    const $button_element = $(e.target);
    // buttonエレメントから兄弟エレメントのkey(テキストボックス),value(テキストエリア)取得
    const $parent_element = $button_element.parent();
    const element_id = $parent_element.attr('id');
    const add_key = $parent_element.find('input').val();
    const add_value = $parent_element.find('textarea').val();

    // TODO: 更新処理
    chrome.storage.local.get('github_comment_templates', function(items) {
      const is_duplicate_key = items.github_comment_templates.some(item => {
        return item.id != element_id && item.key == add_key;
      });
      if (is_duplicate_key) {
        alert('Already registered Key.');
        return false;
      }
      const update_github_comment_templates = items.github_comment_templates.map(item => {
        if (item.id == element_id) {
          return {id: item.id, key: add_key, value: add_value};
        } else {
          return item;
        }
      });

      // ストレージにセット
      chrome.storage.local.set({'github_comment_templates': update_github_comment_templates}, function() {
        // リフレッシュ
        refreshElemtnts();
      });
    });
  });

  // イベント登録(削除ボタン押されたら該当keyのオブジェクトをgithub_comment_templatesから削除)
  $(document).on("click", "#template-list ul li button.delete_button", function (e) {
    // buttonエレメント取得
    const $button_element = $(e.target);
    // buttonエレメントから兄弟エレメントのkey(テキストボックス),value(テキストエリア)取得
    const $parent_element = $button_element.parent();
    const element_id = $parent_element.attr('id');

    chrome.storage.local.get('github_comment_templates', function(items) {
      const deleted_github_comment_templates = items.github_comment_templates.filter(item => {
        if (item.id != element_id) {
          return true;
        }
      });

      // ストレージにセット
      chrome.storage.local.set({'github_comment_templates': deleted_github_comment_templates}, function() {
        // リフレッシュ
        refreshElemtnts();
      });
    });
  });

  function createElemtnts(items) {
    for(const item of items.github_comment_templates) {
      // popup.html内に埋め込む
      const html = '<li class="list-group-item" id="' + item.id + '"><div class="input-group mb-3"><span class="input-group-text">key</span><input type="text" class="form-control" value="' + item.key + '"></div><div class="input-group"><span class="input-group-text">template</span><textarea class="template-list-item form-control">' + item.value + '</textarea></div><button type="button" class="update_button btn btn-info">Update</button><button type="button" class="delete_button btn btn-secondary">Delete</button></li>'
      $("#template-list ul").append(html);
    }
    // 追加用
    const html = '<li class="list-group-item"><div class="input-group mb-3"><span class="input-group-text">key</span><input type="text" class="form-control" value=""></div><div class="input-group"><span class="input-group-text">template</span><textarea class="template-list-item form-control"></textarea></div><button type="button" class="add_button btn btn-primary">Add</button></li>';
    $("#template-list ul").append(html);
  }

  function refreshElemtnts() {
    $("#template-list ul").empty();
    // strageの入力テキスト一覧を取得
    chrome.storage.local.get('github_comment_templates', function(items) {
      if (Object.keys(items).length == 0) {
        chrome.storage.local.set({'github_comment_templates': []}, function() {
          chrome.storage.local.get('github_comment_templates', function(init_items) {
            createElemtnts(init_items);
          });
        });
      } else {
        createElemtnts(items);
      }
    });
  }

  function createId() {
    const e_time = new Date();
    return 'comment-template-' + e_time.getTime() + generateRandomStr();
  }

  function generateRandomStr() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let rand_str = '';
    for ( var i = 0; i < 8; i++ ) {
      rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return rand_str;
  }
});
