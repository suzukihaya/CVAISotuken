// もろもろインポート
const crypto = require("crypto");

const connect = require("../database/Connection.js");
const encryption = require("../database/Encryption.js");

function registration(args) {
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.password,
        args.username,
        args.mailaddress,
    ];

    requiredArgs.forEach(arg => {
        if (arg === undefined) {
            throw new Error("Args are not set cxorrectly.");
        }
    });

    // saltを生成し暗号化
    const salt = crypto.randomBytes(16).toString('hex');

    const hashedPassword = encryption.encryption(args.password, salt)

    // 計算が成功しているのであればデータベースに送信
    if(hashedPassword !== false) {
        // sqlと接続
        const connection = connect.connect("user");

        // SQLを記述
        const sql = "INSERT INTO authentication(username, mailaddress, password, salt) VALUES(?, ?, ?, ?)";

        // 送信
        connection.query (
            sql,
            [args.username, args.mailaddress, hashedPassword, salt],
            (error, results) => {
                // 送信失敗時にエラーを送信
                if (results === undefined) {
                    // 送信失敗時のエラー表示
                    throw new Error("SQL could not be executed successfully");
                }
            }
        );

        return true;
    }
}

exports.registration =  registration;