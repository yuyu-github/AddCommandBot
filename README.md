# AddCommandBot
## コマンド一覧
!anonymousコマンド　省略形: !anon  
匿名でメッセージを送ります。  
!anonymous <メッセージ>  
(例)  
`!anonymous あいうえお` 「あいうえお」という匿名メッセージを送ります。  
`!anon Hello` 「Hello」という匿名メッセージを送ります。  
  
!autoreplyコマンド　省略形: !autorep  
自動でリプライをします。  
`!autoreply add user <ユーザーへのメンション> text <リプライ内容>`  
`!autoreply remove user <ユーザーへのメンション>`  
(例)  
`!autoreply add user @alpha text aiueo` alphaがメッセージを送信したとき、「aiueo」と自動リプライします。  
`!autorep remove user @alpha` alphaがメッセージを送信したとき、自動リプライしないようにします。
  
!execpermissionコマンド  
コマンドを実行する権限を設定します。※省略形は同時に権限が変更されません。  
`!execpermission <コマンド名> <権限名>`  
(例)  
`!execpermission autoreply MANAGE_GUILD` サーバー管理権限を持っていないとautoreplyコマンドを実行できないようにします。  
  
!autorolesコマンド　省略形: !autorole  
サーバーに入った時自動でロールを設定します。  
`!autoroles <ロール名>`  
(例)  
`!autoroles user` サーバーに入った時userロールを設定します。  