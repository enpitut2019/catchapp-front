## 開発環境の整え方

### 1. Node.jsをインストールしよう！

#### Macの場合

[nvm](https://github.com/nvm-sh/nvm#automatically-call-nvm-use)というNode.jsのバージョンを管理するツールを使うと便利。

下記コマンドを実行してインストール。

```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

その後、この(catchApp-frontの)ディレクトリに移動して下記コマンドを実行。

```sh
$ nvm use v10
```

これでNode.jsのバージョン10が使えるようになる。

余裕があれば、`.bashrc` に下記を追記すると良い。

```sh
find-up () {
    path=$(pwd)
    while [[ "$path" != "" && ! -e "$path/$1" ]]; do
        path=${path%/*}
    done
    echo "$path"
}

cdnvm(){
    cd "$@";
    nvm_path=$(find-up .nvmrc | tr -d '[:space:]')

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version;
        default_version=$(nvm version default);

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [[ $default_version == "N/A" ]]; then
            nvm alias default node;
            default_version=$(nvm version default);
        fi

        # If the current version is not the default version, set it to use the default version
        if [[ $(nvm current) != "$default_version" ]]; then
            nvm use default;
        fi

        elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
        declare nvm_version
        nvm_version=$(<"$nvm_path"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\->*' | tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
            nvm install "$nvm_version";
        elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
            nvm use "$nvm_version";
        fi
    fi
}
alias cd='cdnvm'
```

#### Windowsの場合

[nvm-windows](https://github.com/coreybutler/nvm-windows)を使う。

リンク先を見てインストールして欲しい。インストールが完了したら、下記コマンドを実行する。

```sh
$ nvm use v10
```

### 2. 開発に必要なツール群をインストールしよう

と言っても2コマンドでOK。まず下記を実行。

**Macの場合**

```sh
$ brew install yarn
```

**Windowsの場合**

[こちら](https://yarnpkg.com/latest.msi)からインストーラをダウンロード

インストールできたら、下記を実行。

```sh
$ yarn install
```

### 3. 開発用サーバを起動しよう

下記コマンドを叩けば、自動でブラウザが起動するはず。

```sh
$ yarn dev
```