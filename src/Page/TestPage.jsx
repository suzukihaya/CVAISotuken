import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

export function TestPage() {
  const [formData, setFormData] = useState({
    request:"registration",
    username: "",
    mailaddress: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/",
        formData
      );
      // レスポンスを alert ダイアログで表示
      console.log("送信成功: " + response); // バックエンドからの応答に基づいたメッセージを表示
    } catch (error) {
      // エラーを alert ダイアログで表示
      console.log("送信失敗: " + error); // エラー詳細を表示
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& > :not(style)": { m: 1 } }}
    >
      <TextField
        name="name"
        label="名前"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="メールアドレス"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="パスワード"
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        送信
      </Button>
    </Box>
  );
}
