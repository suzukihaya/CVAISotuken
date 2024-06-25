import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Button, Box, Typography } from "@mui/material";
import axios from "axios"; // axiosをインポート

export function Addstudentkakunin() {
  useEffect(() => {
    document.title = "最終確認";
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    email,
    pass,
    namae,
    kanamae,
    gender,
    birthday,
    area,
    sikaku,
    gakka,
    sotu,
  } = location.state || {};

  const onClick = () => {
    navigate("/addgakka", {
      state: {
        email,
        pass,
        namae,
        kanamae,
        gender,
        birthday,
        area,
        sikaku,
        gakka,
        sotu,
      },
    });
  };

  const onClick1 = () => {
    navigate("/", {
      state: {
        email,
        pass,
        namae,
        kanamae,
        gender,
        birthday,
        area,
        sikaku,
        gakka,
        sotu,
      },
    });
  };

  const [formData, setFormData] = useState({
    request: "registration",
    password: "",
    name: "",
    email: "",
    furigana: "",
    sex: "",
    birthday: "",
    residence: "",
    qualification: 1,
  });

  useEffect(() => {
    setFormData({
      request: "registration",
      password: pass || "",
      name: namae || "",
      email: email || "",
      furigana: kanamae || "",
      sex: gender || "",
      birthday: birthday || "",
      residence: area || "",
      qualification: 1,
    });
  }, [pass, namae, email, kanamae, gender, birthday, area]);

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
      const response = await axios.post("/api/", formData);
      // レスポンスを alert ダイアログで表示
      console.log("送信成功: " + response); // バックエンドからの応答に基づいたメッセージを表示
    } catch (error) {
      // エラーを alert ダイアログで表示
      console.log("送信失敗: " + error); // エラー詳細を表示
    }
  };
  return (
    <>
      <Box bgcolor="#21a7dd" p={2}>
        <Stack justifyContent="center" alignItems="center">
          <Typography fontSize={30} color="white">
            最終確認
          </Typography>
        </Stack>
      </Box>
      <Stack justifyContent="center" alignItems="center">
        <div>
          <p></p>
          <label>メールアドレス　：　</label>
          <label>{email}</label>
          <p></p>
          <label>パスワード　　　：　</label>
          <label>{pass}</label>
          <p></p>
          <label>氏名　　　　　　：　</label>
          <label>{namae}</label>
          <p></p>
          <label>カタカナ　　　　：　</label>
          <label>{kanamae}</label>
          <p></p>
          <label>性別　　　　　　：　</label>
          <label>{gender}</label>
          <p></p>
          <label>生年月日　　　　：　</label>
          <label>{birthday}</label>
          <p></p>
          <label>居住地域　　　　：　</label>
          <label>{area}</label>
          <p></p>
          <label>保有資格---------------------------</label>
          {sikaku.map((option, index) => (
            <Typography key={index}>{option.title}</Typography>
          ))}
          <label>------------------------------------</label>
          <p></p>
          <p></p>
          <label>学科名　　　　　：　</label>
          <label>{gakka}</label>
          <p></p>
          <label>卒業予定　　　　：　</label>
          <lable>{sotu}</lable>
          <p></p>
        </div>
      </Stack>
      <Stack direction="row" spacing={20} justifyContent="center">
        <Box textAlign="left">
          <Button
            variant="contained"
            style={{ backgroundColor: "#bbdefb", color: "#000000" }}
            onClick={onClick}
          >
            戻る
          </Button>
        </Box>
        <Box textAlign="right">
          <Button
            variant="contained"
            style={{ backgroundColor: "#bbdefb", color: "#000000" }}
            onClick={handleSubmit}
          >
            登録
          </Button>
        </Box>
      </Stack>
    </>
  );
}
