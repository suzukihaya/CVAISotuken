const connect = require("../database/Connection.js");

async function login(args) {
    return new Promise((resolve, reject) => {
        // sqlと接続
        const connection = connect.connect("user");

        const sql = "SELECT * FROM authentication";
        
        const data = [];

        // 送信
        connection.execute(
            sql,
            (error, results) => {
                // 送信失敗時にエラーを送信
                if (error) {
                    reject(error); // エラーがあればrejectする
                    return;
                }
                
                results.forEach(result => {
                    data.push([
                        result.id,
                        result.mailaddress,
                        result.password,
                        result.salt,
                    ]);
                });

                // データの取得が終了したらresolveする
                resolve(data);
            }
        );
    });
}

exports.login = login;